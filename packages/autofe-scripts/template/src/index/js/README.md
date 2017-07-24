## 关于 Polyfills

* Async functions, Generators
  regenerator-runtime
* Array destructuring, For Of
  Symbol, prototype[Symbol.iterator]
* Spread
  Array.from

## 兼容 IE8

### `transform-es3-member-expression-literals`

Ensure that reserved words are quoted in property accesses

```javascript
obj.default;
```

转换为

```javascript
obj["default"];
```

### `transform-es3-property-literals`

Ensure that reserved words are quoted in object property keys

```javascript
var foo = {
  catch: function () {}
};
```

转换为

```javascript
var foo = {
  "catch": function () {}
};
```