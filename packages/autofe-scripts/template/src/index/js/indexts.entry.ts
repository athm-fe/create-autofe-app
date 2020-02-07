import { sayHello, getString } from './hello';

console.group('ts');

console.log(sayHello('Tom'));
console.log(sayHello(1));
console.log(getString('test get string'));
console.log(getString(12345));
console.log(getString(['I', 'like', 'it']));

console.groupEnd();
