# autofe-polyfill

This package includes polyfills for various browsers.
It includes minimum requirements and commonly used language features used by [Create AutoFE App](https://github.com/athm-fe/create-autofe-app) projects.

## Usage

First, install the package using Yarn or npm:

```sh
npm install autofe-polyfill
```

or

```sh
yarn add autofe-polyfill
```

## Polyfills

* `Promise` (for `async` / `await` support)
* `Object.assign` (a helper required for Object Spread, i.e. `{ ...a, ...b }`)
* `Symbol` (a built-in object used by `for...of` syntax and friends)
* `Array.from` (a built-in static method used by array spread, i.e. `[...arr]`)

## More Features

If you need more features, see the [browser compatibility](https://athm-fe.github.io/create-autofe-app/guide/browser-compatibility.html)
