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