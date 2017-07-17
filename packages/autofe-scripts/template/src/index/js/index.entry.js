import modA, { name, child } from './modA';

console.log(name);
console.log(child);
console.log(modA());

import(/* webpackChunkName: "rank" */ './rank').then(rank => {
  console.log(rank.name, rank.default);
});

require.ensure([], function (require) {
  const rank = require('./rank-commonjs');
  console.log('rank-commonjs', rank);
}, 'rank-commonjs');

require.ensure([], function (require) {
  const rank = require('./rank-test');
  console.log('rank-test', rank);
}, 'rank');
