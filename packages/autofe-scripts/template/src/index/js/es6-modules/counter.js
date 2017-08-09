/**
 * CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 */
export let counter = 3;
export function incCounter() {
  counter += 1;
}
