/* eslint-disable */
/**
 * 都没有兼容性问题
 *
 * 就是还不支持 Temporal Dead Zone
 */

// let 和 const 不允许重复定义
// const 不允许修改变量值
// 否则，webpack + babel 打包时报错
function test() {
  {
    let x;
    {
      // this is ok since it's a block scoped name
      const x = "sneaky";

      // // error, was just defined with `const` above
      // x = "foo";
    }
    // this is ok since it was declared with `let`
    x = "bar";

    // // error, already declared above in this block
    // let x = "inner";
  }
}
test();

// 变量提升
// --------------------

console.log('var foo === undefined', foo === undefined); // 输出 undefined
var foo = 2;

// Temporal Dead Zone
try {
  bar = 3; // 应当报错 ReferenceError
  console.warn('Temporal Dead Zone', false);
  let bar = 2;
} catch (e) {
  console.log('Temporal Dead Zone', true);
}

// 块级作用域
// --------------------

{
  let a = 10;
  const b = 20;
  var c = 100;
  a += b;
  console.log('a === 30', a === 30);
}
try {
  console.log('a:', a);
} catch (e) {
  console.log('a is not defined', e instanceof ReferenceError);
}
console.log('c === 100', c === 100);

var scopeArray = [];
for (var i = 0; i < 10; i++) {
  scopeArray[i] = () => i;
}
console.log('scopeArray[6]() === 10', scopeArray[6]() === 10);

var scopeArray2 = [];
for (let i = 0; i < 10; i++) {
  scopeArray2[i] = () => i;
}
console.log('scopeArray2[6]() === 6', scopeArray2[6]() === 6);

console.log('-------- let & const --------');
