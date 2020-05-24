# 静态资源

静态资源可以通过如下方式进行处理：

* 在 JavaScript 被导入或 CSS 中通过相对路径被引用。这类引用会被 webpack 处理；
* 其余资源将会直接被拷贝，而不会经过 webpack 的处理。包括：
  * 放置在 `public` 目录；
  * 通过绝对路径被引用；
  * 由于历史原因，没有被 JavaScript 和 CSS 引用的图片、字体、视频等文件也会被直接拷贝。

另外，需要注意：
* HTML 中的资源路径也不会被解析，你写的是什么，它就是什么；
* `xxx.old.js` 规则的 JavaScript 文件中的资源路径也不会被解析。

## 从相对路径导入

当你在 JavaScript、CSS 中使用非绝对路径引用一个静态资源时，该资源将会被包含进入 webpack 的依赖图中。在其编译过程中，所有诸如 `background: url(...)` 和 CSS `@import` 的资源 URL **都会被解析为一个模块依赖**。

例如，`url(./image.png)` 会被翻译为 `require('./image.png')`。

在其内部，我们通过 `file-loader` 用版本哈希值和正确的公共基础路径来决定最终的文件路径，再用 `url-loader` 将小于 1kb 的资源内联，以减少 HTTP 请求的数量。

## datauri

除了 `url-loader` 会自动将小于 1kb 的资源内联外，我们还开发了明确的指令 `?datauri`，通过该方式可以不考虑文件大小，直接实现资源内联：

```scss
.datauri-example {
  background: url("./car.jpg?datauri") no-repeat;
}
```

## svg inline

对于 SVG 文件，我们有时候也需要获取其内容，可以通过指令 `?inline` 做到：

```javascript
import svgContent from '../img/postcss-assets.svg?inline';
```

::: tip 提示
请思考 `one.svg?inline` 和 `one.svg?datauri` 的区别。
:::

## 路径规则

JavaScript 和 CSS 在路径上略有不同，详情请参考：

* [JavaScript 路径能力](./javascript.html#路径能力)
* [CSS 路径能力](./css.html#路径能力)

简单罗列如下：

`index.entry.js`
```javascript
// 相对路径
import bg1 from './bg.png';
import bg2 from '../img/bg.png';

// 内嵌 Datauri
import bg3 from '../img/bg.png?datauri';
import svgDatauri from '../img/postcss-assets.svg?datauri';

// 获取 SVG 内容
import svgContent from '../img/postcss-assets.svg?inline';

// npm 依赖
import sharePic from 'a-pkg-from-npm/share.png';

// @ 别名
import logo from '@/assets/logo.png';
```

`index.scss`
```scss
// 相对路径
@import "./base.css";
@import "base.css";

// npm 依赖
@import "~normalize.css";

// @ 别名
@import "@/common/reset.css";
@import "~@/common/reset.css";

.path-example {
  // 相对路径
  background: url("./car.jpg") no-repeat;
  background: url("car.jpg") no-repeat;

  // npm 依赖
  background: url("~a-pkg-from-npm/share.png") no-repeat;

  // @ 别名
  background: url("~@/index/img/car.jpg") no-repeat;
  // not working
  // background: url("@/index/img/car.jpg") no-repeat;
}
```

## `public` 文件夹

任何放置在 `public` 文件夹的静态资源都会被简单的复制，而不经过 webpack。你需要通过绝对路径来引用它们。
