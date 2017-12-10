# Creator 之 ESLint 指南


## 大纲

* Course Overview
* Setting up ESLint in Your Project
  * Introduction
  * Installing and Running ESLint
  * Resolving ESLint Errors
  * Summary
* ESLint Rules Explained
  * Introduction
  * Common ESLint Rules
  * Picking and Adding More ESLint Rules
  * ESLint Rules Under the Hood
  * ESLint and Abstract Syntax Trees(AST)
  * Writing Your First Rule
  * No-FIXME-comment Rule
  * Expiring-code Rule
  * Passing Parameters to Rules
  * Verify-parameters Rule
  * Making Rules fixble with `--fix`
  * Summary
* Exploring the ESLint Ecosystem
  * Introduction
  * Shareable Configs and Plugins
  * Adding an ESLint Plugin from NPM
  * Adding an ESLing Config from NPM
  * Creating a Shareable Config
  * Creating a Shareable Plugin
  * Summary
* Common ESLint Use Case
  * Introduction
  * Linting Client and Server JavaScript
  * Linting ES6/7 JavaScript
  * Linting Angular Code
  * Linting React Code
  * Integrate with VSCode or Atom
  * Integrate with Webpack or Gulp
  * Integrate with Git Hooks
  * Integrate with Mocha.js
  * Overriding and Ignoring Files
  * Summary


## 背景

eslint 检查太严格：airbnb -> aribnb-base -> eslint:recommended ，所以这里给大家介绍一下 ESLint ，并且告诉大家如何 “绕过” 检查。


## ESLint 简介

The pluggable linting utility for JavaScript and JSX.

The goals:
- making code more consistent
- avoiding bugs

Similar to JSLint, JSHint, with a few exceptions:
- ESLint uses Espree for JavaScript parsing.
- ESLint uses an AST to evaluate patterns in code.
- ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

**TODO: 这里贴代码或者图, 演示基本使用及识别错误信息, 参考官网 Getting Started**

```
$ npm install eslint --save-dev
```

```
$ ./node_modules/.bin/eslint --init
```

```
$ ./node_modules/.bin/eslint yourfile.js
```

**Any plugins or shareable configs that you use must also be installed locally to work with a locally-installed ESLint.**

同样, `eslint` 可以全局安装使用, 这里不在详述

**Any plugins or shareable configs that you use must also be installed globally to work with a globally-installed ESLint.**


## Creator 的 eslint

- `eslint-config-autofe-app` 自定义共享配置包
- `eslint-loader` 与 webpack 集成
- 只 Lint ES6 代码

辅助调试：
- `--print-config` Print the configuration for the given file
- `--debug` Output debugging information


## 配置方式

1. Command line options, 不建议用
2. Configuration Comments, 酌情使用
3. Configuration Files, `.eslintrc.js` or `eslintConfig` in a `package.json`
  `eslint --init` 可以帮助生成配置文件
  配置文件格式：（ESLint 按顺序查找，一个目录下只用一个）
    .eslintrc.js
    .eslintrc.yaml
    .eslintrc.yml
    .eslintrc.json
    .eslintrc （JSON or YAML ，已废弃）
    package.json `eslintConfig`


## 配置优先级

1. 行内配置
  1. /*eslint-disable*/ 和 /*eslint-enable*/
  2. /*global*/
  3. /*eslint*/
  4. /*eslint-env*/
2. 命令行选项：
  1. --global
  2. --rule
  3. --env
  4. -c、--config
3. 项目级配置：
  1. 与要检测的文件在同一目录下的 .eslintrc.* 或 package.json 文件
  2. 继续在父级目录寻找 .eslintrc 或 package.json文件，直到根目录（包括根目录）或直到发现一个有"root": true的配置。
  3. 如果不是（1）到（3）中的任何一种情况，退回到 `~/.eslintrc` 中自定义的默认配置。

  找到项目根目录为止还是一直到文件系统根目录？
  多级 eslint 配置文件会合并，子目录优先级更高。并且会覆盖默认设置 `baseConfig` 。

```
home
└── user
    ├── .eslintrc <- Always skipped if other configs present
    └── projectA
        ├── .eslintrc  <- Not used
        └── lib
            ├── .eslintrc  <- { "root": true }
            └── main.js
```

问题
  项目目录之外的 eslintrc 配置文件可能导致 `npm start` 报错，比如找不到 `eslint-config-airbnb` 。在项目的根目录下，在 package.json 的 `eslintConfig` 字段中配置 `"root": true` ，或者在 eslintrc 文件中配置 `"root": true` ，可以解决这个问题。


## 配置项

1. `parserOptions` 指定想要支持的 JavaScript 语言选项
  ecmaVersion 默认为 ES5 语法，可以修改这个开启 ES6+
  sourceType 默认 "script" , 如果使用 ECMAScript 可修改为 "module"
  ecmaFeatures 指定一些额外的语言特性
    globalReturn
    impliedStrict
    jsx JSX 语法
    experimentalObjectRestSpread
