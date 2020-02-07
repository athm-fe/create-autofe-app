/* eslint no-unused-vars: "off" */

console.group('ts');


const age: any = 'seventeen';

const isDone: boolean = false;
// ts 类型错误
// const createdByNewBoolean1: boolean = new Boolean(1);
// eslint ts 代码风格 no-new-wrappers
const createdByNewBoolean2: Boolean = new Boolean(1);

const decLiteral: number = 6;
const notANumber: number = NaN;
const infinityNumber: number = Infinity;

const myName: string = 'Tom';
const myAge: number = 25;
const sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;


function sayHello(person: string) {
  return 'Hello, ' + person;
}

const user = 'Tom';
const num = 10;

console.log(sayHello(user));
console.log(sayHello(num));


function alertName(): void {
  console.log('My name is Tom');
}


const numUndifined: number | undefined = undefined;
const numNull: number | null = null;


// 任意类型
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;

// 类型推论
let myFavoriteNumber2 = 'seven';
myFavoriteNumber2 = 7;

// 任意类型
let myFavoriteNumber3;
myFavoriteNumber3 = 'seven';
myFavoriteNumber3 = 7;


function getLength(something: string | number): number {
  return something.length;
}

function getString(something: string | number): string {
  return something.toString();
}


const fibonacci: number[] = [1, 1, 2, 3, 5];
const fibonacci2: Array<number> = [1, 1, 2, 3, 5];
const myInfo: any[] = ['jpuncle', 33, { website: 'https://jpuncle.com' }];
function sum() {
  const args: {
      [index: number]: number;
      length: number;
      callee: Function;
  } = arguments;

  return args[0] + args[1];
}
function sum2() {
  const args: IArguments = arguments;

  return args[0] + args[1];
}
function sum3(x: number, y: number): number {
  return x + y;
}


class Animal {
  protected name: string;
  public age: number;
  public constructor(name: string) {
    this.name = name;
    this.age = 0;
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
    console.log(this.name);
  }
}

const a = new Animal('Jack');
console.log(a.name);
console.log(a.age);
a.name = 'Tom';
a.age = 20;


export { sayHello };
export { getString, getLength };


console.groupEnd();
