/* eslint no-undef: "off" */

console.log(
  "typeof g === 'undefined'",
  typeof g === 'undefined',
);
const f = function g() {};
console.log(
  "typeof g === 'undefined'",
  typeof g === 'undefined',
);
try {
  console.log('f === g', f === g);
} catch (e) {
  console.log('f === g cause the error', true);
}

console.log('-------- named function expression --------');
