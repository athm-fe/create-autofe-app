// stage 3
// ================

// Object rest/spread
// 参见 es6-code 下的说明

// Asynchronous Iterators
// async generators
// for await of
// babel 支持


// stage 2
// ================

// String trimming APIs
// trimLeft, trimRight, trimStart, trimEnd
// Polyfills

// class field
// class properties
// babel 插件支持
class C {
  x = 'x';
  static y = 'y';
}
console.log(
  "new C().x + C.y === 'xy'",
  new C().x + C.y === 'xy',
);
// private fields
// bable 不支持


// stage 1
// ================

// String.prototype.matchAll
// Babel polyfill

// do expressions
// Babel 插件

// Observable
// 待定


// stage 0
// ================

// bind (::) operator

// String.prototype.at

// asap

console.log('-------- stage --------');
