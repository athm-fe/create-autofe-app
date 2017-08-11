# babel-preset-autofe-app

> A babel preset for transforming your JavaScript for autofe-app.

> Thanks for [babel-preset-airbnb](https://github.com/airbnb/babel-preset-airbnb).

Based on `babel-preset-env`, except for the following:
- `SIMD`: this is a performance feature, so is pretty pointless to polyfill/transpile.
- lifted template literal restrictions: we do not use tagged template literals, nor implement custom DSLs, otherwise we would enable this.

We have also enabled the following:
- object rest/spread
- class properties
- Syntax Dynamic Import. Allow parsing of `import()`. [source](https://babeljs.io/docs/plugins/syntax-dynamic-import/)

## Install

```sh
$ npm install --save-dev babel-preset-autofe-app
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["autofe-app"]
}
```

### Via CLI

```sh
$ babel script.js --presets autofe-app
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["autofe-app"]
});
```

### Targeting Environments

This module uses babel-preset-env to target specific environments.

Please refer to [babel-preset-env#targets](https://github.com/babel/babel-preset-env#targets) for a list of available options.

For a list of browsers please see [browserlist](https://github.com/ai/browserslist).

You may override our default list of targets by providing your own `targets` key.

```json
{
  "presets": [["autofe-app", {
    "targets": {
      "chrome": 50,
      "explorer": 11,
      "firefox": 45
    }
  }]]
}
```

The following transpiles only for Node v6.

```json
{
  "presets": [["autofe-app", {
    "targets": {
      "node": 6
    }
  }]]
}
```

If you wish, you can also inherit our default list of browsers and extend them using `additionalTargets`.

```json
{
  "presets": [["autofe-app", {
    "additionalTargets": {
      "chrome": 42,
      "explorer": 8
    }
  }]]
}
```
