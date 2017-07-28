/**
 * 绝大多数是 IE8 不支持，IE9 基本全支持。
 *
 * API: core-js, es5-shim
 * 对于 Object 的 Polyfills 不完全，
 * 所以一些 ES6 功能即使经过 babel 转换，也需要从 IE9 开始用
 *
 * 例外情况
 * 1. IE8 支持 JSON
 * 2. IE9 不支持 Strict mode ，IE10 支持
 * 3. IE8 DOM 对象才支持 Object.defineProperty
 */

// JSON
// 手动额外引入以支持 IE67
console.log(
  'typeof JSON === "object"',
  typeof JSON === 'object',
);

// Getter accessors
// Setter accessors
// IE8 不支持，不要用
console.log(
  'Getter accessors',
  ({ get x() { return 1; } }).x === 1,
);
let value = 0;
({ set x(v) { value = v; } }).x = 1;
console.log('Setter accessors', value === 1);

// Trailing commas in object literals
// Trailing commas in array literals
// babel 完美解决
const cObj = {
  a: true,
};
console.log('Trailing commas in object literals', cObj.a === true);
const cArray = [
  'a',
  'b',
  'c',
];
console.log(
  'Trailing commas in array literals',
  cArray[2] === 'c' && cArray[3] === undefined,
);

// Reserved words as property names
// 有两个 babel 插件可以搞定
const foo = {
  default: x => x + 3,
};
console.log(
  'Reserved words as property names',
  foo.default(3) === 6,
);

// Object APIs
// Polyfills
//   es5-shim 只支持 Object.keys
//   core-js 也没有全支持
// Object.create
// Object.defineProperty, Object.defineProperties
// Object.getPrototypeOf
// Object.keys
// Object.seal, Object.freeze, Object.preventExtensions
// Object.isSealed, Object.isFrozen, Object.isExtensible
// Object.getOwnPropertyDescriptor
// Object.getOwnPropertyNames

// Array APIs
// Polyfills, es5-shim 全支持
// Array.isArray
// indexOf, lastIndexOf,
// every, some, forEach, map, filter, reduce, reduceRight
// sort: compareFn must be function or undefined

// String APIs
// Polyfills, es5-shim 全支持
// trim
// Property access on strings
console.log("'foobar'[3] === 'b'", 'foobar'[3] === 'b');
//   IE8 支持, IE67 不确定

// Date APIs
// Polyfills, es5-shim 全支持
// Date.now()
// toISOString
// toJSON

// Function
// Polyfills, es5-shim 全支持
// bind

// Function.prototype.apply permits array-likes
(function (a, b) {
  console.log(
    'Function.prototype.apply permits array-likes',
    a === 1 && b === 2,
  );
}).apply({}, { 0: 1, 1: 2, length: 2 });

// parseInt ignores leading zeros
// Polyfills, es5-shim
console.log(
  'parseInt("010", 10) === 10',
  parseInt('010', 10) === 10,
);

// Immutable globals
// undefined, NaN, Infinity
// IE8 不支持，不过也没有什么影响
undefined = 12345;
console.log(
  'undefined is Immutable',
  typeof undefined === 'undefined',
);
NaN = false;
console.log(
  'NaN is Immutable',
  typeof NaN === 'number',
);
Infinity = 12345;
console.log(
  'Infinity is Immutable',
  typeof Infinity === 'number',
);

// Strict mode
// IE10 才支持，不过不支持也没关系，不用管它
// 因为 babel 和 eslint 已经把相关问题搞定了

console.log('-------- es5-code --------');
