# 开发约定

约定优于配置。

## 基本规则

* 主要面向多页开发
* `src` 为源代码目录
* `build` 为打包输出目录，**且不提交到 Git 仓库**
* 代码模块化、文件碎片化
* 自动寻找符合规则的入口文件打包
* 图片拆分 `img` 和 `pic` 目录，区别是 `pic` 仅做 demo 展示用，上线完全不需要
* 勤写文档，可以使用 Markdown 做好记录

## 打包策略

关于单页开发，Webpack 有一套非常成熟的打包策略，然而对于多页开发，就不是那么美好了，经过深思熟虑，Creator 提供了一套打包机制。

### JavaScript

有以下三种类型入口文件

1. ES5 `xxx.old.js` ---> UglifyJS ---> `xxx.js`
2. ES6+ `yyy.entry.js` ---> Webpack + Babel ---> `yyy.js`
3. TypeScript `zzz.entry.ts` ---> Webpack + Babel ---> `zzz.js`

### CSS

有以下两种类型入口文件

* `xxx.css` ---> Webpack ---> `xxx.css`
* `xxx.scss` ---> Webpack + Sass ---> `xxx.css`

**以下划线开头命名的文件只能当作模块文件，不会被打包输出。**

### HTML

由于历史原因，HTML 并没有使用 Webpack 处理，仍然使用的是 Gulp，因此功能可能不是那么强大，后续再想怎么实现吧。

* `xxx.html` ---> Gulp + Nunjucks ---> `xxx.html`

**以下划线开头命名的文件只能当作模块文件，不会被打包输出。**

### Markdown

勤写文档，做好记录

* `xxx.md` ---> Gulp + [markedjs/marked](https://marked.js.org/) ---> `xxx.html`