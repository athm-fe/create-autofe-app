/**
 * TODO 需要 regenerator-runtime
 * babel polyfill 可以提供支持
 */

function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
}

const hw = helloWorldGenerator();

let result = hw.next();
console.log(result.value === 'hello' && result.done === false);
result = hw.next();
console.log(result.value === 'world' && result.done === false);
result = hw.next();
console.log(result.value === undefined && result.done === true);


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

async function* agf() {
  await 1;
  yield 2;
}

console.log('-------- generators --------');
