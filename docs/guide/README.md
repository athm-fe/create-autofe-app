---
sidebarDepth: 0
---

# 介绍

> Thanks to [Create React App](https://create-react-app.dev/) and [Vue CLI](https://cli.vuejs.org/)

Create AutoFE App 简称为 Creator，是一套基于 Webpack 搭建的前端静态页面开发工具，提供：

* 通过 `create-autofe-app` 实现的~~交互式的~~项目脚手架。
* ~~通过 `autofe-scripts-global` 实现的零配置原型开发。~~
* 一个运行时依赖 (`autofe-scripts`)，该依赖：
  * 可升级；
  * 基于 Webpack 构建，并带有合理的默认配置；
  * 可以通过项目内的配置文件进行配置；
  * ~~可以通过插件进行扩展。~~
* ~~一个丰富的官方插件集合，~~ 集成了前端生态中最好的工具。
* ~~一套完全图形化的创建和管理项目的用户界面。~~

Creator 支持 macOS、Windows 以及 Linux。<br>
如果发现什么问题，请[反馈](https://github.com/athm-fe/create-autofe-app/issues/new)给我们。

## 功能支持

* 使用 ~~[Browsersync](http://browsersync.io/)~~ WebpackDevServer 开启本地服务器
  * 支持文件修改时自动刷新浏览器
  * 支持目录浏览
  * 自动打开浏览器 Chrome
* 使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 模版引擎来写 HTML
* 使用 Sass 写 CSS
* 使用 PostCSS 支持 Autoprefixer，不再需要自己处理 `-webkit-` 等浏览器前缀。
* 使用 Babel 处理 ES6+
* 使用 ESLint 检查 ES6+
* 支持 TypeScript
* 使用 Markdown 写文档，并生成 HTML 方便查看
* 开发环境支持 SourceMap
* 压缩前端资源，包括 CSS、JS 以及 SVG（由于压缩图片影响构建速度，暂不支持）。

所有这些功能不需要你耗费精力自行配置，Creator 帮你搞定一切。

## 该系统的组件

Creator 有几个独立的部分——如果你看到了我们的[源代码](https://github.com/athm-fe/create-autofe-app/tree/master/packages)，你会发现这个仓库里同时管理了多个单独发布的包。

### create-autofe-app

`create-autofe-app` 是一个全局安装的 npm 包，提供了终端里的 `create-autofe-app` 命令。它可以通过 `create-autofe-app my-app` 快速搭建一个新项目。

### autofe-scripts

`autofe-scripts` 是一个开发环境依赖。它是一个 npm 包，局部安装在每个 `create-autofe-app` 创建的项目中。

它是构建于 [webpack](http://webpack.js.org/) 之上的。它包含了：

* 一个针对绝大部分应用优化过的内部的 webpack 配置；
* 项目内部的 `autofe-scripts` 命令，提供 `start` 和 `build` 命令。

## 贡献代码

We'd love to have your helping hand on `create-autofe-app`! See [CONTRIBUTING.md](https://github.com/athm-fe/create-autofe-app/blob/master/CONTRIBUTING.md) for more information on what we're looking for and how to get started.
