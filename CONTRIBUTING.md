# 贡献

## 本地开发

```
git clone https://github.com/athm-fe/create-autofe-app
cd create-autofe-app
npm install
```

`npm start` 可以用来看 demo

如果想本地联调测试 `create-autofe-app` 和 `autofe-scripts`，可以按照下面的步骤来：

```
npm run create-autofe-app my-app
cd my-app
```

然后就运行 `npm start` 或者 `npm run build` 了。

## 发布

1. 大多数情况下只有 `autofe-scripts` 需要发布。
2. 由于 `create-autofe-app` 是安装到全局的，所以尽量少修改它。还有，需要注意所有版本的 `create-autofe-app` 都要能够兼容最新版本的 `autofe-scripts`。
3. 发布前，请修改 `CHANGELOG.md`。
4. 不要直接使用 `npm publish` 来发布包。应当使用 `npm run publish` 来发布。