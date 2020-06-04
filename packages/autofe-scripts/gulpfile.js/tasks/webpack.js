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
    port: 8080,
    https: false,
    open: true,
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

  const server = new WebpackDevServer(compiler, Object.assign({
    logLevel: 'silent',
    // clientLogLevel: 'silent',
    historyApiFallback: false,
    hot: !isProd,
    compress: isProd,
    publicPath: publicPath,
    watchOptions: {
      ignored: [/node_modules/, /\.(html|old\.js|md)$/],
    },
    staticOptions: {
      index: false, // 关闭默认 index.html
    },
    overlay: isProd
      ? false
      : { warnings: false, errors: true }
  }, projectDevServer, {
    https: useHttps,
    proxy: proxySettings,
    open: false,
    contentBase: projectConfig.appBuild,
    // watchContentBase 能力比较有限，自己实现比较好
    watchContentBase: false,
    after: (app, server) => {
      const chokidar = require('chokidar');
      const files = [
        projectConfig.appBuild,
        projectConfig.appPublic,
      ];

      chokidar
        .watch(files, {
          persistent: true,
          ignoreInitial: true,
          followSymlinks: false,
          alwaysStat: true,
          ignorePermissionErrors: true,
          atomic: false,
        })
        .on('all', () => {
          server.sockWrite(server.sockets, 'content-changed');
        });

      // apply in project middlewares
      projectDevServer.after && projectDevServer.after(app, server);
    }
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
          openBrowser((urls.lanUrlForBrowser || localUrlForBrowser) + pageUri);
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
