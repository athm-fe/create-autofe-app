var path = require('path');

var appDirectory = process.cwd();

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appDirectory: appDirectory,
  appBuild: resolveApp('build')
};
