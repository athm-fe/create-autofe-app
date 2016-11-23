This project was bootstrapped with [Create AutoFE App](https://github.com/jpuncle/create-autofe-app).

Below you will find some information on how to perform common tasks.
You can find the most recent version of this guide [here](https://github.com/jpuncle/create-autofe-app/blob/master/packages/autofe-scripts/template/README.md).

## Table of Contents

- [更新到新版本](#更新到新版本)
- [目录结构](#目录结构)
- [可用的命令](#可用的命令)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
- [样式开发](#样式开发)

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

## 样式开发