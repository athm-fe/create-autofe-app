# 升级到 Babel 7

详情请参加官方文档 [Upgrade to Babel 7](https://babeljs.io/docs/en/v7-migration)。

## Webpack 集成



## `@babel/polyfill`

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

## `core-js`

如果你仅仅需要某几个新特性，可以直接使用 `core-js` 明确引用

```javascript
import 'core-js/features/array/from'; // <- at the top of your entry point
import 'core-js/features/array/flat'; // <- at the top of your entry point
import 'core-js/features/set';        // <- at the top of your entry point
import 'core-js/features/promise';    // <- at the top of your entry point
```

## `@babel/preset-env`

preset-env 会根据你需要支持的环境，自动决定哪些 Babel 插件来转换代码，另外还会根据你的 `useBuiltIns` 配置来决定如何添加 Polyfills。

`useBuiltIns` 可以配置为 `false`，`'entry'` 和 `'usage'`。

### 设置为 `false`

preset-env 不会添加任何 Polyfills，需要你自行处理。

```
npm i --save core-js@3
```

```javascript
import 'core-js/features/promise';
```

### 设置为 `'usage'`

preset-env 会自动分析代码，并添加需要的 Polyfills。

**注意：不会添加你没有使用到的 Polyfills。**

```
npm i --save core-js@3
```

```javascript
Promise.resolve().finally();
```

被处理成

```javascript
require("core-js/modules/es.promise.finally");

Promise.resolve().finally();
```

### 设置为 `'entry'`

preset-env 如果发现有手动使用 core-js，会自动转化为需要的 Polyfills。

**注意：不考虑该 Polyfills 是否被真正使用，只是根据 targets 或者 browserlist 引用**

```
npm i --save core-js@3
```

```javascript
import "core-js/stable";
```

**另外，需要注意，在 Webpack 配置文件的 entry 中配置的 `@babel/polyfill` 不会被 preset-env 自动识别，也就是说无论你的 `useBuiltIns` 配置成什么都不会做任何转换处理。**

## `@babel/plugin-transform-runtime`

it is to be used with `@babel/plugin-transform-runtime`

`@babel/runtime` now only contains the helpers,
and if you need `core-js` you can use `@babel/runtime-corejs2` and the option provided in the transform.
For both you still need the `@babel/plugin-transform-runtime`

### Only Helpers

```
npm install @babel/runtime --save
npm install @babel/plugin-transform-runtime --save-dev
```

```json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

### Helpers + Polyfilling from `core-js`

```
npm install @babel/runtime-corejs3
npm install @babel/plugin-transform-runtime --save-dev
```

```json
{
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3,
    }],
  ]
}
```

## Babel 转换后代码依赖的 API

首先，Babel 原意是把 ES6+ 代码转换为 ES5 代码，因此肯定用到了很多的 ES5 的 API，从 `@babel/helpers` 就可以看到。

webpack
* import() 依赖 Promise

Polyfills
* Async functions, Generators ----- regenerator runtime
* Array destructuring, For Of ----- Symbol, prototype[Symbol.iterator], Iterator
* for of ----- 开启 loose 后，使用 Array.isArray() 判断数组并才用数组访问方式
* Spread ----- Array.from
* string spread: Symbol.iterator + Array.from()
* string destructuring: Symbol.iterator + Iterator or Array.from()

regenerator runtime
* 弱依赖 Symbol，Symbol.iterator，Symbol.asyncIterator，Symbol.toStringTag
* 弱依赖 Generator
* 弱依赖 setPrototypeOf 和 __proto__
* Promise

Classes
* 继承原生类不被 `IE<=10` 支持，因为需要包裹一下原生类，内部需要用到 `Object.setPrototypeOf` 或 `__proto__`。
* 继承类的静态属性不被 `IE<=10` 支持，因为其静态属性是通过 `__proto__` 实现的。

当使用 `@babel/plugin-transform-runtime` 优化 helpers 时，要注意将 `@babel/runtime` 加入 babel 处理，否则不会自动分析其需要的 Polyfills。

@babel/runtime/regenerator/index.js ---> regenerator-runtime/runtime.js

helpers
* typeof ----- 兼容处理 typeof Symbol()

* asyncIterator ----- Symbol.asyncIterator 或 Symbol.iterator
* AsyncGenerator ----- Promise，弱依赖 Symbol.asyncIterator
* asyncGeneratorDelegate ----- Promise，弱依赖 Symbol.iterator
* asyncToGenerator ----- Promise

for...of 等
* iterableToArray ----- Array.from，若 [Symbol.iterator] 或 is [object Arguments]
* iterableToArrayLimit ----- Symbol.iterator、Iterator
* iterableToArrayLimitLoose ----- Symbol.iterator、Iterator

decorator 使用（未知）
* toPrimitive ----- Symbol.toPrimitive
* toPropertyKey ----- 参见 toPrimitive