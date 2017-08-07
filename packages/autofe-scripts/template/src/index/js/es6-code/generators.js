/**
 * TODO 需要 regenerator-runtime
 * babel polyfill 可以提供支持
 */

function Range(low, high) {
  this.low = low;
  this.high = high;
}
Range.prototype[Symbol.iterator] = function* () {
  for (let i = this.low; i <= this.high; i += 1) {
    yield i;
  }
};

const range = new Range(3, 5);
for (const i of range) {
  console.log(i); // prints 3, then 4, then 5 in sequence
}


function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}
asyncPrint('hello world', 50);

console.log('-------- generators --------');
