const fs = require('fs-extra');
const {
  appDirectory,
  appSrc,
  appBuild,
  appConfig,
} = require('./paths');

const appDefaultConfig = {
  externals: {},
};

const config = {
  appDirectory,
  appSrc,
  appBuild,
  ...appDefaultConfig,
}

const configExists = fs.pathExistsSync(appConfig);
if (configExists) {
  Object.assign(config, require(appConfig));
}

module.exports = config;