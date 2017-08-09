/**
 * 可以放心使用的也就是 Shorthand
 *
 * super.xxx() 以及 Computed (dynamic) property names
 * 会导致不支持 IE8
 *
 * 开启对应插件的 loose 模式，支持 Computed (dynamic) property names
 *
 * __proto__ in obj 不被 babel 支持，需要浏览器原生，不过这里有取巧，不支持也OK
 *
 * 依赖
 * Object.getOwnPropertyDescriptor()
 */

const bar = 'bar';
const foo = 'foo';

const theProtoObj = {
  toString() {
    return 'theProtoObj.toString()';
  },
};

// const theProtoObj2 = {
//   toString() {
//     return 'theProtoObj2.toString()';
//   },
// };

const enhancedObj = {
  // Sets the prototype.
  __proto__: theProtoObj,
  // Computed property name does not set prototype or trigger early error for
  // duplicate __proto__ properties.
  // 下面这种方式是不行的，chrome 下 super.toString() 会报错
  // ['__proto__']: theProtoObj2,
  // Methods
  say() {
    return 'hello world';
  },
  // reserved words
  default: 3,
  // Shorthand
  bar,
  toString() {
    return `enhancedObj.toString() ---- ${super.toString()}`;
  },
  [foo]: foo,
  // Super calls，会使用类似 class 里的 _get() 方法，不支持 IE8
  // Computed (dynamic) property names
  // 导致使用 defineProperty
  [`prop_${(() => 42)()}`]: 42,
};
console.log('enhancedObj.say():', enhancedObj.say());
console.log('enhancedObj.default', enhancedObj.default === 3);
console.log('enhancedObj.bar:', enhancedObj.bar);
console.log('enhancedObj.toString():', enhancedObj.toString());
console.log('enhancedObj.foo:', enhancedObj.foo);
console.log('enhancedObj.prop_42L', enhancedObj.prop_42);

console.log('-------- enhanced object --------');
