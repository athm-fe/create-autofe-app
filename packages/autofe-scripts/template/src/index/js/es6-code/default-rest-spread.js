/**
 * 如下的代码大多数没有兼容性问题
 *
 * 有问题的用法
 * 1. string spread
 *    Array.isArray(), Array.from()
 * 2. nested rest destructuring, declarations
 *    nested rest destructuring, parameters
 *    不支持
 */

// default parameter values
function foo(x, y = 12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
console.log('foo(3) === 15', foo(3) === 15);

// rest
function bar(x, ...y) {
  // y is an Array
  return x * y.length;
}
console.log('bar(3, "hello", true) === 6', bar(3, 'hello', true) === 6);

function bar2(x, ...y) {
  // y is an Array
  return y;
}
console.log('bar2(3, "hello", true)[0] === "hello"', bar2(3, 'hello', true)[0] === 'hello');
console.log('bar2(3, "hello", true)[1] === true', bar2(3, 'hello', true)[1] === true);

// rest destructuring, declarations
const [x, ...y] = [1, 2, 3, 4];
console.log('const [x, ...y] = [1, 2, 3, 4]', x === 1 && y[2] === 4);

// nested rest destructuring, declarations
// const [x, ...[y, ...z]] = [1, 2, 3, 4];
// x === 1 && y === 2 && z + '' === '3,4';

// nested rest destructuring, parameters
// function nestRest([x, ...[y, ...z]]) {
//   return x === 1 && y === 2 && z + '' === '3,4';
// }([1, 2, 3, 4]);

// spread
function too(s, t, u, v = 10) {
  return s + t + u + v;
}
// Pass each elem of array as argument
console.log('too(1, ...[2, 3], 20) === 26', too(1, ...[2, 3], 20) === 26);

// string spread
// 依赖 Array.isArray(), Array.from()
console.log(
  '["a", ..."bcd", "e"][3] === "d"',
  ['a', ...'bcd', 'e'][3] === 'd',
);

console.log('-------- default, rest, spread --------');
