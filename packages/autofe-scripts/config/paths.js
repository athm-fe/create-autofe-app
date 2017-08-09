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
  appBuild: resolveApp('build'),
};

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath);
}

if (__dirname.indexOf(path.join('packages', 'autofe-scripts', 'config')) !== -1) {
  module.exports = {
    appDirectory: resolveOwn('../template'),
    appBuild: resolveOwn('../template/build'),
  };
}
