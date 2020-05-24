# 环境变量和模式

你可以替换你的项目根目录中的下列文件来指定环境变量：

``` bash
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

一个环境文件只包含环境变量的“键=值”对：

```
FOO=bar
APP_SECRET=secret
```

被载入的变量将会被 `autofe-scripts` 内部访问到。

::: tip 环境加载属性

为一个特定模式准备的环境文件的 (例如 `.env.production`) 将会比一般的环境文件 (例如 `.env`) 拥有更高的优先级。

此外，Creator 启动时已经存在的环境变量拥有最高优先级，并不会被 `.env` 文件覆写。
:::

## 模式

**模式**是 Creator 项目中一个重要的概念。默认情况下，一个 Creator 项目有两个模式：

- `development` 模式用于 `autofe-scripts start`
- `production` 模式用于 `autofe-scripts build`

注意模式不同于 `NODE_ENV`，一个模式可以包含多个环境变量。也就是说，每个模式都会将 `NODE_ENV` 的值设置为模式的名称——比如在 development 模式下 `NODE_ENV` 的值会被设置为 `"development"`。

你可以通过为 `.env` 文件增加后缀来设置某个模式下特有的环境变量。比如，如果你在项目根目录创建一个名为 `.env.development` 的文件，那么在这个文件里声明过的变量就只会在 development 模式下被载入。

## 在客户端侧代码中使用环境变量

只有以 `APP_` 开头的变量会被 `webpack.DefinePlugin` 静态嵌入到客户端侧的包中。你可以在应用的代码中这样访问它们：

``` js
console.log(process.env.APP_SECRET)
```

在构建过程中，`process.env.APP_SECRET` 将会被相应的值所取代。在 `APP_SECRET=secret` 的情况下，它会被替换为 `"secret"`。

除了 `APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量：

- `NODE_ENV` - 会是 `"development"`、`"production"` 中的一个。具体的值取决于应用运行的[模式](#模式)。
- `BASE_URL` - 会和 `creator.config.js` 中的 `publicPath` 选项相符，即你的应用会部署到的基础路径。

所有解析出来的环境变量也可以在 JavaScript、HTML 和 SASS 中使用。

::: tip 提示
你可以在 `creator.config.js` 文件中计算环境变量。它们仍然需要以 `APP_` 前缀开头。这可以用于版本信息 `process.env.APP_VERSION = require('./package.json').version`。
:::

### JavaScript

```javascript
console.log(process.env.BASE_URL);
console.log(process.env.NODE_ENV);
console.log(process.env.APP_TEST_ENV_FEATURE);
```

### HTML

```html
<p>{{ APP_TEST_ENV_FEATURE }}</p>

{% if NODE_ENV === 'development' %}
  <p>这是只出现在开发环境的内容</p>
{% else %}
  <p>这是只出现在生产环境的内容</p>
{% endif %}
```

### SASS

```scss
.box {
  background-image: url(#{$BASE_URL}/img/logo.png);
  content: $APP_TEST_ENV_FEATURE;
}
```

## 只在本地有效的变量

有的时候你可能有一些不应该提交到代码仓库中的变量，尤其是当你的项目托管在公共仓库时。这种情况下你应该使用一个 `.env.local` 文件取而代之。本地环境文件默认会被忽略，且出现在 `.gitignore` 中。

`.local` 也可以加在指定模式的环境文件上，比如 `.env.development.local` 将会在 development 模式下被载入，且被 git 忽略。
