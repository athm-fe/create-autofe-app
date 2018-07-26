function Assets(options) {
  if (!(this instanceof Assets)) {
    return new Assets(options);
  }

  this.options = Object.assign({}, options);
  Object.freeze(this);
}

['data', 'path', 'url'].forEach(function (resolver) {
  Assets[resolver] = require('./' + resolver);
  Assets.prototype[resolver] = function (path, callback) {
    return Assets[resolver](path, this.options, callback);
  };
});

module.exports = Assets;
