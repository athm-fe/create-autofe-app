// es5-shim or get from core-js
// https://github.com/es-shims/es5-shim#shims
// import()/require.ensure()
Function.prototype.bind();
// Object rest
Array.prototype.indexOf();
// string spread
// string destructuring
Array.isArray();


// es5-sham or get from core-js
// https://github.com/es-shims/es5-shim#shams
// 只要下面这一个，其它的不要
// class
Object.create();
// object enhanced, super.xxx()
// _get helper
Object.getOwnPropertyDescriptor();
// Object.defineProperty
// Object.defineProperties
// Object.getPrototypeOf
// Object.freeze


// es6
// string destructuring
// _slicedToArray helper
// Symbol
// Iterator
[][Symbol.iterator]();
// import()/require.ensure()
// es6-promise
Promise.all();
// string spread
Array.from();
// Object spread
Object.assign();
// Object.setPrototypeOf
// Object.prototype.__proto__
