# 更新版本

Creator 分成两个包：
* `create-autofe-app` 是一个全局命令行工具，可以用来创建项目，之后就基本用不到。
* `autofe-scripts` 是上面创建的项目在开发过程中所需要的一个运行时依赖包，一般情况下，也只需要这个包就够了。

## 升级 create-autofe-app

::: tip 提示
关于 create-autofe-app 的安装和使用请移步[快速开始](./getting-started)。
:::

前面讲到过，如果想要创建项目，执行如下命令即可：

```sh
npx create-autofe-app my-app
```

当运行 `create-autofe-app` 来创建新项目的时候，它总是会去 npm 下载 `autofe-scripts@latest`，所以你能够自动获得最新发布的功能或者优化。

## 升级 autofe-scripts

如果你已经有了一个项目，并且想把该项目的 `autofe-scripts` 升级到新版本。请先[打开版本修改日志](https://github.com/athm-fe/create-autofe-app/blob/master/CHANGELOG.md)，找到你的当前版本（在 `package.json` 可以找到）和新版本之间的差异。有可能新版本和老版本不兼容，需要你按照 `CHANGELOG.md` 的说明来修改你的代码。

但是我们会尽量保证 `autofe-scripts` 新老版本之间的兼容，做到不需要你修改代码，或者仅仅是修改少量的代码，即可迁移成功。

所以，大多数情况下，执行如下命令即可：

```sh
npm i --save-dev autofe-scripts@latest
```

该命令会自动产生如下改动：

```diff
// package.json
{
  "devDependencies": {
-    "autofe-scripts": "^1.2.0",
+    "autofe-scripts": "^1.3.4",
  },
}
```

如果想安装指定版本，只要手动修改 `package.json` 文件里的 `autofe-scripts` 的版本号，然后重新 `npm install` 即可。

## 重大变更

* `autofe-script@1.3.4` 主要基于 Webpack 实现，仅残留部分 Gulp 实现。极大增强 CSS 能力，并增强了配置能力。
  * [如何迁移到 autofe-scripts v1 版本](https://github.com/athm-fe/create-autofe-app/blob/master/doc/how-to-migrate-to-v1.md)
  * [如果手动支持 TypeScript](https://github.com/athm-fe/create-autofe-app/blob/master/doc/how-to-ts.md)
* `autofe-script@0.x` 主要基于 Gulp 实现，仅仅 ES6+ 部分使用 Webpack 实现

详情请参考[更新记录](https://github.com/athm-fe/create-autofe-app/blob/master/CHANGELOG.md)