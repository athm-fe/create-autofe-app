# babel-preset-autofe-app

> A babel preset for transforming your JavaScript for autofe-app.

> Thanks for [babel-preset-airbnb](https://github.com/airbnb/babel-preset-airbnb).

Currently contains transforms for all standard syntax that is [stage 4](https://github.com/tc39/ecma262) (ES2018) or [stage 3](https://github.com/tc39/proposals#active-proposals), except for the following:
- [async-to-promises](https://www.npmjs.com/package/babel-plugin-async-to-promises) is not yet complete enough to be safely used
- lifted template literal restrictions: we do not use tagged template literals, nor implement custom DSLs, otherwise we would enable this.

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

You may override our default debug option by providing your own `debug` key.

```json
{
  "presets": [["autofe-app", {
    "debug": true
  }]]
}
```