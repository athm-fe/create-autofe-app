/**
 * 请注意
 * ES6 模块不支持 IE < 9
 * CommonJS 模块支持 IE < 9
 */

import $ from 'jquery';
import { sum, PI } from './math';
import bg from '../img/bg.png';
import sharePic from 'assets/share.png';

console.log('sum(3, 5)', sum(3, 5));
console.log('PI', PI);
console.log(bg);
console.log(sharePic);

$(function () {
  console.log('jQuery document.ready 中文');
});
