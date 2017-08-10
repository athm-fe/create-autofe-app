/**
 * 依赖 Object.defineProperty ，所以不支持 IE8
 *
 * Tree sharking
 *
 * http://babeljs.io/docs/usage/caveats/#internet-explorer-getters-setters-8-and-below-
 */
import modA, { name, child } from './modA';
import * as math from './math';
import { counter, incCounter as addCounter } from './counter';

console.log('modA() === "modA"', modA() === 'modA');
console.log('name === "modA"', name === 'modA');
console.log('child === "modB"', child === 'modB');

console.log('math.sum(3, 5) === 8', math.sum(3, 5) === 8);
console.log('math.pi === 3.141593', math.pi === 3.141593);

console.log('counter === 3', counter === 3); // 3
addCounter();
console.log('counter === 4', counter === 4); // 4

console.log('-------- es6-modules --------');
