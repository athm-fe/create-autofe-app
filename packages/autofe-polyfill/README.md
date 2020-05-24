# autofe-polyfill

This package inclues polyfills used by [Create AutoFE App](https://github.com/athm-fe/create-autofe-app).

Polyfills
* Promise [es6-promise](https://github.com/stefanpenner/es6-promise)
* Object.assign [object-assign](https://github.com/sindresorhus/object-assign)

TODOs
* whatwg-fetch
* core-js/features/symbol (for...of)
* core-js/features/array/from (iterable spread)
* core-js/features/map (ie9)
* core-js/features/set (ie9)
* raf (ie9)

useBuiltIns: usage
不需要自己做额外处理，Creator 会自动处理代码中用到的 Polyfill

useBuiltIns: entry
* core-js/stable
* regenerator-runtime/runtime

思考纬度
* 语法 + Polyfill
* 代码 + 依赖包
* 手动 + 半自动 + 自动 useBuiltIns
* browserslist