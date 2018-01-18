/**
 * 请注意
 * ES6 模块不支持 IE < 9
 * CommonJS 模块支持 IE < 9
 */

import { sum, PI } from './math';

console.log('sum(3, 5)', sum(3, 5));
console.log('PI', PI);
