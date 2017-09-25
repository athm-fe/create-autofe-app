# Create AutoFE App

> Thanks to [create-react-app](https://github.com/facebookincubator/create-react-app)

Create AutoFE apps with no build configuration.

* [Getting Started](#getting-started) – How to create a new app.
* [User Guide](https://github.com/athm-fe/create-autofe-app/blob/master/packages/autofe-scripts/template/README.md) – How to develop apps bootstrapped with Create AutoFE App.

Create AutoFE App works on macOS, Windows, and Linux.<br>
If something doesn’t work please [file an issue](https://github.com/athm-fe/create-autofe-app/issues/new).

## Quick Overview

```sh
npm install -g create-autofe-app

create-autofe-app my-app
cd my-app/
npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

### Get Started Immediately

You **don’t** need to install or configure tools like Gulp, Webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

Just create a project, and you’re good to go.

## Getting Started

### Installation

Install it once globally:

```sh
npm install -g create-autofe-app
```

**You’ll need to have Node >= 8 on your machine**. You can use [nvm](https://github.com/creationix/nvm#installation) to easily switch Node versions between different projects.

**This tool doesn’t assume a Node backend**. The Node installation is only required for Create AutoFE App itself.

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

The page will reload if you make edits.<br>
You will see the build errors and lint warnings in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles assets in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

## User Guide

The [User Guide](https://github.com/athm-fe/create-autofe-app/blob/master/packages/autofe-scripts/template/README.md) includes information on different topics.

A copy of the user guide will be created as `README.md` in your project folder.

## How to Update to New Versions?

Please refer to the [User Guide](https://github.com/athm-fe/create-autofe-app/blob/master/packages/autofe-scripts/template/README.md#%E6%9B%B4%E6%96%B0%E5%88%B0%E6%96%B0%E7%89%88%E6%9C%AC) for this and other information.

## Philosophy

- **One Dependency:** There is just one build dependency. It uses Webpack, Babel, ESLint, and other amazing projects, but provides a cohesive curated experience on top of them.
- **No Configuration Required:** You don't need to configure anything. Reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.
- <del>**No Lock-In:** You can “eject” to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off.</del>

## Why Use This?

TODO

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
* 文件上传 FastDFS
* 反向代理到后端 API
* 模块的开发、下载、引用、预览和发布，形成模块云服务，js+css+img+tpl
* 自动雪碧图
* 资源加 CND 前缀
* 打包时，警告 console, alert, debugger ？