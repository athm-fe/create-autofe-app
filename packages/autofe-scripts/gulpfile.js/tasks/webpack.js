'use strict';

const PluginError = require('plugin-error');
const log = require('fancy-log');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const portfinder = require('portfinder');
const {
  openBrowser,
} = require('@vue/cli-shared-utils');

const serveIndex = require('autofe-serve-index');
const webpackConfig = require('../../config/webpack.config');
const projectConfig = require('../../config/index');
const isAbsoluteUrl = require('../../util/isAbsoluteUrl');
const prepareURLs = require('../../util/prepareURLs');
const prepareProxy = require('../../util/prepareProxy');

const isProd = process.env.NODE_ENV === 'production';

const statsOptions = projectConfig.isCreatorDev ? { colors: true } : {
  colors: true,
  assets: false,
  entrypoints: false,
  modules: false,
  children: false,
  cached: false,
  cachedAssets: false,
  chunks: false,
  chunkGroups: false,
};

function normalizeFSEvent(event) {
  let result;
  switch (event) {
    case 'add':
      result = 'added';
      break;
    case 'change':
      result = 'changed';
      break;
    case 'unlink':
      result = 'removed';
      break;
    default:
      break;
  }
  return result;
}

async function webpackTask() {
  const config = webpackConfig();
  const compiler = webpack(config);

  if (isProd) {
    await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          reject(new PluginError('webpack', err));
          return;
        }

        log('webpack:', stats.toString(statsOptions));
        resolve();
      });
    });
    return;
  }

  const publicPath = projectConfig.publicPath;
  const defaults = {
    host: '0.0.0.0',
    port: 3000,
    https: false,
    open: true,
    useLocalIp: true,
    staticOptions: {
      index: false, // 关闭直接打开 index 的能力，而是展示目录
    },
  };
  const projectDevServer = Object.assign(
    {},
    defaults,
    config.devServer,
    projectConfig.devServer,
  );

  // resolve server options
  const useHttps = projectDevServer.https;
  const protocol = useHttps ? 'https' : 'http';
  const host = projectDevServer.host;
  portfinder.basePort = projectDevServer.port;
  const port = await portfinder.getPortPromise();
  const rawPublicUrl = projectDevServer.public;
  const publicUrl = rawPublicUrl
    ? /^[a-zA-Z]+:\/\//.test(rawPublicUrl)
      ? rawPublicUrl
      : `${protocol}://${rawPublicUrl}`
    : null;

  const urls = prepareURLs(
    protocol,
    host,
    port,
    isAbsoluteUrl(publicPath) ? '/' : publicPath
  );
  const localUrlForBrowser = publicUrl || urls.localUrlForBrowser;

  const proxySettings = prepareProxy(
    projectDevServer.proxy,
    projectConfig.appPublic, // TODO 还需要处理 build 目录中的资源
  );

  const watchOptions = projectDevServer.watchOptions || {};
  const watchOptionsIgnored = Array.isArray(watchOptions.ignored)
    ? watchOptions.ignored.slice(0)
    : (watchOptions.ignored ? [watchOptions.ignored] : []);
  const watchOptionsForPrivate = Object.assign({}, watchOptions, {
    ignored: [...watchOptionsIgnored, /node_modules/, /\.(html|old\.js|md)$/]
  });

  const server = new WebpackDevServer(compiler, Object.assign({
    logLevel: 'silent',
    // clientLogLevel: 'silent',
    historyApiFallback: false,
    hot: !isProd,
    compress: isProd,
    overlay: isProd
      ? false
      : { warnings: false, errors: true },
  }, projectDevServer, {
    https: useHttps,
    proxy: proxySettings,
    open: false,
    watchOptions: watchOptionsForPrivate,
    publicPath: publicPath,
    serveIndex: false,
    contentBase: projectConfig.appPublic,
    contentBasePublicPath: '/',
    watchContentBase: false,
    before: (app, server) => {
      // apply in project middlewares
      projectDevServer.before && projectDevServer.before(app, server);
    },
    after: (app, server) => {
      // 由于 contentBase 是数组时，不支持自定义 staticOptions
      // 因此自己来托管 build 目录
      const express = require('express');
      app.use(express.static(projectConfig.appBuild, projectDevServer.staticOptions));

      // webpack-dev-server 自带 serveIndex 太弱，自己实现
      app.use(serveIndex({
        app,
        server,
        contentBase: [projectConfig.appBuild, projectConfig.appPublic],
        icons: true,
      }));

      // 自己实现监听 public 和 build 下目录变更，原因
      // 1. watchContentBase 会忽略 watchOptions.ignore 的配置
      // 2. public 不希望忽略 html 等文件
      // 3. build 目录的需求比较特殊，只在特定情况触发
      const chokidar = require('chokidar');
      const watchOptions = {
        ignoreInitial: true,
        persistent: true,
        followSymlinks: false,
        atomic: false,
        alwaysStat: true,
        ignorePermissionErrors: true,
        ignored: watchOptionsIgnored,
        cwd: projectConfig.appDirectory,
      };

      // TODO: 需要关闭 watcher，防止内存泄漏

      chokidar
        .watch(projectConfig.appBuild, watchOptions)
        .on('all', () => {
          // TODO 先使用这种方式，后面再优化
          if (global.__creator_gulp_file_update) {
            global.__creator_gulp_file_update = false;
            server.sockWrite(server.sockets, 'content-changed');
          }
        });

      chokidar
        .watch(projectConfig.appPublic, watchOptions)
        .on('all', (event, path) => {
          log(`File ${path} was ${normalizeFSEvent(event)}`);
          server.sockWrite(server.sockets, 'content-changed');
        });

      // apply in project middlewares
      projectDevServer.after && projectDevServer.after(app, server);
    },

    // progress: true,

    // HMR 存在一些问题，CSS 文件变化没有触发更新，目前使用 style-loader 才能解决
    hot: false,
    // injectHot: (compilerConfig) => compilerConfig.name === 'only-include'
    // 因此先使用 liveReload，存在文件变化时，自动刷新页面
    liveReload: true,
    // 有的页面没有 JS，而有的页面有多个 Entry，因此 injectClient 不满足要求
    // 决定自己在 HTML 中插入 /webpack-dev-server.js
    injectClient: false,

    // stats, quiet, noInfo, info
  }));

  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0)
      })
    })
  })

  await new Promise((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) {
        reject(new PluginError('webpack', err));
      }
    });

    // log instructions & open browser on first compilation complete
    let isFirst = true;
    compiler.hooks.done.tap('autofe-scripts start', stats => {
      log('webpack:', stats.toString(statsOptions));

      if (isFirst) {
        isFirst = false;

        const networkUrl = publicUrl
          ? publicUrl.replace(/([^/])$/, '$1/')
          : urls.lanUrlForTerminal;

        console.log()
        console.log(`  App running at:`)
        console.log(`  - Local:   ${chalk.cyan(urls.localUrlForTerminal)}`)
        console.log(`  - Network: ${chalk.cyan(networkUrl)}`)
        console.log();

        if (projectDevServer.open) {
          const pageUri = (projectDevServer.openPage && typeof projectDevServer.openPage === 'string')
            ? projectDevServer.openPage
            : '';
          let baseUrl = localUrlForBrowser;
          if (!publicUrl && projectDevServer.useLocalIp && urls.lanUrlForBrowser) {
            baseUrl = urls.lanUrlForBrowser;
          }
          openBrowser(baseUrl + pageUri);
        }

        resolve({
          server,
          url: localUrlForBrowser,
        });
      }
    });
  });
}
webpackTask.displayName = 'webpack';

exports.webpack = webpackTask;
