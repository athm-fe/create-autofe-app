var composeAbsolutePathname = require('./__utils__/composeAbsolutePathname');
var composeQueryString = require('./__utils__/composeQueryString');
var composeRelativePathname = require('./__utils__/composeRelativePathname');
var defaultCachebuster = require('./__utils__/defaultCachebuster');
var resolvePath = require('./path');
var url = require('url');

module.exports = function (to, options, callback) {
  var toUrl;

  /* eslint-disable no-param-reassign */

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = Object.assign({
    basePath: '.',
    baseUrl: '/',
    cachebuster: false,
    relativeTo: false
  }, options);

  if (options.cachebuster === true) {
    options.cachebuster = defaultCachebuster;
  }

  /* eslint-enable */

  toUrl = url.parse(to);

  return resolvePath(decodeURI(toUrl.pathname), options)
    .then(function (resolvedPath) {
      var cachebusterOutput;

      if (options.relativeTo) {
        toUrl.pathname =
          composeRelativePathname(options.basePath, options.relativeTo, resolvedPath);
      } else {
        toUrl.pathname =
          composeAbsolutePathname(options.baseUrl, options.basePath, resolvedPath);
      }
      if (options.cachebuster) {
        cachebusterOutput = options.cachebuster(resolvedPath, toUrl.pathname);
        if (cachebusterOutput) {
          if (typeof cachebusterOutput !== 'object') {
            toUrl.search = composeQueryString(toUrl.search, String(cachebusterOutput));
          } else {
            if (cachebusterOutput.pathname) {
              toUrl.pathname = cachebusterOutput.pathname;
            }
            if (cachebusterOutput.query) {
              toUrl.search = composeQueryString(toUrl.search, cachebusterOutput.query);
            }
          }
        }
      }
      return url.format(toUrl);
    })
    .nodeify(callback);
};
