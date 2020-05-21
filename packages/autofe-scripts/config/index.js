const fs = require('fs-extra');
const {
  appDirectory,
  appSrc,
  appBuild,
  appConfig,
  isCreatorDev,
} = require('./paths');

const appDefaultConfig = {
  publicPath: '/',
  externals: {},
  transpileDependencies: [],
  configureWebpack: {},
  css: {
    loaderOptions: {},
  },
};

const config = {
  appDirectory,
  appSrc,
  appBuild,
  isCreatorDev,
  ...appDefaultConfig,
}

const configExists = fs.pathExistsSync(appConfig);
if (configExists) {
  Object.assign(config, require(appConfig));
}

config.css = config.css || {};
config.css.loaderOptions = config.css.loaderOptions || {};

module.exports = config;