/**
 * Destructuring 解构
 *
 * 当前的代码都没有兼容性问题
 */

// array matching
const [a, , b] = [1, 2, 3];
console.log('a === 1', a === 1);
console.log('b === 3', b === 3);

// object matching
const { name: c, age: d } = { name: 'Tom', age: 30, weight: 70 };
console.log('c === "Tom"', c === 'Tom');
console.log('d === 30', d === 30);

// object matching shorthand
const { name, age } = { name: 'Tom', age: 30, weight: 70 };
console.log('name === "Tom"', name === 'Tom');
console.log('age === 30', age === 30);

// Can be used in parameter position
function g({ name: x = 10 }) {
  return x;
}
console.log('g({ name: 5 }) === 5', g({ name: 5 }) === 5);
console.log('g({}) === 10', g({}) === 10);

// Fail-soft destructuring
const [soft] = [];
console.log('soft === undefined', soft === undefined);

// Fail-soft destructuring with defaults
const [softDefault = 1] = [];
console.log('softDefault === 1', softDefault === 1);

// Destructuring + defaults arguments
function r({ x, y, w = 10, h = 10 }) {
  return x + y + w + h;
}
console.log('r({ x: 1, y: 2 }) === 23', r({ x: 1, y: 2 }) === 23);

console.log('-------- destructuring --------');
