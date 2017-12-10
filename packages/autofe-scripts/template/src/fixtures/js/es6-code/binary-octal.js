/**
 * Binary and Octal Literals 二进制和八进制
 * Babel 转换不了 Number('0o1')
 */
console.log('0b111110111 === 503', 0b111110111 === 503);
console.log('0o767 === 503', 0o767 === 503);
console.log('Number("0o1") === 1', Number('0o1') === 1);
console.log('Number("0b1") === 1', Number('0b1') === 1);

// Outputs:
// console.log('0b111110111 === 503', 503 === 503);
// console.log('0o767 === 503', 503 === 503);
// console.log('Number("0o1") === 1', Number('0o1') === 1);
// console.log('Number("0b1") === 1', Number('0b1') === 1);

console.log('-------- binary, octal --------');
