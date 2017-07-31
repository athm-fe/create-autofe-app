# babel-preset-autofe-app

## TODO

* 如果使用 `import()` 或 `require.ensure` 加载 chunk 的话，webpack `publicPath` 需要配置正确
* `env` preset 的 `useBuiltIns` 选项
* `babel-polyfill` 太大，抢先执行，而且我们不需要那么多 API，故不考虑
* `babel-runtime` 是为了减少重复代码而生的。Babel编译生成的代码，可能会用到一些_extend()，classCallCheck()之类的工具函数。默认情况下，这些工具函数的代码会被引入在编译后的文件中。如果存在多个文件，那每个文件都有可能含有一份重复工具函数的代码。


## ie678

* JSON 原则上不需要引用，如需要，自己解决，`JSON2` 或 `JSON3`
* Promise 建议使用 `es6-promise`, 不用 `babel-polyfill` 里的
* `Object.defineProperty` ES6 modules 依赖
* `import()`, `require.ensure()` 依赖 Promise
* 关键字做为属性名
  `transform-es3-property-literals`
  `transform-es3-member-expression-literals`
* 用 CommonJS Modules，不用 ES6 Modules
* 需默认提供 ES5 常用 API 的 Polyfill
* `class` 不建议使用

## ie9

* ES5 API 可以完美支持
* 但是 babel 转换一些新特性时，还会用到一些 ES6 的新 API，比如 `Array.from`, `Object.assign`, `Promise`.

## 其它

* 建议不用 Generator、async 等，老老实实用 Promise
  `transform-regenerator`, `transform-runtime`
  peerDependencies: `babel-runtime`
* `class` 的 `extends` 支持的很不好

## 关于异步编程

* callback
* event
* pub/sub
* Promise

借助 Generator 手动执行实现异步。需要自动执行的机制：
* Thunk 函数，自动执行 Generator，参考 Thunkify 模块
* co 模块， 自动执行 Generator，TJ 大神作品

```javascript
co(function* gen() {
  yield Thunk 函数 // 回调中交回执行权
  yield Promise 函数 // then 中交回执行权
}).then(...)
```

async/await 实现异步编程
* Generator 函数的语法糖
* 自带执行器
* 更好的语义
* `await` 后面可以是 Promise 对象和原始类型的值
* `async` 函数返回的是 Promise 对象

## 关于 Iterator

```typescript
// 当次迭代结果
interface IteratorResult {
  done: boolean;
  value: any;
}
// 迭代器
interface Iterator {
  next(): IteratorResult;
}
// 可迭代对象，比如
// Array、Map、Set等；
// Generator(生成器) 函数；
// 自定义可迭代对象
interface Iterable {
  [Symbol.iterator](): Iterator
}

interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}
```

自定义可迭代对象
```javascript
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
```

借助 `for..of` 可以方便地遍历迭代器，否则就要自己创建迭代器，并且依次调用 `next()` 来完成遍历。

数组的例子
```javascript
// 数组，可迭代对象
let arr = ['a', 'b', 'c'];
// 迭代器，通过 [Symbol.iterator]() 创建
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

Generator 函数的例子
```javascript
// Generator 函数，可迭代对象
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
// Generator 迭代器，创建方式类似普通函数调用
var hw = helloWorldGenerator();

hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }
```