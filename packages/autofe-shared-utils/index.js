// [
//   'env',
//   'exit',
//   'ipc',
//   'logger',
//   'module',
//   'object',
//   'openBrowser',
//   'pluginResolution',
//   'launch',
//   'request',
//   'spinner',
//   'validate'
// ].forEach(m => {
//   Object.assign(exports, require(`./lib/${m}`))
// });

function getChromeName() {
  let chromeName = 'google chrome';

  if (process.platform === 'darwin') {
    chromeName = 'google chrome';
  } else if (process.platform === 'linux') {
    chromeName = 'google-chrome';
  } else if (process.platform === 'win32') {
    chromeName = 'chrome';
  }

  return chromeName;
}

exports.getChromeName = getChromeName;
exports.CssUrlRelativePlugin = require('./lib/css-url-relative-plugin');
exports.OmitJsForCssOnlyPlugin = require('./lib/omit-js-for-css-only-plugin');
