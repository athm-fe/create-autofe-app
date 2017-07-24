/**
 * 放心用，兼容低版本 IE
 *
 * String.raw 会导致兼容性问题
 * tagged template strings 会使用 Object.freeze 和 Object.defineProperties
 */

const name = 'ES5';
const templateStr = `In ${name} this is
  not legal.`;
console.log('templateStr === "In ES5 this is\n  not legal."',
  templateStr === 'In ES5 this is\n  not legal.');

// alert`123`;

// function echo(str) {
//   return str;
// }
// console.log(
//   'echo`name`[0] === "name"',
//   echo`name`[0] === 'name',
// );

// Unescaped template strings
// String.raw`In ES5 "\n" is a line-feed.`;

console.log('-------- template string --------');
