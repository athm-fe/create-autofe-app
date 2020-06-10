---
sidebar: auto
---

# 配置参考

## 目标浏览器

请查阅指南中的[浏览器兼容性](../guide/browser-compatibility.md#browserslist)章节。

## creator.config.js

`creator.config.js` 是一个可选的配置文件，如果项目的 (和 `package.json` 同级的) 根目录中存在这个文件，那么它会被 `autofe-script` 自动加载。

这个文件应该导出一个包含了选项的对象：

``` js
// creator.config.js
module.exports = {
  // 选项...
}
```

### publicPath

- Type: `string`
- Default: `'/'`

  **这个参数目前不要动，针对多页应用怎么使用，还没想好。**

### transpileDependencies

- Type: `Array<string | RegExp>`
- Default: `[]`

  默认情况下 `babel-loader` 会忽略所有 `node_modules` 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。

### configureWebpack

- Type: `Object | Function`

  如果这个值是一个对象，则会通过 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并到最终的配置中。

  如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。

  更多细节可查阅：[配合 webpack > 简单的配置方式](../guide/webpack.md#简单的配置方式)

### chainWebpack

- Type: `Function`

  是一个函数，会接收一个基于 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 `ChainableConfig` 实例。允许对内部的 webpack 配置进行更细粒度的修改。

  更多细节可查阅：[配合 webpack > 链式操作](../guide/webpack.md#链式操作-高级)

### css.loaderOptions

- Type: `Object`
- Default: `{}`

  向 CSS 相关的 loader 传递选项。例如：

  ``` js
  module.exports = {
    css: {
      loaderOptions: {
        css: {
          // 这里的选项会传递给 css-loader
        },
        postcss: {
          // 这里的选项会传递给 postcss-loader
        }
        scss: {
          // 这里的选项会传递给 postcss-loader
        }
      }
    }
  }
  ```

  支持的 loader 有：

  - [css-loader](https://github.com/webpack-contrib/css-loader)
  - [postcss-loader](https://github.com/postcss/postcss-loader)
  - [sass-loader](https://github.com/webpack-contrib/sass-loader)

  更多细节可查阅：[向预处理器 Loader 传递选项](../guide/css.html#向预处理器-loader-传递选项)

  ::: tip 提示
  相比于使用 `chainWebpack` 手动指定 loader 更推荐上面这样做，因为这些选项需要应用在使用了相应 loader 的多个地方。
  :::

### devServer

- Type: `Object`

  [所有 `webpack-dev-server` 的选项](https://webpack.js.org/configuration/dev-server/)都支持。注意：

  - `serveIndex` 为 `true`，且不能修改

  - `contentBase`，`contentBasePublicPath` 和 `watchContentBase` 目前也不支持修改

  - 有些值像 `publicPath` 和 `historyApiFallback` 不应该被修改，因为它们需要和开发服务器的 [publicPath](#publicpath) 同步以保障正常的工作。

### devServer.proxy

- Type: `string | Object`

  如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 `creator.config.js` 中的 `devServer.proxy` 选项来配置。

  `devServer.proxy` 可以是一个指向开发环境 API 服务器的字符串：

  ``` js
  module.exports = {
    devServer: {
      proxy: 'http://localhost:4000'
    }
  }
  ```

  这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到`http://localhost:4000`。

  如果你想要更多的代理控制行为，也可以使用一个 `path: options` 成对的对象。完整的选项可以查阅 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#proxycontext-config) 。

  ``` js
  module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: '<url>',
          ws: true,
          changeOrigin: true
        },
        '/foo': {
          target: '<other_url>'
        }
      }
    }
  }
  ```


## Babel

Babel 可以通过 `babel.config.js` 进行配置。

```javascript
module.exports = {
  presets: [
    ['autofe-app', {
      // debug: true,
      // useBuiltIns: 'usage',
      // helpers: false,
    }],
  ],
};
```

::: tip
Creator 使用了 Babel 7 中的新配置格式 `babel.config.js`。和 `.babelrc` 或 `package.json` 中的 `babel` 字段不同，这个配置文件不会使用基于文件位置的方案，而是会一致地运用到项目根目录以下的所有文件，包括 `node_modules` 内部的依赖。
:::

所有的 Creator 应用都使用 `babel-preset-autofe-app`，它包含了 `@babel/preset-env` 以及为最小化包体积优化过的配置。通过[它的文档](https://github.com/athm-fe/create-autofe-app/tree/master/packages/babel-preset-autofe-app)可以查阅到更多细节和 preset 选项。

同时查阅指南中的 [Polyfill](../guide/browser-compatibility.md#polyfill) 章节。

## ESLint

查阅指南中的 [ESLint](../guide/eslint.html) 章节。

## TypeScript

使用 TypeScript + `babel-loader` 来支持 TypeScript 编译。

使用 ESLint + `fork-ts-checker-webpack-plugin` 来检查 TypeScript 代码。

TypeScript 可以通过 `tsconfig.json` 来配置。

查阅指南中的 [TypeScript](../guide/typescript.html) 章节。
