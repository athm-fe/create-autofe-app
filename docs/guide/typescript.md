# TypeScript

假设你已经有 TypeScript 的基础，创建 `xxx.entry.ts` 即可作为入口文件，`yyy.ts` 作为模块文件，被入口文件使用。

## TS 使用 jQuery

TypeScript 使用的是自己的模块系统，没有使用 Webpack 的，所以你之前配置的 `externals` 并不会起作用。

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

如果你已经了解 TypeScript 的话，你就会知道，只要安装如下包，就可以达到类似 Webpack 的 `externals` 的效果：

```sh
npm i --save-dev @types/jquery
```