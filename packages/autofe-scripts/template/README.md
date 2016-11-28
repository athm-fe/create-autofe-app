This project was bootstrapped with [Create AutoFE App](https://github.com/jpuncle/create-autofe-app).

Below you will find some information on how to perform common tasks.
You can find the most recent version of this guide [here](https://github.com/jpuncle/create-autofe-app/blob/master/packages/autofe-scripts/template/README.md).

## Table of Contents

- [更新到新版本](#更新到新版本)
- [目录结构](#目录结构)
- [可用的命令](#可用的命令)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
- [功能支持](#功能支持)
- [开发约定](#开发约定)
- [编写样式](#编写样式)
  - [autoprefixer](#autoprefixer)
  - [图片内嵌](#图片内嵌)
- [编写 HTML](#编写-html)
  - [includePretty](#includepretty)
  - [assets](#assets)
  - [html-bundle](#html-bundle)
- [sourcemaps](#sourcemaps)
- [还缺啥?](#还缺啥)

## 更新到新版本

Create AutoFE App 分成两个包：
* `create-autofe-app` 是一个全局命令行工具，可以用来创建项目，之后就基本用不到。
* `autofe-scripts` 是上面创建的项目在开发过程中所需要的一个依赖包，一般情况下，也只需要这个包就够了。

你基本上用不着更新 `create-autofe-app`，因为大多数的逻辑都在 `autofe-scripts`。如果实在是需要更新，运行 `npm install -g create-autofe-app` 即可。

当运行 `create-autofe-app` 来创建新项目的时候，它总是会去 npm 下载最新发布的 `autofe-scripts`，所以你能够自动获得所有的新的功能或者优化。

如果你已经有了一个项目，并且想把该项目的 `autofe-scripts` 升级到新版本。请先[打开版本修改日志](https://github.com/jpuncle/create-autofe-app/blob/master/CHANGELOG.md)，找到你的当前版本（在 `package.json` 可以找到）和新版本之间的差异。有可能新版本和老版本不兼容，需要你按照 `CHANGELOG.md` 的说明来修改你的代码。

但是我们会尽量保证 `autofe-scripts` 新老版本之间的兼容，做的不需要你修改代码，或者仅仅是修改少量的代码，即可迁移成功。

所以，大多数情况下，只要手动修改 `package.json` 文件里的 `autofe-scripts` 的版本号，然后重新 `npm install` 即可更新到最新版本。

## 目录结构

创建项目后，目录结构大体是这样的：

```
my-app/
  README.md
  node_modules/
  package.json
  .gitignore
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
        main.js
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
* 使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 模版引擎来写 HTML
* 使用 Sass 写 CSS
* 使用 clean-css 压缩 CSS
* 使用 UglifyJS2 压缩 JS，中文 to ASCII
* 使用 imagemin 压缩图片
* 使用 Markdown 写文档，并生成 HTML 方便查看

## 开发约定

1. 文件碎片化、代码模块化
2. 使用前缀下划线命名模块文件，打包时不输出
3. 打包输出文件（即 `build` 文件夹）不提交到 git 仓库
4. 图片放到 `img` 和 `pic` 目录下，区别是 `pic` 仅做 demo 展示用，上线完全不需要

## 编写样式

用 SASS 来写样式，没什么好说的。比如下面的例子：

`_btn.scss`
```css
.btn {
  display: inline-block;
}
```

`main.scss`
```css
@import "btn";

.some {
  color: red;
}
```

编译后，只会产生 `main.css` 。

### Autoprefixer

有了 Autoprefixer，你不再需要手动写 `-webkit-` ，`-ms-` ，`-moz-` 等浏览器厂商前缀，也就不再需要使用 Sass 之类的语言来编写一堆 mixins。

加浏览器前缀时，我们只考虑下面所列的浏览器：
```
browsers: ['ios >= 6', 'android >= 4.0', 'Explorer >= 6', 'Firefox >= 20', 'Opera > 10']
```

Autoprefixer 根据你所支持的浏览器配置，从 [Can I Use](http://caniuse.com/) 获取数据，然后只添加必要的厂商前缀。

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

上面我们介绍了几种 Autoprefixer 的处理规则，更多的用法请参见[官网](https://github.com/postcss/autoprefixer)

### 图片内嵌

有时候希望将样式里引用的背景图内嵌到样式里，可以使用 `inline` 代替 `url`。

```css
.assets-svg {
  width: 400px;
  height: 72px;
  background: inline("../img/postcss-assets.svg");
}
.assets-png {
  width: 200px;
  height: 57px;
  background: inline("../img/postcss-assets.png");
}
.assets-jpg {
  width: 190px;
  height: 190px;
  background: inline("../img/postcss-assets.jpg");
}
```

## 编写 HTML

本工具使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 模版引擎来编写 HTML ，建议先去官网了解下该模版引擎的用法。

即使不想看，你也可以像往常那样写 HTML，只要你会 `includePretty` 就够用了。

### `includePretty`

Nunjucks 自带的 `include` 无法保证输出 HTML 的对齐问题，所以自己开了这个。

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

## sourcemaps

目前仅支持开发模式下的样式的 source map 。

![sourcemap](http://x.autoimg.cn/fe/create-autofe-app/sourcemap.png)

## 还缺啥?

文档写的不好？写的不全？欢迎[来找茬](https://github.com/jpuncle/create-autofe-app/issues)。