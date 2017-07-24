/**
 * 浏览器兼容性很棒，低版本 IE 也没有问题
 */
const modA = require('./modA');
const { name, say } = require('./modB');
const modC = require('./modC');

console.log('modA.name === "modA"', modA.name === 'modA');
console.log('modA.say() === "modA say..."', modA.say() === 'modA say...');

console.log('name === "modB"', name === 'modB');
console.log('say() === "modB say..."', say() === 'modB say...');

console.log('modC.name === "modC"', modC.name === 'modC');
console.log('modC.say() === "modC say..."', modC.say() === 'modC say...');
