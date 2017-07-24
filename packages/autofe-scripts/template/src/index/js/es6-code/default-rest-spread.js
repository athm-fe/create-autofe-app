/**
 * 如下的代码都没有兼容性问题
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

// spread
function too(x, y, z, a = 10) {
  return x + y + z + a;
}
// Pass each elem of array as argument
console.log('too(1, ...[2, 3], 20) === 26', too(1, ...[2, 3], 20) === 26);

console.log('-------- default, rest, spread --------');
