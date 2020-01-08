/**
 * http://babeljs.io/docs/usage/caveats/#internet-explorer-classes-10-and-below-
 *
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
  boundFunction2() {
    return this.instanceProperty;
  }
  static randomColor() {
    console.log('super static', super.defaultX === 100);
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

class Foo extends Array {}

console.log('-------- class --------');
