# 浏览器兼容性

## browserslist

你会发现有一个单独的 `.browserslistrc` 文件，指定了项目的目标浏览器的范围。这个值会被 [@babel/preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html) 和 [Autoprefixer](https://github.com/postcss/autoprefixer) 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

[查阅](https://github.com/ai/browserslist)这里了解如何指定浏览器范围。

## Babel 编译兼容性报告

Babel 原意是把 ES6+ 代码编译为 ES5 代码，因此肯定用到了很多的 ES5 的 API，从 `@babel/helpers` 就可以看到。

**所以，我们的最低兼容是 IE9。**

但是，即使 Babel 编译后，有一些特性仍然不被 IE9 兼容，比如：
1. `for...of` 依赖 `Symbol`
2. Iterable Spread 依赖 `Array.from`，例如 String Spread 和 String destructuring
4. 动态 `import()` 依赖 `Promise`
5. Generator 和 Async/Await 依赖 regenerator runtime，而 regenerator runtime 还依赖 `Promise。`
6. `Class` 继承父类的静态属性以及继承原生类不被 IE10 支持

详细信息请参考 [Babel 转换后代码依赖的 API](https://github.com/athm-fe/create-autofe-app/blob/master/doc/how-to-babel7.md#babel-%E8%BD%AC%E6%8D%A2%E5%90%8E%E4%BB%A3%E7%A0%81%E4%BE%9D%E8%B5%96%E7%9A%84-api) 以及 [Babel Caveats](https://babeljs.io/docs/en/caveats)。

## Polyfill

::: tip 提示
Babel 编译 ES6+ 代码主要包括两个方面：转换语法和提供 polyfill。
:::

Creator 创建的项目默认会使用 `babel-preset-autofe-app`，它通过 `@babel/preset-env` 和 `browserslist` 配置来决定项目需要的语法转换和 polyfill。

语法转换其实就是转换为 ES5 语法以及一些 ES5 API。理想情况下，如果你只需要 ES6+ 语法，但不使用其新增的 API，就完全不用考虑 Polyfill 的问题。但是从上面的兼容性报告，我们知道有一些语法不可避免的需要一些 ES6+ 的 API，因此，就需要我们好好地研究下如何处理 polyfill 了。

关于 polyfill 的处理方式，涉及到一个参数：`useBuiltIns`。

### useBuiltIns: false

默认情况下，Creator 会把 `useBuiltIns: false` 传递给 `@babel/preset-env`，这意味着关闭 polyfill 功能，你需要在自己的源码中手用引入自己需要的 polyfill。

`babel.config.js`
```javascript
module.exports = {
  presets: [
    ['autofe-app', {
      useBuiltIns: false,
    }],
  ],
};
```

如果需要的时候，自己手动引入 polyfill。

`index.entry.js`
```javascript
import 'core-js/features/promise';

Promise.resolve(32).then(x => console.log(x)); // => 32
```

关闭 polyfill 的好处是打包文件最小化，坏处是需要手动处理 polyfill 问题，既耗费精力又容易出错。

为了使用方便，我们为你准备了一个精简版的 polyfill 库 [autofe-polyfill](https://www.npmjs.com/package/autofe-polyfill)，提供了你可能会经常使用的 polyfill。

`index.entry.js`
```javascript
import 'autofe-polyfill';

Promise.resolve(32).then(x => console.log(x)); // => 32

Object.assign({}, { foo: true });
```

如果你不想那么麻烦，可以直接引用一个更全面的库。

`index.entry.js`
```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```

::: warning
`@babel/polyfill` 官方已经不推荐使用了，建议直接使用 `core-js` 和 `regenerator-runtime`。
```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```
:::

### useBuiltIns: 'usage'

如果想要开启自动 polyfill，你可以通过 `babel.config.js`，设置 `useBuiltIns: 'usage'`。

`babel.config.js`
```javascript
module.exports = {
  presets: [
    ['autofe-app', {
      useBuiltIns: 'usage',
    }],
  ],
};
```

这样它会根据源代码中出现的语言特性自动检测需要的 polyfill。这确保了最终包里 polyfill 数量的最小化。

### useBuiltIns: 'entry'

另外，你还可以配置 `useBuiltIns: 'entry'`，然后手动在入口文件头部添加 `import "core-js/stable";`。
这会根据 `browserslist` 目标导入所有需要的 polyfill，这样你就不用再担心 polyfill 问题了。
但是因为是根据 `browserslist` 而不是实际代码进行解析，所以可能包含了一些没有用到的 polyfill，从而导致最终的包大小增加。

更多细节可查阅 [@babel-preset/env 文档](https://new.babeljs.io/docs/en/next/babel-preset-env.html#usebuiltins-usage)。

## 依赖包 ES6+ 处理

为了提升打包速度，默认情况下 `babel-loader` 会忽略所有 `node_modules` 中的文件。如果想要通过 Babel 显式转译一个依赖包，可以将其添加到 `creator.config.js` 中的 [`transpileDependencies`](../config/#transpiledependencies) 选项。这会为该依赖开启语法转换。如果你配置了 `useBuiltIns: 'usage'` 的话，`@babel/preset-env` 还会分析该依赖的代码，并自动检测出需要的 polyfills。更多用法请参考 [polyfill](#polyfill) 部分。

```javascript
// creator.config.js
module.exports = {
  // ...
  transpileDependencies: [
    '@auto/img-crop',
  ],
  // ...
};
```

然而，大多数情况下，依赖包都提供了 ES5 代码，而且会声明需要的 polyfill。你可以在你的入口文件中直接引用对应的 polyfill。

`index.entry.js`
```javascript
import 'core-js/features/promise';

Promise.resolve(32).then(x => console.log(x)); // => 32
```

特殊情况下，某个依赖提供了 ES5 代码，但使用了 ES6+ 特性且没有明确列出需要的 polyfill，可以直接引用一个完备的 polyfill 库，简单粗暴。（如果配合 `useBuiltIns: 'entry'` 使用的话，）

```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```

::: tip 提示
当使用 `core-js/stable` 和 `regenerator-runtime/runtime` 的时候，最好配合 `useBuiltIns: 'entry'` 使用，这样会根据 `browserslist` 目标导入所有需要的 polyfill，也许可以减少一点打包体积。
:::
