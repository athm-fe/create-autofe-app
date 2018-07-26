var encodeBuffer = require('./__utils__/encodeBuffer');
var fs = require('fs');
var mime = require('mime');
var Promise = require('bluebird');
var resolvePath = require('./path');
var url = require('url');

var preadFile = Promise.promisify(fs.readFile);

module.exports = function (to, options, callback) {
  var toUrl;

  /* eslint-disable no-param-reassign */

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = Object.assign({
    basePath: '.',
    loadPaths: []
  }, options);

  /* eslint-enable */

  toUrl = url.parse(to);

  return resolvePath(toUrl.pathname, options)
    .then(function (resolvedPath) {
      var mediaType = mime.getType(resolvedPath);
      return preadFile(resolvedPath)
        .then(function (buffer) {
          var content = encodeBuffer(buffer, mediaType);
          return 'data:' + mediaType + ';' + content + (toUrl.hash || '');
        });
    })
    .nodeify(callback);
};
