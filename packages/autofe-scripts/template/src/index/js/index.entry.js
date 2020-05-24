/**
 * 请注意
 * ES6 模块不支持 IE < 9
 * CommonJS 模块支持 IE < 9
 */

import $ from 'jquery';
import { sum, PI } from './math';
import bg from '../img/bg.png';
import sharePic from '@/assets/share.png';
import svgContent from '../img/postcss-assets.svg?inline';

console.log('sum(3, 5)', sum(3, 5));
console.log('PI', PI);
console.log(bg);
console.log(sharePic);
console.log(svgContent);
console.log(process.env.BASE_URL);
console.log(process.env.NODE_ENV);
console.log(process.env.APP_TEST_ENV_FEATURE);
console.log(process.env.TEST_ENV_FEATURE);

$(function () {
  console.log('jQuery document.ready 中文');
});
