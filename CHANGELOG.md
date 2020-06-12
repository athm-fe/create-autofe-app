## autofe-scripts@1.3.8

该版本功能主要改动：
1. 使用 webpack-dev-server 取代 browsersync
2. 优化内部 watch 实现，并实现监听 public 目录
3. 支持在 creator.config.js 中配置 devServer

## autofe-scripts@1.3.5

该版本功能主要改动：
* 基于 VuePress 搭建文档站点，并完善文档
* 增加 Webpack 配置功能，两种方式 configureWebpack 和 chainWebpack
* 增加环境变量配置功能，使用 dotenv 加载 .env 文件
* 修复 Window 下打包目录问题，由于 gulp glob 不支持 windows 风格路径导致
* 去掉由于 src 目录没有 ts 文件导致的错误日志
* autofe-webpack 替换成 autofe-shared-utils
* 增加 css.loaderOptions 配置能力

## autofe-scripts@1.3.4

该版本增加了 TypeScript 支持，升级请参考 [如果手动支持 TypeScript](./doc/how-to-ts.md)

## autofe-scripts@1.2.3

该版本把 gulp 从 v3 升级到 v4，因为 gulp v3 在 node 12 下不被支持。

## autofe-scripts@1.2.1

减少命令运行时，webpack 部分输出到控制台的日志，方便查找关键日志信息。

## 1.2.0

该版本功能主要改动：
* 增强了 CSS 能力
* PostCSS 可通过 `postcss.config.js` 自定义配置，比如 Autoprefixer
* 自动打开浏览器时，使用 `external ip` 地址，替代原来的 `localhost` 地址
* Babel 可通过 `babel.config.js` 自定义配置，增加了 polyfill 能力
* 增加 `transpileDependencies` 选项来支持通过 Babel 处理 `node_modules` 里的特定包
* ESLint 可通过 `.eslintrc.js` 和 `.eslintignore` 自定义配置
* 目标浏览器可通过 `.browserslistrc` 自定义配置
* 去掉了图片压缩功能，收益太小（SVG的压缩还保留着）

升级请参考 [如何迁移到 autofe-scripts v1 版本](./doc/how-to-migrate-to-v1.md)

## 0.6.2

1. 修复新增文件时，无法自动刷新浏览器的问题
2. 新增将特殊类型文件复制到 build 目录的功能，目前有 mp3,mp4,ogg,flv,swf,ico,cur,json,txt 。

## 0.6.1

1. 修复 windows 平台下无法自动打开 Chrome 浏览器的问题