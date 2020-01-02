var ES6Promise = require('es6-promise');
var objectAssign = require('object-assign');

ES6Promise.polyfill();

if (typeof Object.assign != 'function') {
  Object.assign = objectAssign;
}
