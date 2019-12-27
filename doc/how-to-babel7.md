# 升级到 Babel 7

详情请参加官方文档 [Upgrade to Babel 7](https://babeljs.io/docs/en/v7-migration)。

## Webpack 集成



## Polyfill

这是个大问题

### `@babel/polyfill`

`@babel/polyfill` 不再推荐使用，建议改为如下方式：

```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```

提供如下内容
* Built-ins like `Promise` or `WeakMap`
* Static methods like `Array.from` or `Object.assign`
* Instance methods like `Array.prototype.includes`
* Generator functions, regenerator runtime

优点：
1. 无脑引用，简单方便
缺点
1. 引入的 Polyfill 太多，文件太大

### `core-js`

如果你仅仅需要某几个新特性，可以直接使用 `core-js` 明确引用

```javascript
import 'core-js/features/array/from'; // <- at the top of your entry point
import 'core-js/features/array/flat'; // <- at the top of your entry point
import 'core-js/features/set';        // <- at the top of your entry point
import 'core-js/features/promise';    // <- at the top of your entry point
```

### `@babel/preset-env`

automatically determines plugins and polyfills you need based on your supported environments

`useBuiltIns` 可以配置为 `entry` 和 `usage`。

设置为 `usage`

```javascript
Promise.resolve().finally();
```

被处理成

```javascript
require("core-js/modules/es.promise.finally");

Promise.resolve().finally();
```

### `@babel/plugin-transform-runtime`

`@babel/runtime` is similar to the polyfill except that it doesn't modify the global scope.

it is to be used with `@babel/plugin-transform-runtime`

`@babel/runtime` now only contains the helpers,
and if you need `core-js` you can use `@babel/runtime-corejs2` and the option provided in the transform.
For both you still need the `@babel/plugin-transform-runtime`

Only Helpers

```
npm install @babel/runtime
npm install @babel/plugin-transform-runtime --save-dev
```

```json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

Helpers + Polyfilling from `core-js`

```
npm install @babel/runtime-corejs2
npm install @babel/plugin-transform-runtime --save-dev
```

```json
{
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 2,
    }],
  ]
}
```

### API

自己总结
* string spread: Array.isArray() + Symbol.iterator + Array.from
* tagged template strings: Object.freeze + Object.defineProperties
* string destructuring: Array.isArray() + Symbol.iterator + Iterator (or Array.from)
* for-of: Symbol.iterator + Iterator, 开启 loose 后，使用 Array.isArray() 判断数组并才用数组访问方式
* class: loose 模式依赖 Object.create(), 非 loose 模式以及继承 Native Class 需要 IE11，因为依赖 `Object.setPrototypeOf` or `__proto__`
* Object.defineProperty


https://babeljs.io/docs/en/caveats

Polyfills
* Async functions, Generators ----- regenerator runtime
* Array destructuring, For Of ----- Symbol, prototype[Symbol.iterator], Iterator
* Spread ----- Array.from

Classes
* 继承 Native Class 有问题
* 非 loose 模式依赖 `Object.setPrototypeOf`，兼容到 IE11

ES5
* 除此之外，Babel 还用到许多 ES5 方法

更新的 API
* Object.assign()
* Array.from()

Array#concat，indexOf
String#concat，indexOf

webpack
* Object.defineProperty
* 弱依赖 Symbol.toStringTag
* Object.create
* import() 依赖 Promise

regenerator runtime
* 弱依赖 Symbol，Symbol.iterator，Symbol.asyncIterator，Symbol.toStringTag
* 弱依赖 Generator
* 弱依赖 setPrototypeOf 和 __proto__
* Object.create()
* Promise
* forEach

helpers
* typeof ----- 兼容处理 typeof Symbol()
* asyncIterator ----- Symbol.asyncIterator 或 Symbol.iterator
* AsyncGenerator ----- Promise，弱依赖 Symbol.asyncIterator
* wrapAsyncGenerator ----- 见上面的 AsyncGenerator
* asyncGeneratorDelegate ----- Promise，弱依赖 Symbol.iterator
* asyncToGenerator ----- Promise
* createClass ----- Object.defineProperty，descriptor.enumerable configurable writable key value，弱依赖 Object.getOwnPropertySymbols
* defaults ----- Object.getOwnPropertyNames，Object.getOwnPropertyDescriptor，Object.defineProperty
* defineProperty ----- Object.defineProperty
* extends ----- 弱依赖 Object.assign
* objectSpread ----- Object.defineProperty，Object.keys(), Object.getOwnPropertySymbols, Array.prototype.filter(), Array.prototype.forEach()， Array.prototype.concat(), Object.getOwnPropertyDescriptor(source, sym).enumerable, Object.defineProperties
* inheritsLoose ----- Object.create
* inherits ----- 参见下面的 setPrototypeOf，Object.create
* getPrototypeOf ----- Object.getPrototypeOf 或 __proto__
* setPrototypeOf ----- Object.setPrototypeOf 或 __proto__
* construct ----- 参见上面的 setPrototypeOf，Function.bind.apply，弱依赖 Reflect.construct
* wrapNativeSuper ----- 参见上面的 construct、getPrototypeOf 和 setPrototypeOf，Object.create，弱依赖 Map
* instanceof ----- 弱依赖 Symbol.hasInstance
* interopRequireWildcard ----- 弱依赖 WeakMap，Object.defineProperty，Object.getOwnPropertyDescriptor
* objectWithoutPropertiesLoose ----- Object.keys，indexOf
* objectWithoutProperties ----- 弱依赖 Object.getOwnPropertySymbols，excluded.indexOf，Object.prototype.propertyIsEnumerable
* superPropBase ----- 参见上面的 getPrototypeOf
* get ----- 参见上面的 superPropBase，Object.getOwnPropertyDescriptor，弱依赖 Reflect.get
* set ----- 参加 superPropBase 和 defineProperty，Object.getOwnPropertyDescriptor，弱依赖 Reflect.set
* taggedTemplateLiteral ----- Object.freeze、Object.defineProperties
* slicedToArray ----- 参见 arrayWithHoles、iterableToArrayLimit
* slicedToArrayLoose ---- 参见 arrayWithHoles、iterableToArrayLimitLoose
* toArray ----- 参见 arrayWithHoles、iterableToArray
* toConsumableArray ----- 参见 arrayWithoutHoles、iterableToArray
* arrayWithoutHoles ----- Array.isArray()
* arrayWithHoles ----- Array.isArray()
* iterableToArray ----- Array.from，若 [Symbol.iterator] 或 is [object Arguments]
* iterableToArrayLimit ----- Symbol.iterator、Iterator
* iterableToArrayLimitLoose ----- Symbol.iterator、Iterator
* TypeError、ReferenceError
* toPrimitive ----- Symbol.toPrimitive
* toPropertyKey ----- 参见 toPrimitive
* applyDecoratedDescriptor ----- Object.keys、forEach、decorators.slice().reverse().reduce
* decorate ----- 还没仔细看
* wrapRegExp ----- 参见 wrapNativeSuper、getPrototypeOf、possibleConstructorReturn、inherits、Symbol.replace、WeakMap