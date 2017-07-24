console.log('======== webpack + babel ========');

import(/* webpackChunkName: "es6-modules" */ './es6-modules').then(() => {
  console.log('-------- es6-modules --------');
});
import(/* webpackChunkName: "commonjs" */ './commonjs').then(() => {
  console.log('-------- commonjs --------');
});
import(/* webpackChunkName: "es6-code" */ './es6-code');
import(/* webpackChunkName: "dynamic-import" */ './dynamic-import');
