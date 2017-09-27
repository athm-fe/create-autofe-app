require('./let-const');
require('./template-string');
require('./arrow-function');
require('./named-function-expression');
require('./class');
require('./enhanced-object');
require('./destructuring');
require('./default-rest-spread');
require('./for-of');
// require('./generators');
require('./unicode');
// require('./regexp');
require('./binary-octal');


// Symbols
// babel polyfill 可以提供大多数支持，有一些功能不支持


// Map + Set + WeakMap + WeakSet
// babel polyfill 可以提供全面的支持


// Math + Number + String + Object APIs + RegExp + Array + Date
// babel polyfill 可以支持大多数
// Object.setPrototypeOf 需要原生 __proto__ 支持
// String.prototype.normalize 需要额外支持
// https://github.com/addyosmani/es6-tools#polyfills


// Promise
// babel polyfill 提供全面支持


// Generator and Async/await
// 太重，不适合用，Promise 先凑合吧


// Decorator
// 待定


// Reflect
// babel polyfill 提供大多数支持


// Proxies
// Due to the limitations of ES5,
// Proxies cannot be transpiled or polyfilled


// Subclassable Built-ins
// transform-es2015-classes/
// 不要用，Babel 支持不了
// babel-plugin-transform-builtin-extend
// 依赖 Object.setPrototypeOf 和 Reflect.construct
// 兼容性有限


// ArrayBuffer, typed arrays
// 待定
