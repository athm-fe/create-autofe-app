# 如何迁移到 autofe-scripts v1 版本

该版本功能主要改动：
* 增强了 CSS 能力，依托于 Webpack 打包
* PostCSS 可通过 `postcss.config.js` 自定义配置，比如 Autoprefixer
* 自动打开浏览器时，使用 `external ip` 地址，替代原来的 `localhost` 地址
* Babel 可通过 `babel.config.js` 自定义配置，增加了 Polyfills 能力
* 增加 `transpileDependencies` 选项来支持通过 Babel 处理 `node_modules` 里的特定包
* ESLint 可通过 `.eslintrc.js` 和 `.eslintignore` 自定义配置
* 目标浏览器可通过 `.browserslistrc` 自定义配置
* 去掉了图片压缩功能，收益太小（SVG的压缩还保留着）

## 创建全新项目

```
npx create-autofe-app --scripts-version=autofe-scripts@next my-app
```

## 老项目迁移

这次升级比较大，虽然我尽可能的做了向后兼容，但是还是有一些迁移成本。

**⚠️ 注意：目前 `autofe-scripts` 还未打上标签 `latest`。**

**⚠️ 注意：`autofe-scripts` 暂不支持全局使用。**

### 安装必要的包

```
npm uninstall --save-dev autofe-scripts
npm install --save-dev autofe-scripts@next
npm install --save-dev eslint@5 eslint-config-autofe-app eslint-plugin-import@2
```

**注意：如果安装出现问题，可以先删除 `node_modules` 目录，再安装。**

### 在项目根目录创建一些配置文件

参考流行的做法，提供了一些配置文件来自定义配置。

`.browserslistrc`
```
> 0.2%
last 2 versions
Firefox ESR
not dead
iOS >= 9
Android >= 4.4
Explorer >= 9
```

`.eslintignore`
```
build
**/*.old.js
```

`.eslintrc.js`
```javascript
module.exports = {
  root: true,
  extends: [
    'eslint-config-autofe-app',
  ],
  globals: {
    AHAPP: 'readonly',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
```

`babel.config.js`
```javascript
module.exports = {
  presets: [
    ['autofe-app', {
      // debug: true,
      // useBuiltIns: 'usage',
      // helpers: false,
    }],
  ],
};
```

`creator.config.js`
```javascript
module.exports = {
  externals: {
    jquery: 'jQuery',
  },
  transpileDependencies: [
    '@auto/img-crop',
  ],
};
```

`postcss.config.js`
```javascript
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
```

### 去掉 CSS 中的 `inline()`

原来的写法：
```css
.test-inline {
  background: inline("../img/car.jpg") repeat;
}
```

修改为如下写法：
```css
.test-inline {
  background: url("../img/car.jpg?datauri") repeat;
}
```

### Sass 中图片路径处理

原来的 Sass 中图片的路径是按照入口文件来寻找图片的，这次修改了这个逻辑，改为按照模块文件所在的位置来寻找图片。

假设你的目录结构是这样的：

```
+ main.scss
+ sub/
  + _sub.scss
  + sub.png
```

代码内容是这样的：

`main.scss`
```scss
@import "sub/sub";
```

`sub/_sub.scss`
```scss
.sub {
  background: url("./sub.png") no-repeat;
}
```

原来的输出结果：

```css
.sub {
  background: url("./sub.png") no-repeat;
}
```

现在的输出结果是：

```css
.sub {
  background: url("./sub/sub.png") no-repeat;
}
```

## 新功能

到这里，就迁移完成了，请移步 [User Guide](https://github.com/athm-fe/create-autofe-app/blob/master/packages/autofe-scripts/template/README.md) 了解新功能。
