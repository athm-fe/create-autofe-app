// JSON?
// 额外引入吧，这里不管
// JSON3 or JSON2

// es5-shim
// https://github.com/es-shims/es5-shim#shims

// es5-sham or get from core-js
// https://github.com/es-shims/es5-shim#shams
// 只要下面这一个，其它的不要
// class
Object.create();

// Object spread
Object.assign();

// Object rest
Array.prototype.indexOf();

// import()/require.ensure()
Function.prototype.bind();

// import()/require.ensure()
// es6-promise
console.log(new Promise());

// webpackBootstrap
console.error();

// string spread
Array.isArray();

// string spread
Array.from();

// string destructuring
// _slicedToArray helper
Array.isArray();
// Symbol.iterator
// arr[Symbol.iterator]()

// object enhanced, super.xxx()
// _get helper
// 是否有 loose 模式？
Object.getOwnPropertyDescriptor();

// Symbols
// [Symbol.iterator]()
// Iterators