2. `parser`
  ESLint 默认使用 Espree 做为解析器，你可以使用其他的解析器，比如 babel-eslint

  You only need to use babel-eslint if you are using types (Flow) or experimental features(ES6+ ?) not supported in ESLint itself yet.

  注意，当使用自定义解析器时，为了使 ESLint 在非 ECMAScript 5 特性下正常工作，配置属性 parserOptions 仍然是必须的。解析器被传入 parserOptions，可能会也可能不会使用它们来决定开启哪个特征。
3. `env` 配置，指定脚本的运行环境。每一个 environment 都预设了一组预设的 global 变量
  browser
  node
  commonjs
  es6 这个会自动设置 parseOptions.ecmaVersion 为 6
  worker
  amd
  mocha, jasmine, jest, phantomjs, protractor, qunit
  jquery, prototypejs
  ...

  `/* eslint-env node, mocha */`

  `"browser": true`
  `"example/custom": true` 使用插件中提供的环境预设
4. `global` 配置，额外配置的一些全局变量
  `/* global var1, var2 */`
  `/* global var1:false, var2:false */` 只读
5. `rules` 配置，一些具体的规则配置
  - `"off"` or `0` - 关闭
  - `"warn"` or `1` - 警告 (doesn’t affect exit code)
  - `"error"` or `2` - 报错 (exit code is 1 when triggered)

  `/* eslint eqeqeq: "off", curly: "error" */`
  `/* eslint quotes: ["error", "double"], curly: 2 */`
  `/* eslint "plugin1/rule1": "error" */` 插件内规则
  `/* eslint-disable */`
  `/* eslint-enable */`
  `/* eslint-disable no-alert, no-console */`
  `/* eslint-enable no-alert, no-console */`
  `// eslint-disable-line`
  `// eslint-disable-next-line`
  `// eslint-disable-line no-alert`
  `// eslint-disable-line no-alert, quotes, semi`
  `// eslint-disable-line example/rule-name`
6. `settings`
   ESLint 支持在配置文件添加共享设置。你可以添加 `settings` 对象到配置文件，它会提供给每一个将被执行的规则。如果你想添加自定义规则而且使它们可以访问到相同的信息，这将会很有用，并且很容易配置。
7. `plugins` 插件，约定 `eslint-plugin-xxx` 命名规则
   通常输出规则。一些插件也可以输出一个或多个命名的共享配置

   比如 `eslint-plugin-react` ，这样 ESLint 可以识别 React 语法

   **Due to the behaviour of Node’s `require` function, a globally-installed instance of ESLint can only use globally-installed ESLint plugins, and locally-installed version can only use locally-installed plugins. Mixing local and global plugins is not supported.**
8. `extends` 配置文件可扩展
   可以基于别人写好的配置文件来扩展
   可接受格式：
   1. 可共享配置包
   2. 插件中的可共享配置内容
   3. 配置文件

   关于 `eslint:recommended`
   1. 就是 ESLint 官方提供的的配置集，你可以基于它扩展，设置 `"extends": "eslint:recommended"` 即可。
   2. 它开启了 Rules 页面中所有打 **“对勾”** 的规则。
   3. 这个推荐的子集只能在 ESLint 主要版本进行更新。

   开发可共享配置包
   1. 约定 `eslint-config-xxx` 命名规则
   2. 开发者会把包发布到 npm
   3. 使用的时候下载到 `node_modules` 目录下
   4. 使用方式，可以省略包名前缀 `eslint-config-`
     `"airbnb"` 世纪使用的是 `eslint-config-airbnb`
   4. 使用插件包中的共享配置，可以省略包名前缀 `eslint-plugin-`
     `"plugin:react/recommended"`
9. `overrides`
  有时，你可能需要更精细的配置，比如，如果同一个目录下的文件需要有不同的配置。因此，你可以在配置中使用 `overrides` 键，它只适用于匹配特定的 glob 模式的文件，比如 `app/**/*.test.js` 。

  `overrides` 下不能配置 `extends`, `overrides`, and `root`


## `.eslintignore` 忽略某些文件

可以在项目根目录创建 `.eslintignore` 文件，一次只有一个 `.eslintignore` 文件会被使用，不是当前工作目录下的 `.eslintignore` 文件将不会被用到。

ESLint 默认忽略 `/node_modules/*` 和 `/bower_components/*`

`.eslintignore` 配置举例，将忽略 `node_modules` `，bower_components` 以及 `build/` 目录下除了 `build/index.js` 的所有文件。

```
# /node_modules/* and /bower_components/* ignored by default

# Ignore built files except build/index.js
build/*
!build/index.js
```


## 课外阅读

- https://github.com/dustinspecker/awesome-eslint
- https://eslint.org/docs/user-guide/integrations
- https://eslint.org/docs/user-guide/formatters/
- Parser https://github.com/babel/babel-eslint
- Config, 开发可共享配置包
   https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
- Plugin, 开发插件
  https://github.com/yannickcr/eslint-plugin-react
  https://github.com/evcohen/eslint-plugin-jsx-a11y
- https://github.com/standard/standard
- https://eslint.org/docs/developer-guide/nodejs-api
  https://eslint.org/docs/developer-guide/nodejs-api#cliengine