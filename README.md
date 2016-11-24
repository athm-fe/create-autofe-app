# Create AutoFE App

> Thanks to [create-react-app](https://github.com/facebookincubator/create-react-app)

Create AutoFE apps with no build configuration.

* [Getting Started](#getting-started) – How to create a new app.
* [User Guide](https://github.com/jpuncle/create-autofe-app/blob/master/packages/autofe-scripts/template/README.md) – How to develop apps bootstrapped with Create AutoFE App.

## tl;dr

```sh
npm install -g create-autofe-app

create-autofe-app my-app
cd my-app/
npm start

```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

## Getting Started

### Installation

Install it once globally:

```sh
npm install -g create-autofe-app
```

**You’ll need to have Node >= 4 on your machine**

**We strongly recommend to use Node >= 6 and npm >= 3 for faster installation speed and better disk usage.** You can use [nvm](https://github.com/creationix/nvm#usage) to easily switch Node versions between different projects.

**This tool doesn’t assume a Node backend**. The Node installation is only required for the build tools that rely on it locally, such as Gulp and Webpack.

### Creating an App

To create a new app, run:

```sh
create-autofe-app my-app
cd my-app
```

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

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

No configuration or complicated folder structures, just the files you need to build your app.<br>
Once the installation is done, you can run some commands inside the project folder:

### `npm start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles assets in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

## Why Use This?

## What’s Inside?

* [Browsersync](https://browsersync.io/)
* [gulp](http://gulpjs.com/)
* [gulp-sass](https://github.com/dlmanning/gulp-sass)
* [gulp-clean-css](https://github.com/scniro/gulp-clean-css)
* [gulp-uglify](https://github.com/terinjokes/gulp-uglify)
* [imagemin](https://github.com/imagemin/imagemin)
* [Nunjucks](https://mozilla.github.io/nunjucks/)
* and others.

All of them are transitive dependencies of the provided npm package.

## Contributing

We'd love to have your helping hand on `create-autofe-app`! See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.


## TODO

* `rev` 相关功能需要重新考虑
* 阿金的那种控件需求
* `autoprefixer`
* 文件上传 FastDFS
* 反向代理到后端 API
* 模块的开发、下载、引用、预览和发布，形成模块云服务，js+css+img+tpl
* sourcemap
* img base64
* js 打包，es6，amd，cmd，commonjs，webpack
* 自动雪碧图
* 资源加 CND 前缀