# 可用命令

## 使用命令

Creator 提供了一个运行时依赖，即 `autofe-scripts`，在项目的 `package.json` 中可以看到：

```json
{
  "scripts": {
    "start": "autofe-scripts start",
    "build": "autofe-scripts build"
  }
}
```

你可以通过 npm 或 Yarn 调用这些 script：

```sh
npm start
npm run build

# OR

yarn start
yarn build
```

## `autofe-scripts start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## `autofe-scripts build`

Builds the app for production to the `build` folder.<br>
It correctly bundles assets in production mode and optimizes the build for the best performance.

~~The build is minified and the filenames include the hashes. If necessary, classnames and function names can be enabled for profiling purposes. See the production build section for more information.~~

Your app is ready to be deployed!

## `autofe-scripts inspect`

**暂未支持，待开发。**