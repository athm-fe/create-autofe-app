/**
 * 不能用 extends ，不然要从 IE 11 开始
 * 其它特性要求 IE9 开始
 *
 * http://babeljs.io/docs/usage/caveats/#internet-explorer-classes-10-and-below-
 *
 * _classCallCheck(instance, Constructor)
 * 只允许 new 调用, 不允许普通函数调用, instanceof
 *
 * _createClass(Constructor, protoProps, staticProps)
 * 添加原型属性和静态属性
 * 依赖 Object.defineProperty(), value 方式，所以可 polyfill
 * 均不可枚举
 *
 * _inherits(subClass, superClass)
 * 实现继承效果
 * 依赖 Object.create()
 * 依赖 Object.setPrototypeOf() 或 Object.prototype.__proto__
 *    所以，兼容性一般，IE11 才支持
 *
 * super()
 * 依赖 _possibleConstructorReturn(self, call)
 * 依赖 Object.prototype.__proto__ 或 Object.getPrototypeOf() 调用父类
 *
 * 关于 _inherits() 和 super()
 * 这里有一个巧妙的机制，保证了即使不支持 getPrototypeOf, setPrototypeOf, __proto__ 也可以保证正常运行。
 * 不支持的情况下，就可以当作普通的设置 __proto__ 属性来获取父类
 *
 * _possibleConstructorReturn(self, call)
 * 有可能父类构造器有 return 语句返回 call ，则用 call ，否则用 self
 *
 * super.xxx()
 * 依赖 Object.prototype.__proto__ 或 Object.getPrototypeOf() 获取原型对象
 * 依赖 _get(object, property, receiver) 获取具体方法
 *
 * _get(object, property, receiver)
 * 获取 object 的原型方法
 * 依赖 Object.getOwnPropertyDescriptor()
 * 依赖 Object.getPrototypeOf()
 */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.name = 'point';
  }
  toString() {
    return `(${this.x},${this.y})`;
  }
  static defaultX = 100
}
Point.defaultY = 200;

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);

    this.color = color;
  }
  toString() {
    return `${this.color} ${super.toString()}`;
  }
  instanceProperty = 'test';
  boundFunction = () => this.instanceProperty;
  static randomColor() {
    console.log(super.defaultX);
    return '#F60';
  }
}

const cp = new ColorPoint(100, 100, 'red');
console.log('cp.x === 100', cp.x === 100);
console.log('cp.y === 100', cp.y === 100);
console.log("cp.name === 'point'", cp.name === 'point');
console.log('cp.color === "red"', cp.color === 'red');
console.log(
  'cp.boundFunction.call(undefined) === "test"',
  cp.boundFunction.call(undefined) === 'test',
);
console.log('ColorPoint.randomColor() === "#F60"',
  ColorPoint.randomColor() === '#F60');

console.log('-------- class --------');
