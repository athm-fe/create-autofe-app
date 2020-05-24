# JavaScript

## 路径能力

* 相对路径
* npm 依赖
* @ 别名

## externals 配置

有时候，我们不想将某些 `import` 的依赖打包到 bundle 中，而是在运行时再去从外部获取这些扩展依赖。

例如，从 CDN 引入 jQuery，而不是把它打包：

`index.html`
```html
<script src="https://s.autoimg.cn/as/jquery/1.12.4/jquery.js"></script>
<script src="index.js"></script>
```

`index.entry.js`
```javascript
const $ = import('jquery');

$(function() {
  // do something...
})
```

可以通过如下方式配置：

`creator.config.js`
```javascript
module.exports = {
  // ...
  externals: {
    jquery: 'jQuery',
  },
  // ...
};
```

详细用法可以参考 [Webpack externals](https://webpack.js.org/configuration/externals/)。

## 全局变量

当使用一些全局变量的时候，ESLint 会报错，可以通过如下方式配置：

`.eslintrc.js`
```javascript
module.exports = {
  globals: {
    AHAPP: 'readonly',
    $: 'readonly',
    trackCustomEvent: 'readonly',
  },
}
```

::: tip 提示
这个和 `externals` 配置不是一个概念，这个是直接使用 ES6 文件中不存在的全局变量。
:::