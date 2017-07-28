## 关于 Polyfills

* Async functions, Generators
  regenerator-runtime
* Array destructuring, For Of
  Symbol, prototype[Symbol.iterator]
* Spread
  Array.from

如下的一些功能需要 babel-polyfills
https://stackoverflow.com/questions/32120943/babel-is-not-processing-array-from-or-for-of-loops
所以用 transform-runtime 是更好的选择
https://stackoverflow.com/questions/31781756/is-there-any-practical-difference-between-using-babel-runtime-and-the-babel-poly?rq=1
* Abstract References
* Array destructuring
* Async functions
* Comprehensions
* For of
* Array.from
* spread

## 兼容 IE8

https://github.com/zuojj/fedlab/issues/5
https://segmentfault.com/a/1190000005128101

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