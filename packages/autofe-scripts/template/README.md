This project was bootstrapped with [Create AutoFE App](https://github.com/athm-fe/create-autofe-app).

## Table of Contents

- [更新到新版本](#更新到新版本)
- [目录结构](#目录结构)
- [可用的命令](#可用的命令)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
- [功能支持](#功能支持)
- [开发约定](#开发约定)
- [编写样式](#编写样式)
  - [路径能力](#路径能力)
  - [autoprefixer](#autoprefixer)
  - [图片内嵌](#图片内嵌)
  - [自动添加版本号](#自动添加版本号)
- [编写 HTML](#编写-html)
  - [includePretty](#includepretty)
  - [assets](#assets)
  - [html-bundle](#html-bundle)
- [编写 JavaScript](#编写-javascript)
  - [externals 配置](#externals-配置)
  - [浏览器兼容性](#浏览器兼容性)
- [ESLint](#eslint)
- [sourcemaps](#sourcemaps)
- [还缺啥?](#还缺啥)

## 更新到新版本

Create AutoFE App 分成两个包：
* `create-autofe-app` 是一个全局命令行工具，可以用来创建项目，之后就基本用不到。
* `autofe-scripts` 是上面创建的项目在开发过程中所需要的一个依赖包，一般情况下，也只需要这个包就够了。

你基本上用不着更新 `create-autofe-app`，因为大多数的逻辑都在 `autofe-scripts`。如果实在是需要更新，运行 `npm install -g create-autofe-app` 即可。

当运行 `create-autofe-app` 来创建新项目的时候，它总是会去 npm 下载最新发布的 `autofe-scripts`，所以你能够自动获得所有的新的功能或者优化。

如果你已经有了一个项目，并且想把该项目的 `autofe-scripts` 升级到新版本。请先[打开版本修改日志](https://github.com/athm-fe/create-autofe-app/blob/master/CHANGELOG.md)，找到你的当前版本（在 `package.json` 可以找到）和新版本之间的差异。有可能新版本和老版本不兼容，需要你按照 `CHANGELOG.md` 的说明来修改你的代码。

但是我们会尽量保证 `autofe-scripts` 新老版本之间的兼容，做的不需要你修改代码，或者仅仅是修改少量的代码，即可迁移成功。

所以，大多数情况下，只要手动修改 `package.json` 文件里的 `autofe-scripts` 的版本号，然后重新 `npm install` 即可更新到最新版本。

## 目录结构

创建项目后，目录结构大体是这样的：

```
my-app/
  node_modules/
  README.md
  package.json
  .browserslistrc
  .eslintignore
  .eslintrc.js
  .gitignore
  babel.config.js
  postcss.config.js
  creator.config.js
  src/
    index/
      css/
        _base.scss
        _part1.scss
        _part2.scss
        _reset.scss
        main.scss
      img/
        bg.png
      js/
        vendor/
          es6-promise.auto.min.old.js
        index.entry.js
        main.old.js
      pic/
        01.jpg
      _part1.html
      _part2.html
      index.html
    demo/
      index.html
```

你编写的所有代码都需要放在 `src` 目录里，因为只有 `src` 目录下的代码才会被 `autofe-scripts` 打包构建。

打包会输出到 `build` 目录下。

## 可用的命令

在项目目录下，你可以运行如下命令：

### `npm start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles assets in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

默认打包后的样式和脚本是被压缩后的，如果想得到不压缩的样式和脚本，可以执行下面的命令：
```sh
NODE_ENV=development npm run build
```

## 功能支持

* 使用 [Browsersync](http://browsersync.io/) 开启本地服务器
  * 支持文件修改时自动刷新浏览器
  * 支持目录浏览
  * 自动打开浏览器
* 使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 模版引擎来写 HTML
* 使用 Sass 写 CSS
* 使用 PostCSS 支持 Autoprefixer
* 使用 Babel 处理 ES6+
* 使用 ESLint 检查 ES6+ 代码
* 使用 Markdown 写文档，并生成 HTML 方便查看
* 开发环境支持 SourceMap
* 压缩 CSS 和 JS
* 压缩 SVG

## 开发约定

1. 文件碎片化、代码模块化
2. 使用前缀下划线命名模块文件，打包时不输出
3. 打包输出文件（即 `build` 文件夹）不提交到 git 仓库
4. 图片放到 `img` 和 `pic` 目录下，区别是 `pic` 仅做 demo 展示用，上线完全不需要

## 编写样式

先来一个最简单的：

`_btn.scss`
```scss
.btn {
  display: inline-block;
}
```

`main.scss`
```scss
@import "btn";

.some {
  color: red;
}
```

编译后，只会产生 `main.css` 。

`main.css`
```css
.btn {
  display: inline-block;
}
.some {
  color: red;
}
```

### 路径能力

Creator 可以给大家带来更加强大、灵活的路径能力。

#### 使用来自 npm 的包

我们可以使用开源的 [Normalize.css](https://necolas.github.io/normalize.css/)，还可以开发自己的 CSS 包，发布到官方 NPM 或者公司的私有 NPM。

以 `normalize.css` 为例，在你的项目中安装你想要的包：

```
npm install normalize.css
```

然后，在你的样式文件中引用该样式

```css
@import "~normalize.css";

body {
  color: #333;
}
```

#### Sass 图片相对路径问题

假设你的目录结构是这样的：

```
+ main.scss
+ sub/
  + _sub.scss
  + sub.png
```

代码内容是这样的：

`main.scss`
```scss
@import "sub/sub";
```

`sub/_sub.scss`
```scss
.sub {
  background: url("./sub.png") no-repeat;
}
```

输出结果是：

```css
.sub {
  background: url("./sub/sub.png") no-repeat;
}
```

#### 别名 @

你可能遇到过如下的代码，眼睛累，脑壳还疼。

```scss
@import "../../../../../common/reset.css";
```

而我们支持如下方式：

```scss
@import "@/common/reset.css";
// or
@import "~@/common/reset.css";

.test-root-alias {
  width: 320px;
  height: 240px;
  // working
  background: url("~@/index/img/car.jpg") no-repeat;
  // not working
  // background: url("@/index/img/car.jpg") no-repeat;
}
```

**⚠️ 注意：CSS 中图片路径使用 `@` 别名时，要添加 `~` 前缀。**

### Autoprefixer

有了 Autoprefixer，你不再需要手动写 `-webkit-` ，`-ms-` ，`-moz-` 等浏览器厂商前缀，也就不再需要使用 Sass 之类的语言来编写一堆 mixins。

加浏览器前缀时，我们只考虑下面所列的浏览器：
```
browsers: [
  '> 0.2%', 'last 2 versions', 'Firefox ESR', 'not dead',
  'iOS >= 9',
  'Android >= 4.4',
  'Explorer >= 9'
]
```

解释一下，`> 0.2%` 表示流行使用的浏览器版本，但是由于新发布的版本可能暂时未达到使用率，所以加上 `last 2 versions` 以及 `Firefox ESR`，另外前面的条件可能包含已经 `dead` 的浏览器版本，我们不打算考虑这些浏览器，所以使用 `not dead` 去掉这些浏览器版本。最后明确指定我们会进行测试的浏览器最低要求，即 `iOS >= 9, Android >= 4.4, Explorer >= 9` 。

你可以使用 [browser.list](https://browserl.ist/?q=%3E+0.2%25%2C+last+2+versions%2C+Firefox+ESR%2C+not+dead%2C+iOS+%3E%3D+9%2C+Android+%3E%3D+4.4%2C+Explorer+%3E%3D+9) 来查看我们的规则包含了哪些浏览器版本。

#### 简单的例子

原来你可能这么写：
```css
.btn .icon {
  -webkit-transform: scale(0.5);
      -ms-transform: scale(0.5);
       -o-transform: scale(0.5);
          transform: scale(0.5);
}
```

现在这么写就成：
```css
.btn .icon {
  transform: scale(0.5);
}
```

#### 去掉老旧的前缀

Autoprefixer 还会去掉老旧的前缀，比如 `border-radius` ：
```css
.btn {
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
```

根据我们的浏览器支持配置，我们不再需要 `border-radius` 的 `-webkit-`，`-moz-` 等前缀。经过 Autoprefixer 处理后会变成这样：
```css
.btn {
  border-radius: 10px;
}
```

#### 之前已经手动写了前缀也没关系

```css
.btn .icon {
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}
```

会被处理成：

```css
.btn .icon {
  -webkit-transform: scale(0.5);
      -ms-transform: scale(0.5);
       -o-transform: scale(0.5);
          transform: scale(0.5);
}
```

#### 怎么用 `-webkit-min-device-pixel-ratio`

```css
@media (min-resolution: 2dppx) {
  .image {
    background-image: url(image@2x.png);
  }
}
```

会被处理成

```css
@media (-webkit-min-device-pixel-ratio: 2),
       (-o-min-device-pixel-ratio: 2/1),
       (min-resolution: 2dppx) {
  .image {
    background-image: url(image@2x.png);
  }
}
```

#### 特定浏览器 hack

```css
.btn .icon {
  transform: scale(0.5);
  -webkit-transform: scale(0.6);
}
```

会被处理成：

```css
.btn .icon4 {
  -ms-transform: scale(0.5);
   -o-transform: scale(0.5);
      transform: scale(0.5);
  -webkit-transform: scale(0.6);
}
```

上面我们介绍了几种 Autoprefixer 的处理规则，更多的用法请参见[官网](https://github.com/postcss/autoprefixer)。

**⚠️ 注意：你可以配置 `.browserslistrc` 来自定义你需要支持的浏览器。**

**⚠️ 注意：Autoprefixer 是通过 PostCSS 来实现的，如果需要，你可以自定义 `postcss.config.js` 来添加更多的功能。**

### 图片内嵌

有时候希望将样式里引用的背景图内嵌到样式里，支持如下两种方式：
* 小于 1kb 自动内嵌
* 通过自定义参数 `datauri` 直接表示内嵌

```scss
.test-inline {
  background: url("../img/car.jpg?datauri") no-repeat;
  background: url("../img/car.svg?datauri") no-repeat;
}
```

### 自动添加版本号

为了解决 CDN 缓存的问题，当执行生产环境构建的时候，会自动给 CSS 中的图片路径添加版本号：

```css
.test-md5 {
  background: url(../img/bg.png?6350fa96) no-repeat;
}
```

该版本号是根据图片文件生成的 MD5，当文件变化时，该版本号才会发生变化。

## 编写 HTML

本工具使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 模版引擎来编写 HTML ，建议先去官网了解下该模版引擎的用法。

即使不想看，你也可以像往常那样写 HTML，只要你会 `includePretty` 就够用了。

### `includePretty`

Nunjucks 自带的 `include` 无法保证输出 HTML 的对齐问题，所以自己开发了这个。

`_part1.html`
```html
<div>
  <span>anything...</span>
</div>
```

`index.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Index</title>
  </head>
  <body>
    {% includePretty "_part1.html" %}
  </body>
</html>
```

output:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Index</title>
  </head>
  <body>
    <div>
      <span>anything...</span>
    </div>
  </body>
</html>
```

### `assets`

假设目录结构和是这样的：
```
src/
  index.html
  component/
    btn/
      btn.png
      index.css
      index.html
```

我们来看下代码：

`index.html`
```html
<div>
  {% includePretty "component/btn/index.html" %}
</div>
```

`component/btn/index.html`
```html
<link rel="stylesheet" href="index.css">
<img src="btn.png">
```

这样的话，输出的代码是这样的：
```html
<div>
  <link rel="stylesheet" href="index.css">
  <img src="btn.png">
</div>
```

这样一来，就加载不到 `btn` 组件的样式文件和图片了。为了解决这个问题，引入了 `assets`。<br>
代码如下：
`component/btn/index.html`
```html
<link rel="stylesheet" href="{{ 'component/btn/index.css' | assets }}">
<img src="{{ 'component/btn/btn.png' | assets }}">
```

**注意：使用`assets`时需要从`src`之下开始写路径，不能直接写 `index.css` ，目前还没想到其它的办法。**

### html-bundle

在做导航条开发的时候，开发提出了一个要求，就是代码完全我来维护，他们不做改动，我需要提供给他们一个 HTML 文件，这个文件里包含 html + inline css + inline js。

所以每次开发完成给开发的时候，我会提供两个 HTML 文件给他们，一个用来演示，一个用来直接给开发使用：

`mini.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>全站导航条</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <!-- 这个不用，每个页面已经有了 -->
    <link rel="stylesheet" href="//s.autoimg.cn/com/co.ashx?path=|as|css-3.0.0|global|autoshow.css">
    <!-- 唯一样式，直接用 -->
    <link rel="stylesheet" href="css/mini.css">
  </head>
  <body>
    <div id="auto-header" class="topbar">
      {% includePretty "widget/topbar/_minitop_mini.html" %}
      {% includePretty "widget/topbar/_club.html" %}
    </div>
    <!-- 三个脚本 -->
    <script src="js/sync-login.js"></script>
    <script src="js/auto-header.js"></script>
    <script src="js/auto-header-club.js"></script>
    <script>
      var autoHeaderObj = new AutoHeader();
    </script>
  </body>
</html>
```

`mini.bundle.html`
```html
<!-- topbar begin -->
<style type="text/css">
  /*=include css/mini.css */
</style>
<div id="auto-header" class="topbar">
  {% includePretty "widget/topbar/_minitop_mini.html" %}
  {% includePretty "widget/topbar/_club.html" %}
</div>
<script type="text/javascript">
  // sync-login.js
  //=include js/sync-login.js
  // auto-header.js
  //=include js/auto-header.js
  // auto-header-club.js
  //=include js/auto-header-club.js
</script>
<script>
  var autoHeaderObj = new AutoHeader();
</script>
<!-- topbar end -->
```

这样打包后，`mini.html` 可以供开发打开查看效果，`mini.bundle.html` 内嵌了 1 个样式文件和 3 个脚本文件，可供直接使用。

这个是如何做到的呢？答案是 [gulp-include](https://github.com/wiledal/gulp-include)，具体写法有如下几种：

for js
```
//=include relative/path/to/file.js
```
for css
```
/*=include relative/path/to/file.css */
```
for html
```
<!--=include relative/path/to/file.html -->
```

## 编写 JavaScript

打包策略
1. `xxx.old.js` --> UglifyJS --> rename --> `xxx.js`
2. `yyy.entry.js` ---> Webpack + Babel --> `yyy.js`

原有的非 ES6 的代码怎么办？简单啊，把原有的 `xxx.js` 重命名为 `xxx.old.js` 即可。

### externals 配置

有时候，我们不想将某些 `import` 的包打包到 bundle 中，而是在运行时再去从外部获取这些扩展依赖。

例如，从 CDN 引入 jQuery，而不是把它打包：

`index.html`
```html
<script src="https://s.autoimg.cn/as/jquery/1.12.4/jquery.js"></script>
```

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

### 浏览器兼容性

#### ES6+ 兼容性报告

首先，Babel 原意是把 ES6+ 代码转换为 ES5 代码，因此肯定用到了很多的 ES5 的 API，从 `@babel/helpers` 就可以看到。

**所以，我们的最低兼容是 IE9。**

另外有如下注意事项：
1. 不使用 `for...of`
2. 不使用 String spread
3. 不使用 String destructuring
4. 动态 `import()` 依赖 `Promise`
5. Generator 和 Async/Await 会转化为 regenerator runtime，而 regenerator runtime 依赖 `Promise。`
6. Class 继承父类的静态属性以及继承原生类不被 IE10 支持

详细信息请参考 [Babel 转换后代码依赖的 API](https://github.com/athm-fe/create-autofe-app/blob/master/doc/how-to-babel7.md#babel-%E8%BD%AC%E6%8D%A2%E5%90%8E%E4%BB%A3%E7%A0%81%E4%BE%9D%E8%B5%96%E7%9A%84-api) 以及 [Babel Caveats](https://babeljs.io/docs/en/caveats)。

#### browserslist

你会发现有一个单独的 `.browserslistrc` 文件，指定了项目的目标浏览器的范围。这个值会被 [@babel/preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html) 和 [Autoprefixer](https://github.com/postcss/autoprefixer) 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

[查阅](https://github.com/ai/browserslist)这里了解如何指定浏览器范围。

#### Polyfill

刚创建的项目默认会使用 `babel-preset-autofe-app`，它通过 `@babel/preset-env` 和 `browserslist` 配置来决定项目需要的 polyfill。

默认情况下，它会把 `useBuiltIns: false` 传递给 `@babel/preset-env`，这意味着关闭 polyfill 功能，你需要在自己的源码中手用引入自己需要的 polyfill。

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

这样它会根据源代码中出现的语言特性自动检测需要的 polyfill，这确保了最终包里 polyfill 数量的最小化。

特殊情况下，某个依赖提供了 ES5 代码，但是它可能明确的列出需要的 polyfill，这种情况，需要你自己手动添加到源代码中。

```javascript
import 'core-js/features/promise';

// import 'a-package-using-es5-but-need-promise-support';

Promise.resolve(32).then(x => console.log(x)); // => 32
```

另外，你还可以配置 `useBuiltIns: 'entry'`，然后手动在入口文件头部添加 `import "core-js/stable";`。
这会根据 `browserslist` 目标导入所有需要的 polyfill，这样你就不用再担心 polyfill 问题了。
但是因为是根据 `browserslist` 而不是实际代码进行解析，所以可能包含了一些没有用到的 polyfill，从而导致最终的包大小增加。

> ⚠️ 提示
>
> `@babel/polyfill` 官方已经不推荐使用了，建议直接使用 `core-js` 和 `regenerator-runtime`。
> ```javascript
> import "core-js/stable";
> import "regenerator-runtime/runtime";
> ```
> 另外，由于 `babel-preset-autofe-app` 内置了 `regenerator-runtime`，所以只考虑 `core-js` 即可。

#### 处理 node_modules 中的 ES6+ 代码

默认情况下 `babel-loader` 会忽略所有 `node_modules` 中的文件。如果你想要通过 Babel 显示转译一个依赖包，可以通过配置 `creator.config.js` 实现。

`creator.config.js`
```javascript
module.exports = {
  // ...
  transpileDependencies: [
    '@auto/img-crop',
  ],
  // ...
};
```

通过上面的配置，`babel-loader` 会处理 `@auto/img-crop` 里的 ES6+ 语法。如果你配置了 `useBuiltIns: 'usage'` 的话，`@babel/preset-env` 还会分析 `@auto/img-crop` 的代码，并自动检测出需要的 polyfills。

`transpileDependencies` 接受一个数组，里面的元素可以是字符串，也可以是正则表达式。

## ESLint

可修改 `.eslintignore` 和 `.eslintrc.js`。

详细的用法请参考[玩转 ESLint](https://github.com/athm-fe/create-autofe-app/blob/master/doc/eslint-guide.md)。

## 还缺啥?

文档写的不好？写的不全？欢迎[来找茬](https://github.com/athm-fe/create-autofe-app/issues)。