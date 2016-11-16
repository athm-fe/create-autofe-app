const path = require('path');

const appDirectory = process.cwd();
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appDirectory: appDirectory,
  appBuild: resolveApp('build'),
};
