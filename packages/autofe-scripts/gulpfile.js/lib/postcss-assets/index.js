var util = require('util');
var dirname = require('path').dirname;
var postcss = require('postcss');
var functions = require('postcss-functions');
var Assets = require('../assets/index.js');

function formatUrl(url) {
  return util.format('url(%s)', quote(url));
}

var R_ESCAPE = /\\(?:([0-9a-f]{1,6} ?)|(.))/gi;
function unescapeCss(string) {
  return string.replace(R_ESCAPE, function unescapeSequence(match, hex, char) {
    if (hex) {
      return String.fromCharCode(parseInt(hex, 16));
    }
    return char;
  });
}

var R_QUOTES = /'/g;
function quote(string) {
  if (string[0] === "'" || string[0] === '"') {
    return string;
  }
  return util.format("'%s'", string.replace(R_QUOTES, function escapeQuote(match, offset, string) {
    if (string[offset - 1] === '\\') {
      return match;
    }
    return '\\' + match;
  }));
}

function unquote(string) {
  if (string[0] !== '\'' && string[0] !== '"') {
    return string;
  }
  return string.slice(1, -1);
}

function plugin(options) {
  var params = options || {};
  var resolver;

  if (params.relative === undefined) {
    params.relative = false;
  }

  resolver = new Assets(options);

  return postcss()
    .use(function appendInputDir(css) {
      var inputDir;

      if (css.source.input.file) {
        inputDir = dirname(css.source.input.file);

        resolver.options.loadPaths = resolver.options.loadPaths || [];
        resolver.options.loadPaths.unshift(inputDir);

        if (params.relative === true) {
          resolver.options.relativeTo = inputDir;
        }
      }

      if (typeof params.relative === 'string') {
        resolver.options.relativeTo = params.relative;
      }
    })
    .use(functions({
      functions: {
        resolve: function resolve(path) {
          var normalizedPath = unquote(unescapeCss(path));
          return resolver.url(normalizedPath).then(formatUrl);
        },
        inline: function inline(path) {
          var normalizedPath = unquote(unescapeCss(path));
          return resolver.data(normalizedPath).then(formatUrl);
        }
      }
    }));
}

module.exports = postcss.plugin('postcss-assets', plugin);
