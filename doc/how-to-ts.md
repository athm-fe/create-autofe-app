# TypeScript 使用

Creator 从 `autofe-scripts@1.3.0` 开始支持 TypeScript。

## 手动升级

如果你是使用 `npx create-autofe-app my-app` 创建新项目，可以自动略过该部分。

首先，安装必要的包：

```
npm i --save-dev autofe-scripts@1.3.0
npm i --save-dev eslint@5.16.0
npm i --save-dev typescript@3
npm i --save-dev @typescript-eslint/parser@2
npm i --save-dev @typescript-eslint/eslint-plugin@2
npm i --save-dev eslint-config-autofe-app@1.1.0
```

在项目根目录创建 `tsconfig.json`，具体内容请使用提前准备好的[配置](https://github.com/athm-fe/create-autofe-app/blob/master/packages/autofe-scripts/template/tsconfig.json)

## 开始使用

具体内容请移步 [TypeScript 使用](https://github.com/athm-fe/create-autofe-app/tree/master/packages/autofe-scripts/template#%E7%BC%96%E5%86%99-typescript)