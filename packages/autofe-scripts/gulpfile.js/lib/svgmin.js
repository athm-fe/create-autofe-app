const { Transform } = require('stream');
const SVGO = require('svgo');
const PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-svgmin';

module.exports = function(options = {}) {
  const stream = new Transform({ objectMode: true });
  let svgo = new SVGO(options);

  stream._transform = function(file, encoding, next) {
    if (file.isNull()) {
      return next(null, file);
    }

    if (file.isStream()) {
      return next(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      svgo.optimize(String(file.contents)).then(result => {
        file.contents = new Buffer(result.data);
        next(null, file);
      }).catch(error => {
        next(new PluginError(PLUGIN_NAME, error));
      });
    }
  };

  return stream;
};