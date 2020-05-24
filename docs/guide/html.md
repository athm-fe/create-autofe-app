# HTML

使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 模版引擎来编写 HTML ，建议先去官网了解下该模版引擎的用法。

即使不想看，你也可以像往常那样写 HTML。

## 引用资源

由于历史原因，HTML 部分并不是通过 Webpack 处理的，因此路径能力没有那么强大。

假设目录结构是这样的：

```
src/
  index.html
  css/
    reset.css
    main.scss
  js/
    jquery.old.js
    common.entry.ts
    main.entry.js
```

引用资源要按照打包后的文件名来引用静态资源：

`index.html`
```html
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/main.css">

<script src="js/jquery.js"></script>
<script src="js/common.js"></script>
<script src="js/main.js"></script>
```

## `includePretty`

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
```html{8,9,10}
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

## `assets`

假设目录结构是这样的：
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

::: tip 提示
使用 `assets` 时需要从 `src` 之下开始写路径，不能直接写 `index.css` ，目前还没想到其它的办法。
:::

## html-bundle

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
