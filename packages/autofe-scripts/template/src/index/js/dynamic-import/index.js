/**
 * import() 和 require.ensure()
 *
 * 不用 babel 里的 System.import
 *
 * 用法说明
 * 1. 需要配置好 publicPath ，依赖此路径查找 chunk
 * 2. 指定 chunkName 的方式不同
 * 3. 当指定的 chunkName 同名时，会合并为一个 chunk 输出
 *    rank-commonjs.js --> rank-commonjs.js
 *    rank.js + rank-test.js --> rank.js
 * 4. ES6 Module，需要自己 rank.default，
 *    因为 import() 代表 import * from './rank'，
 *    而不是 import rank from './rank
 *
 * 转换说明
 * 1. 依赖 Promise 对象，需要引用 es6-promise 或者 babel-polyfill
 * 2. 直接使用 rank.default 在 IE 有问题，需要改用 rank['default']
 */
import(/* webpackChunkName: "rank" */ './rank').then((rank) => {
  console.log(rank.name, rank.default);
});

require.ensure([], (require) => {
  const rank = require('./rank-commonjs');
  console.log('rank-commonjs', rank);
}, 'rank-commonjs');

require.ensure([], (require) => {
  const rank = require('./rank-test');
  console.log('rank-test', rank.list);
}, 'rank');
