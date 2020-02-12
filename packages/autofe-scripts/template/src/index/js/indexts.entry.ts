import { sayHello, getString } from './hello';

console.group('ts');

console.log(sayHello('Tom'));
console.log(getString('test get string'));
console.log(getString(12345));

console.groupEnd();
