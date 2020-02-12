/* eslint @typescript-eslint/no-unused-vars: "off" */
/* eslint @typescript-eslint/no-explicit-any: "off" */
/* eslint @typescript-eslint/no-inferrable-types: "off" */

console.group('ts');


const age1 = 'seventeen';
const age2: string = 'seventeen';
const age3: any = 'seventeen';

const isDone: boolean = false;
// ts 类型错误
const isFinished: boolean = 'finished';

const decLiteral: number = 6;
const notANumber: number = NaN;
const infinityNumber: number = Infinity;

const myName: string = 'Tom';
const myAge: number = 25;
const sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;


function sayHello(person: string): string {
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
function sum(...args: Array<number>): number {
  return args[0] + args[1];
}
function sum2(): number {
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
a.name = 'Tom';
a.age = 20;

let foo = 3;
switch (foo) {
  case 1:
    sayHello('Tom');
    break;
  case 2:
    sayHello('Jack');
    break;
  // default:
  //   // do nothing
  // no default
}
foo = 3 + 3;


export { sayHello };
export { getString, getLength };


console.groupEnd();
