# 快速开始

::: tip Node 版本要求
Creator 需要 [Node.js](https://nodejs.org/) 8.0 或更高版本。但暂时不要使用太新的版本，Node 12 是比较稳妥的选择。后续会考虑升级代码以支持更高版本 Node。@你可以使用 [nvm](https://github.com/creationix/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本。
:::

使用如下方式创建项目：

```sh
npx create-autofe-app my-app

cd my-app
npm start
```

::: tip 推荐 npx
推荐使用 `npx` 命令，如果你之前使用 `npm install -g create-autofe-app` 安装过 `create-autofe-app` ，建议你使用 `npm uninstall -g create-autofe-app` 卸载。这样可以保证 `npx` 每次运行都使用最新版本的 `create-autofe-app`。
:::

::: tip 提示
npx 在 npm 5.2+ 及之上版本才支持。
:::

如果你的 npm 不支持 npx，可以使用如下方式：

```sh
npm install -g create-autofe-app
create-autofe-app my-app

cd my-app
npm start
```

然后使用浏览器打开 [http://localhost:3000/](http://localhost:3000/) 即可看到你的应用。<br>
如果你已经开发完成，可以使用 `npm run build` 命令打包，生成线上环境的资源文件。
