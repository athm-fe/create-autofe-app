/**
 * Usage
 *
 * in entry config
 * require.resolve('./polyfills')
 * require.resolve('autofe-polyfill')
 */

/**
 * https://github.com/es-shims/es5-shim
 *
 * ============== shim ==============
 *
 * Function.prototype.bind();
 * import()/require.ensure()
 * https://github.com/Raynos/function-bind
 * es5-shim 的有一些缺陷，需要验证是否可用
 *
 * Array.prototype.indexOf();
 * Object rest
 *
 * Array.isArray();
 * string destructuring
 * string spread
 *
 * ============== sham ==============
 *
 * Object.create();
 * class
 * 依赖 Object.defineProperties ？
 *
 * Object.getOwnPropertyDescriptor();
 * object enhanced, super.xxx(), _get helper
 * https://www.npmjs.com/package/object.getownpropertydescriptors
 * es5-sham 的有一些缺陷，需要验证是否可用
 *
 * ============== sham optional ==============
 * Object.defineProperty
 * Object.defineProperties
 * Object.getPrototypeOf
 * Object.freeze
 */
require('es5-shim');
require('es5-shim/es5-sham');

/**
 * es6
 *
 * [][Symbol.iterator]();
 * string destructuring, _slicedToArray helper
 * Symbols, Iterators
 * https://github.com/medikoo/es6-symbol
 * core-js
 */
// core-js(/library)/es6/symbol
// core-js(/library)/fn/symbol
// core-js(/library)/fn/symbol/iterator

// core-js(/library)/fn/array/iterator
// core-js(/library)/fn/string/iterator

/**
 * Array.from();
 * string spread
 * https://www.npmjs.com/package/array.from
 */
// require('array.from');
require('core-js/fn/array/from');

/**
 * Object.assign();
 * Object spread
 * https://github.com/ljharb/object.assign
 * https://github.com/sindresorhus/object-assign
 */
Object.assign = require('object-assign');

/**
 * Promise
 * import()/require.ensure()
 * https://github.com/stefanpenner/es6-promise
 * https://github.com/then/promise
 */
require('es6-promise/auto');
