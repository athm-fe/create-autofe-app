# CSS

Creator 支持 [PostCSS](http://postcss.org/)、[Sass](https://sass-lang.com/)。

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

## 路径能力

Creator 可以给大家带来更加强大、灵活的路径能力。

### npm 依赖

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

### 别名 @

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

::: warning
CSS 中图片路径使用 `@` 别名时，要添加 `~` 前缀。
:::

### 支持 Sass 图片相对路径

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

## 图片内嵌

有时候希望将样式里引用的背景图内嵌到样式里，支持如下两种方式：

* 小于 1kb 自动内嵌
* 通过自定义参数 `datauri` 直接表示内嵌

```scss
.test-inline {
  background: url("../img/car.jpg?datauri") no-repeat;
  background: url("../img/car.svg?datauri") no-repeat;
}
```

## 自动添加版本号

为了解决 CDN 缓存的问题，当执行生产环境构建的时候，会自动给 CSS 中的图片路径添加版本号：

```css
.test-md5 {
  background: url(../img/bg.png?6350fa96) no-repeat;
}
```

该版本号是根据图片文件生成的 MD5，当文件变化时，该版本号才会发生变化。

## Autoprefixer

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

### 简单的例子

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

### 自动去掉无用的前缀

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

### 之前已经手动写了前缀也没关系

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

### 怎么用 `-webkit-min-device-pixel-ratio`

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

### 特定浏览器 hack

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

::: tip 提示
你可以配置 `.browserslistrc` 来自定义你需要支持的浏览器。
:::

::: tip 提示
Autoprefixer 是通过 PostCSS 来实现的，如果需要，你可以自定义 `postcss.config.js` 来添加更多的功能。
:::

## PostCSS

Creator 内部使用了 PostCSS。

你可以通过 `postcss.config.js` 来配置 PostCSS。也可以通过 `creator.config.js` 中的 `css.loaderOptions.postcss` 配置 [postcss-loader](https://github.com/postcss/postcss-loader)。

我们默认开启了 [autoprefixer](https://github.com/postcss/autoprefixer)。如果要配置目标浏览器，请参考 [browserslist](../guide/browser-compatibility.html#browserslist) 部分。

## CSS Modules

**暂不支持，待开发。**

## 向预处理器 Loader 传递选项

有的时候你想要向 webpack 的预处理器 loader 传递选项。你可以使用 `creator.config.js` 中的 `css.loaderOptions` 选项。比如你可以这样向所有 Sass 样式传入共享的全局变量：

``` js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/variables.scss";`
      },
    }
  }
}
```

Loader 可以通过 `loaderOptions` 配置，包括：

- [css-loader](https://github.com/webpack-contrib/css-loader)
- [postcss-loader](https://github.com/postcss/postcss-loader)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)

::: tip 提示
这样做比使用 `chainWebpack` 手动指定 loader 更推荐，因为这些选项需要应用在使用了相应 loader 的多个地方。
:::
