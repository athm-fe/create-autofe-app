const fs = require('fs-extra');
const {
  appDirectory,
  appSrc,
  appBuild,
  appConfig,
  isCreatorDev,
} = require('./paths');

const appDefaultConfig = {
  externals: {},
  transpileDependencies: [],
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

module.exports = config;