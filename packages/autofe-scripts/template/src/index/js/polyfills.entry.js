// require('autofe-polyfill');
// require('babel-polyfill');

// Object.assign
if (!Object.assign) {
  Object.assign = function assign(target) {
    for (let index = 1; index < arguments.length; index += 1) {
      const src = arguments[index];

      for (const key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) {
          target[key] = src[key];
        }
      }
    }

    return target;
  };
}
