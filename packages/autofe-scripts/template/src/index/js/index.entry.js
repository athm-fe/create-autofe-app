console.log('======== webpack + babel ========');

import(/* webpackChunkName: "es5-code" */ './es5-code');
import(/* webpackChunkName: "commonjs" */ './commonjs');
import(/* webpackChunkName: "es6-modules" */ './es6-modules');
import(/* webpackChunkName: "es6-code" */ './es6-code');
import(/* webpackChunkName: "es2016plus" */ './es2016plus');
import(/* webpackChunkName: "stage" */ './stage');
import(/* webpackChunkName: "dynamic-import" */ './dynamic-import');
