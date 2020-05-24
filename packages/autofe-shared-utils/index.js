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

exports.CssUrlRelativePlugin = require('./lib/css-url-relative-plugin');
exports.OmitJsForCssOnlyPlugin = require('./lib/omit-js-for-css-only-plugin');
