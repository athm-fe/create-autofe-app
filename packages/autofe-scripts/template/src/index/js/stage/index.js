// stage 3
// ================

/**
 * object rest
 * object spread
 *
 * 依赖
 * Object.assign
 * _objectWithoutProperties, Array.prototype.indexOf
 */
// object rest
const { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log(
  'object rest',
  a === 1 && rest.a === undefined && rest.b === 2 && rest.c === 3,
);

// object spread
const spread = { b: 2, c: 3 };
const spreadResult = { a: 1, ...spread };
console.log(
  'object spread',
  spreadResult !== spread && (spreadResult.a + spreadResult.b + spreadResult.c) === 6,
);

// async generator functions
// for-await-of
// babel 支持


// stage 2
// ================

// String trimming APIs
// trimLeft, trimRight, trimStart, trimEnd
// Polyfills

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


// stage 1
// ================

// String.prototype.matchAll
// Babel polyfill

// do expressions
// Babel 插件

// Observable
// 待定

// decorators
// 待定

// export-extensions
// 待定


// stage 0
// ================

// bind (::) operator

// String.prototype.at

// asap

console.log('-------- stage --------');
