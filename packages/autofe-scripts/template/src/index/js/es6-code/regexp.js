/**
 * y 和 u
 * babel 支持 u ，不支持 y
 */

const s = 'aaa_aa_a';
const r1 = /a+/g;
const r2 = /a+/y;

console.log(r1.exec(s)[0] === 'aaa');
console.log(r2.exec(s)[0] === 'aaa');

console.log(r1.exec(s)[0] === 'aa');
console.log(r2.exec(s) === null);

console.log('-------- regexp --------');
