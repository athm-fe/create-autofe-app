# 如何使用 Webpack 改造 Creator 的 CSS 功能

一直以来，都是用 [create-autofe-app](https://github.com/athm-fe/create-autofe-app) 作为传统页面开发的脚手架，关于 CSS 部分的功能，按照 2017 年的标准来说，是能够满足基本的开发需求的。但是前端一直在发展，到今天，SPA 大行其道，基于 Webpack 的构建方式早已经成为主流。今年参与了更多的基于 Vue + Webpack 的开发，愈发感觉 Creator（create-autofe-app 的简称）提供的关于 CSS 部分的功能有些鸡肋。改造 Creator 的想法已经积压很久了，恰好近期业务需求不太多，就赶紧折腾一番这个吧。

## 以前的 CSS 功能

以前是基于 [Gulp](https://gulpjs.com/) 来打包 CSS 的，提供了如下的功能：

1. 使用 Sass 来处理 `.css` 和 `.scss` 文件，非下划线命名开头的文件会被构建输出
2. 自动添加浏览器厂商前缀，比如 `-webkit-`，`-ms-`，`-moz-`
3. 图片内嵌支持，比如 `background: inline("../img/bg.png");`
4. 开发环境提供 SourceMap 支持，便于查看源码，定位问题
5. 开发环境提供样式热更新支持，更新样式时，页面自动生效
6. 生产环境提供样式压缩功能

大体代码如下所示：

```javascript
const isProd = process.env.NODE_ENV === 'production';
const src = 'src/**/*.{scss,css}';
const dest = 'build';

const sassTask = function () {
  return gulp.src(src)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass({
      outputStyle: isProd ? 'compressed' : 'expanded',
    }))
    .pipe(postcss([
      assets({...}),
      autoprefixer({...}),
    ]))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
};
```

具体源码可以参考 [Creator sass.js](https://github.com/athm-fe/create-autofe-app/blob/autofe-scripts%400.16.0/packages/autofe-scripts/gulpfile.js/tasks/sass.js)

## 旧方式存在的问题

经过长期的观察（确实是长期的观察，从 17 年到 19 年，😂），借鉴 [Vue CLI](https://cli.vuejs.org/) 等一系列工具的做法，先逐个分析下存在的问题以及期望的功能。

### Vue 单文件组件包含样式

最理想的功能莫过于这个了：

![from https://cn.vuejs.org/](./img/vue-component.png)

从图中可以看到，模版、交互以及样式按照组件的方式写到一起。But，还是不要迈这么大的步子了，毕竟我们还要兼容 Creator 原有的开发方式，也要考虑改造成本是不，😳。

### 使用来自 npm 的 CSS

相比刚才那个，这个才是一个非常实用的功能，假如有了这个功能，我们就可以使用开源的 [Normalize.css](https://necolas.github.io/normalize.css/)，还可以开发自己的 CSS 包，发布到官方 NPM 或者公司的私有 NPM。

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

### Sass 中的图片相对路径问题

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

我们期望的输出结果是：

```css
.sub {
  background: url("./sub/sub.png") no-repeat;
}
```

但是实际的输出结果是：

```css
.sub {
  background: url("./sub.png") no-repeat;
}
```

导致最终无法找到 `sub.png` 文件。

### 相对路径太长的问题

你可能遇到过如下的代码，眼睛估计也很累。

```scss
@import "../../../../../common/reset.css";
```

而我们希望的是如下方式

```scss
@import "@/common/reset.css";
```

### 内嵌图片 `inline` 不符合规范

```scss
.test-inline {
  background: inline("../img/car.jpg") repeat;
}
```

当初我也是脑抽，提供了这个能力，我可以干掉这个么😨，现在，我有一个新的想法，小于 1kb 自动内嵌怎么样？

```scss
.test-inline {
  background: url("../img/car.jpg") repeat;
}
```

不考虑图片大小，我就是想明确的内嵌图片呢？考虑再三，通过自定义内嵌参数 `datauri` 似乎是一个不错的选择：

```scss
.test-inline {
  background: url("../img/car.jpg?datauri") repeat;
}
```

虽然，改成这个会增加一点迁移成本，但是成本还算比较低，更重要的是可以遵循原有的 `url（）` 处理逻辑，因此还是值得的。

### 其他预处理支持

Vue CLI 项目支持 [PostCSS](https://postcss.org/)、[CSS Modules](https://github.com/css-modules/css-modules) 和包含 [Sass](https://sass-lang.com/)、[Less](http://lesscss.org/)、[Stylus](http://stylus-lang.com/) 在内的预处理器。

对于我们来说，CSS Modules 可以先不考虑。预处理坚持使用一个就好，我们一直使用的是 Sass，而且只考虑 `.scss` 语法格式就好。另外，由于需要使用 [autoprefixer](https://github.com/postcss/autoprefixer) 来自动添加浏览器厂商前缀，还是需要的 PostCSS 的。

## 动手改造

我大概是在 2016 年萌生开发 Creator 的想法，当初做过一些调研，那时候的 Webpack 还没有那么强大，也没有现在这么大的生态，当初主要是针对基于 React 的开发，还不太适用于传统的前端开发方式。印象中，遇到的问题有：

* 没法把 CSS 当作 Entry
* 资源输出目录不够灵活
* 在 CSS 中图片相对路径处理上有问题

现在，Webpack 强大的二次开发能力给了我们面向传统前端开发方式的可能性。经过研究，有一系列工具来解决问题：

* [sass-loader](https://github.com/webpack-contrib/sass-loader)
* [css-loader](https://github.com/webpack-contrib/css-loader)
* [style-loader](https://github.com/webpack-contrib/style-loader)
* [postcss-loader](https://github.com/postcss/postcss-loader)
* [resolve-url-loader](https://github.com/bholloway/resolve-url-loader)
* [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
* [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
* [webpack-fix-style-only-entries](https://github.com/fqborges/webpack-fix-style-only-entries)
* [css-url-relative-plugin](https://github.com/yibn2008/css-url-relative-plugin)
* [file-loader](https://github.com/webpack-contrib/file-loader)
* [url-loader](https://github.com/webpack-contrib/url-loader)
* [svg-url-loader](https://github.com/bhovhannes/svg-url-loader)
* [svgo-loader](https://github.com/rpominov/svgo-loader)

现在，让我们一步步来改造吧。

### 将 CSS 作为 Entry

先贴一份最简单的 Webpack 配置：

```javascript
module.exports = {
  mode: "development",
  context: __dirname,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path: path.resolve(__dirname, "build"),
    publicPath: '/',
  },
  entry: {
    home: './src/home/index.css',
    about: './src/about/index.css',
    contact: './src/contact/index.css'
  },
  module: {
    rules: [
      // 针对 css 的 loader
      // 针对 css 中图片的 loader
    ],
  },
  plugins: [
    // 提取 CSS 文件
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: '[name].css',
    }),
  ],
};
```

打包输出结果如下：

```
+ build
  + home.css
  + home.js
  + about.css
  + about.js
  + contact.css
  + contact.js
```

这里存在两个问题：

1. CSS 所在的目录结构丢失了，我们期望的是 `build/home/index.css`
2. 每个 CSS Entry 都多了一个 JS 文件，这是我们不想要的。

第一个好解决，如下配置即可：

```javascript
module.exports = {
  // ...
  entry: {
    'home/index': './src/home/index.css',
    'about/index': './src/about/index.css',
    'contact/index': './src/contact/index.css'
  },
  // ....
};
```

由于 entry 的 key 变了，结合 Webpack `output` 的配置，输出目录就变成了 `build/home/index.css`。

专门写了一个方法来自动查找所有样式文件并生成 Entry：

```javascript
function getEntries() {
  const entries = {};

  // 找到所有非下划线开头的样式文件
  const entryStyleFiles = glob.sync('**/!(_)*.{scss,css}', {
    cwd: path.join(__dirname, 'src'),
  });

  // 生成所有 entry
  for (let i = 0; i < entryStyleFiles.length; i += 1) {
    // filePath: contact/index.css
    const filePath = entryStyleFiles[i];
    // key: contact/index
    const key = path.join(path.dirname(filePath), path.parse(filePath).name);
    // 生成类似 'contact/index': './src/contact/index.css' 的结构
    entries[key] = `.${path.sep}${path.join('src', filePath)}`;
  }

  return entries;
}
```

第二个问题，找到一个插件来解决，原理是找到只有一个 CSS Entry 的 JS Asset，并删除它，配置如下：

```javascript
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
  // ...
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
  ],
  // ....
};
```

### css-loader

`css-loader` 会解析 CSS 文件中的 `@import` 和 `url()`，还支持从 `node_modules` 中加载样式，真的是非常的强大。

```css
@import "~normalize.css";
@import 'style.css'

.test {
  background-image: url("image.png");
  background-image: url("~module/image.png");
}
```

### Sass 中的图片相对路径问题

`sass-loader` 能够用来处理 `.scss` 文件，同 `css-loader` 一样强大，但是前面有提到可能会遇到图片相对路径的问题。

幸好有 `resolve-url-loader`，该 Loader 的原理是解析 `sass-loader` 编译 Sass 文件时产生的 SourceMap 信息，SourceMap 信息中包含原 `.scss` 的路径对应关系，也能知道所有的 `url()` 来自哪个 `.scss` 文件，通过计算 `.scss` 文件之间对应的路径关系，就可以得到正确的 `url()` 地址。

关于 Sass 的 Loader 配置如下：

```javascript
module.exports = {
  // ....
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: !isProd,
            },
          },
          {
            loader: require.resolve('resolve-url-loader'),
            options: {
              sourceMap: !isProd,
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: true,
            },
          },
        ]
      },
    ],
  },
  // ...
};
```

注意：其他的 Loader 可以根据环境开启 SourceMap，但是 `sass-loader` 必须开启，这样 `resolve-url-loader` 才能处理 Sass 的相对路径问题

### 图片输出路径

我们加上常规的图片 Loader 配置，这样 Webpack 才可以解析 CSS 里的图片资源：

```javascript
module.exports = {
  // ....
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|cur)(\?.*)?$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 1024, // limit 1kb
            },
          },
        ]
      },
    ],
  },
  // ...
};
```

通过配置 `url-loader` 以及它背后的 `file-loader` 就可以解析图片了，而且上面的配置还表明图片小于 1kb 时会被转换为 Data-Uri，这样就可以内嵌到样式文件里。

不过这样输出的图片都会在 `build` 根目录下，就像下面这样：

原目录
```
+ src/
  + home/
    + index.css
    + bg.png
+ node_modules
  + modA
    + btn.png
```

打包目录
```
+ build/
  + bg.png
  + btn.png
  + home/
    + index.css
```

通过 `file-loader` 的参数可以自定义图片输出路径，配置如下：

```javascript
var imageRule = {
  test: /\.(png|jpe?g|gif|webp|cur)(\?.*)?$/,
  use: [
    {
      loader: require.resolve('url-loader'),
      options: {
        // url-loader options
        limit: 1024, // limit 1kb
        // file-loader options
        name: '[path][name].[ext]',
        outputPath: getOutputPathForFileLoader,
      },
    },
  ]
}

function getOutputPathForFileLoader(url) {
  let output;
  if (url.indexOf('src') === 0) {
    output = path.relative('src', url);
  } else if (url.indexOf('node_modules') === 0) {
    output = path.relative('node_modules', url);
  } else {
    output = url;
  }
  return output;
}
```

通过上面的配置，不管 `src` 还是 `node_modules` 目录下的图片都可以保持原目录输出，这样输出目录就是我们想要的了：

```
+ build/
  + home/
    + index.css
    + bg.png
  + modA
    + btn.png
```

### 输出 CSS 中的图片路径

以上的配置，打包以后，CSS 中图片路径是下面这样的：

```css
.test {
  background-image: url("/home/bg.png");
  background-image: url("/modA/bg.png");
}
```

但是我们想要的是相对路径，现在就用到了 `css-url-relative-plugin` 插件来解决这个问题。

```javascript
const CssUrlRelativePlugin = require('css-url-relative-plugin')

module.exports = {
  // ...
  plugins: [
    new FixStyleOnlyEntriesPlugin({
      root: '/',
    }),
  ],
  // ....
};
```

该插件会根据 CSS 文件的位置来替换里面的 `url()`，处理完以后就是下面这样的：

```css
.test {
  background-image: url("./bg.png");
  background-image: url("../modA/bg.png");
}
```

Perfect！但是我在测试的时候，发现该插件在处理样式的过程中，把 SourceMap 给弄丢了。因此，自己写了一份 [Hack](https://github.com/athm-fe/create-autofe-app/blob/master/packages/autofe-webpack/src/css-url-relative-plugin/index.js) 来修复了这个问题

**PS. 为什么没有贡献开源？因为是 Hack 啊，而且我对这个插件还不太满意，后续考虑用 PostCSS 来重新这个插件😎。**






### 关于 SourceMap

其实，在 SourceMap 这一块，我花费了挺多时间的，详细的踩坑之旅就不再说了，总结起来有三点需要注意：
1. Loader 配置好 SourceMap，有的 Loader 会自动检测并处理 Loader 处理链上的 SourceMap 信息，而有的需要你手动配置开关。
2. Plugin 也是同样的道理，而且要小心有的 Plugin 会吞掉 SourceMap，这种 Plugin 要么丢弃，要么自己动手修复。
3. 配置好 Webpack 的 [Devtool](https://webpack.js.org/configuration/devtool/)。

这里着重说一下 Webpack 的 `devtool` 的配置吧，配置项太多，说一下我的总结：
1. 凡是带 `eval` 的，打包速度比较快，但是不能配合 `mini-css-extract-plugin` 使用，可以配合 `style-loader` 使用，Creator 用不了
2. 带 `inline` 的表示 SourceMap 内嵌到样式文件中，正好是我们需要的，因为我们只是开发的时候使用，不需要额外的 SourceMap 文件
3. 带 `cheap` 表示 SourceMap 不包含列映射，只有行映射，因此打包速度比较快，也是我们想要的。
4. 带 `module` 表示 SourceMap 包含更详细的模块信息，虽然会影响打包速度，但是准确度更高，也是我们想要的。

结合以上，`inline-cheap-module-source-map` 就是我们需要的配置项。

**👉Vue CLI 在开发环境使用的是 `cheap-module-eval-source-map`，你知道为什么么？**

### 压缩 CSS

这个就灰常简单了，使用 `optimize-css-assets-webpack-plugin` 即可

```javascript
module.exports = {
  // ...
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            cssDeclarationSorter: false,
            discardComments: { removeAll: true },
            mergeLonghand: false,
          }],
        },
      }),
    ]
  }
  // ....
};
```

### 自动添加浏览器厂商前缀

使用 `postcss-loader` 结合 Autoprefixer 即可

```javascript
module.exports = {
  // ....
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // css loader
          {
            loader: require.resolve('postcss-loader'),
            options: {
              sourceMap: !isProd,
            },
          },
          // resolve-url-loader
          // sass loader
        ]
      },
    ],
  },
  // ...
};
```

然后在项目根目录下创建 `postcss.config.js` 并使用 Autoprefixer 插件。

```javascript
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
```

还有一项工作要做，在项目根目录创建一个 `.browserslistrc` 可以指定要兼容哪些浏览器

```
> 0.2%
last 2 versions
Firefox ESR
not dead
iOS >= 9
Android >= 4.0
Explorer >= 9
```

这样，我们就兼容到了 iOS 9、Android 4.0 以及 IE 9。

### CSS 内嵌图片

这是我们最后需要处理的问题了，前面我们通过 `url-loader` 实现了小于 1kb 图片的内嵌，但是我们还是希望一种直接的指令来告诉 Creator 需要内嵌图片。

我们决定使用给 CSS 中图片路径添加 `datauri` 参数的方式。

```scss
.test-inline {
  background: url("../../img/car.jpg?datauri") repeat;
}
```

经过研究 Webpack，发现 Webpack 配置 Loader 的时候，可以通过 `resourceQuery` 来匹配资源请求路径上的参数信息。改造以后的图片 Loader 配置如下：

```javascript
var imageLoader = {
  test: /\.(png|jpe?g|gif|webp|cur)(\?.*)?$/,
  oneOf: (() => {
    // 不考虑图片大小，一律内嵌
    const imageDataUriLoaderConfig = {
      loader: require.resolve('url-loader'),
      options: {
        limit: true, // no limit
      },
    };

    // 小于 1kb 才内嵌
    const imageUrlLoaderConfig = {
      loader: require.resolve('url-loader'),
      options: {
        limit: 1024, // limit 1kb
      },
    };

    return [
      {
        resourceQuery: /datauri/,
        use: [imageDataUriLoaderConfig],
      },
      {
        use: [imageUrlLoaderConfig],
      },
    ];
  })(),
};
```

这样，当遇到 `datauri` 参数的时候，就会直接内嵌图片，否则就走原有流程。

但是在这个过程中还遇到了一个问题，前面介绍过的 `resolve-url-loader` 的默认配置会把 CSS 中图片路径的参数给丢掉，可以通过如下方式保留：

```javascript
{
  loader: require.resolve('resolve-url-loader'),
  options: {
    keepQuery: true,
    sourceMap: !isProd,
  },
}
```

## 结语

好久没有写过这么长的文章了，经过不懈的努力，改造工作可以暂告一段落了，既使用 Webpack 给大家提供了更加强大的功能，也尽量兼容了原有 Creator 的开发方式，使得大家可以无缝的升级。

后面应该还会折腾的，欢迎大家找我交流，不过允我先喘口气～～～。

😂😂😂😂😂😂😂😂😂