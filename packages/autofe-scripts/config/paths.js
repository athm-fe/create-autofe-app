'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appDirectory,
  appSrc: resolveApp('src'),
  appBuild: resolveApp('build'),
  appConfig: resolveApp('creator.config.js'),
};

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath);
}

if (__dirname.indexOf(path.join('packages', 'autofe-scripts', 'config')) !== -1) {
  module.exports = {
    appDirectory: resolveOwn('../template'),
    appSrc: resolveOwn('../template/src'),
    appBuild: resolveOwn('../template/build'),
    appConfig: resolveOwn('../template/creator.config.js'),
  };
}
