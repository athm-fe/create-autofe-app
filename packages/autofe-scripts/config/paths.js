var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appDirectory: appDirectory,
  appBuild: resolveApp('build')
};

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath);
}

if (__dirname.indexOf(path.join('packages', 'autofe-scripts', 'config')) !== -1) {
  module.exports = {
    appDirectory: resolveOwn('../template'),
    appBuild: resolveOwn('../template/build')
  };
}
