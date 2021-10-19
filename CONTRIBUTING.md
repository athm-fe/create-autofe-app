# 贡献

首先，你应当了解一下 [lerna](https://lernajs.io/) 和 [yarn](https://yarnpkg.com/)。

## 关于配置

* 约定大于配置
* 启发式大于配置，根据 ENV 设置配置，比如 `PORT`
* 交互大于配置，比如 3000 端口被占用，会给出一个 prompt 来让用户输入其它的端口

有时候，我们也希望有一个配置项，仔细问问自己是否真的需要，如果是，那么就添加吧。

## 本地开发

**注意：要求使用 `yarn` 而不是 `npm`，因为我们需要结合 yarn 的 workflow 的概念来进行开发。**

```
git clone https://github.com/athm-fe/create-autofe-app
cd create-autofe-app
yarn
```

一旦上面的命名执行成功，你可以修改任何文件，并且运行 `yarn start`，`yarn build` 等来查看 Demo，它将运行位于 `packages/autofe-scripts/temlate` 目录下的应用。

如果想本地联调测试 `create-autofe-app` 和 `autofe-scripts`，可以按照下面的步骤来：

```
yarn create-autofe-app my-app
cd my-app
```

然后就运行 `yarn start` 或者 `yarn build` 了。

## 发布

1. 大多数情况下只有 `autofe-scripts` 需要发布。
2. 由于 `create-autofe-app` 是安装到全局的，所以尽量少修改它。还有，需要注意所有版本的 `create-autofe-app` 都要能够兼容最新版本的 `autofe-scripts`。
3. 发布前，请修改 `CHANGELOG.md`。
4. 不要直接使用 `npm publish` 来发布包。应当使用 `npm run publish` 来发布。