// 2016 features
// ================

// exponentiation (**) operator
// 转换为 Math.pow(), 低版本浏览器也支持
// basic
console.log(
  '2 ** 3 === 8 && -(5 ** 2) === -25 && (-5) ** 2 === 25',
  2 ** 3 === 8 && -(5 ** 2) === -25 && (-5) ** 2 === 25,
);
// assignment
let a = 2;
a **= 3;
console.log('let a = 2; a **= 3; a === 8', a === 8);

// Array.prototype.includes
// Polyfills

// nested rest destructuring, declarations
// nested rest destructuring, parameters
// TODO 这两个有疑问，babel 好像不支持，但是 compat-table 显示 babel 支持


// 2017 features
// ================

// Object APIs
// Polyfills
// Object.values, Object.entries
// Object.getOwnPropertyDescriptors

// String padding APIs
// Polyfills
// padStart, padEnd

// trailing commas in function syntax
// babel 支持，低版本 IE 支持
function f(
  w1,
  w2,
) {
  return w1 + w2;
}
console.log(
  'trailing commas in function syntax: in parameter lists',
  f(3, 5) === 8,
);
console.log(
  'trailing commas in function syntax: in argument lists',
  Math.min(
    1,
    2,
    3,
  ) === 1,
);

// async/await
// 转换为 generator，依赖 regenerator-runtime 或者原生 generator

console.log('-------- es2016plus --------');
