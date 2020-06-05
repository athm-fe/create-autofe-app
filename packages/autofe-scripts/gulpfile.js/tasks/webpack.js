'use strict';

const PluginError = require('plugin-error');
const log = require('fancy-log');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const portfinder = require('portfinder');
const {
  openBrowser,
} = require('@vue/cli-shared-utils')
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

  const watchOptions = Object.assign({}, projectDevServer.watchOptions);
  watchOptions.ignored = watchOptions.ignored || [];
  watchOptions.ignored = Array.isArray(watchOptions.ignored)
    ? watchOptions.ignored
    : [watchOptions.ignored];
  watchOptions.ignored.push(...[/node_modules/, /\.(html|old\.js|md)$/]);

  const server = new WebpackDevServer(compiler, Object.assign({
    logLevel: 'silent',
    // clientLogLevel: 'silent',
    historyApiFallback: false,
    hot: !isProd,
    compress: isProd,
    overlay: isProd
      ? false
      : { warnings: false, errors: true },
    // 关闭直接打开 index 的能力，而是展示目录
    staticOptions: {
      index: false,
    },
  }, projectDevServer, {
    https: useHttps,
    proxy: proxySettings,
    open: false,
    watchOptions,
    publicPath: publicPath,

    // TODO 使用其他的方式实现目录浏览，
    // 结合 /webpack-dev-server、build 目录、public 目录以及 contentBase

    // contentBase、contentBasePublicPath 以及 watchContentBase 的能力
    // express.static + serve-static
    // watchContentBase 会忽略 watchOptions.ignore 的配置
    // staticOptions 仅当 contentBase 是一个时才生效
    // contentBase 多个时存在无法关闭 index 功能的问题，另外 serveIndex 只能展示第一个的目录，不展示第二个的

    // 不要配置数组，才能保证 staticOptions 配置有效
    contentBase: projectConfig.appBuild,
    // watchContentBase 能力比较有限，自己实现比较好
    watchContentBase: false,
    before: (app, server) => {
      // 提供访问 public 目录的能力
      const express = require('express');
      app.use(express.static(projectConfig.appPublic));

      // apply in project middlewares
      projectDevServer.before && projectDevServer.before(app, server);
    },
    after: (app, server) => {
      // 自己实现监听 public 和 build 下目录变更
      const chokidar = require('chokidar');
      const watchOptions = {
        persistent: true,
        ignoreInitial: true,
        followSymlinks: false,
        alwaysStat: true,
        ignorePermissionErrors: true,
        atomic: false,
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

    // injectClient: (compilerConfig) => compilerConfig.name === 'only-include'
    // injectHot: (compilerConfig) => compilerConfig.name === 'only-include'
    // inline: false // iframe mode
    // Inline mode is recommended for Hot Module Replacement
    // as it includes an HMR trigger from the websocket.
    // liveReload: true // hot: false && watchContentBase: true 才生效
    // transportMode: 'sockjs' // 'sockjs' | 'ws'

    // 当访问目录时，展示当前目录文件列表，可以结合 /webpack-dev-server 改造
    // 搭配 staticOptions.index 能提供更好的使用体验
    // serveIndex: true
    // index: 'index.html'

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
