/**
 * Iterators 需要 babel polyfill 支持
 *
 * 可以使用 ESLint 禁用 iterators，禁止 for-in 和 for-of
 * ESLint: no-iterator no-restricted-syntax
 *
 * Use map() / every() / filter() / find() / findIndex() /
 * reduce() / some() / ... to iterate over arrays,
 * and Object.keys() / Object.values() / Object.entries()
 * to produce arrays so you can iterate over objects.
 *
 * 依赖 Symbol 和 Iterator
 * for...of是坑，转换后的代码太难看，而且有兼容性问题
 *
 * Iterator 还好，如果是针对 Generator 的 Iterator 暂时不要用，
 * 因为 Generator 太重了
 *
 * 对于数组的转换进行了优化
 */
let sum = 0;
for (const item of [1, 2, 3]) {
  sum += item;
}
console.log('sum === 6 after for...of', sum === 6);
// Outputs:
// var _arr = [1, 2, 3];
// for (var _i = 0; _i < _arr.length; _i++) {
//   var item = _arr[_i];
//   console.log(item);
// }

try {
  function from(a1, a2, a3) {
    return [a1 * 2, a2 * 2, a3 * 2];
  }
  sum = 0;
  for (const item of from(1, 2, 3)) {
    sum += item;
  }
  console.log('sum === 12 after for...of', sum === 12);
} catch (e) {
  console.warn('for-of iterator does not support');
}

try {
  const array = [];
  for (const item of '123') {
    array.push(item);
  }
  console.log('string for-of', array.length === 3 && array[2] === '3');
} catch (e) {
  console.warn('for-of iterator does not support');
}


console.log('-------- for...of --------');
