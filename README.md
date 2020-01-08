# Create AutoFE App

> Thanks to [Create React App](https://create-react-app.dev/) and [Vue CLI](https://cli.vuejs.org/)

Create AutoFE apps with no build configuration.

* [Getting Started](#getting-started) – How to create a new app.
* [User Guide](https://github.com/athm-fe/create-autofe-app/blob/master/packages/autofe-scripts/template/README.md) – How to develop apps bootstrapped with Create AutoFE App.

Create AutoFE App works on macOS, Windows, and Linux.<br>
If something doesn’t work please [file an issue](https://github.com/athm-fe/create-autofe-app/issues/new).

## Quick Overview

```sh
npx create-autofe-app my-app

cd my-app/
npm start
```

If you've previously installed `create-autofe-app` globally via `npm install -g create-autofe-app`, we recommend you uninstall the package using `npm uninstall -g create-autofe-app` to ensure that npx always uses the latest version.

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

## Creating an App

**You’ll need to have Node >= 8 on your machine**. You can use [nvm](https://github.com/creationix/nvm#installation) to easily switch Node versions between different projects.

**This tool doesn’t assume a Node backend**. The Node installation is only required for Create AutoFE App itself.

To create a new app, run:

```sh
npx create-autofe-app my-app
cd my-app
```

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

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

No configuration or complicated folder structures, just the files you need to build your app.<br>
Once the installation is done, you can run some commands inside the project folder:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will see the build errors and lint warnings in the console.

### `npm run build` or `yarn build`

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


## What’s Inside?

* ES6 support
* Language extras beyond ES6 like the object spread operator.
* Autoprefixed CSS, so you don’t need -webkit- or other prefixes.
* Sass support.
* A live development server.
* A build script to bundle JS, CSS, and images for production.
* Nunjucks for HTML.

All of them are transitive dependencies of the provided npm package.

## Contributing

We'd love to have your helping hand on `create-autofe-app`! See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.
