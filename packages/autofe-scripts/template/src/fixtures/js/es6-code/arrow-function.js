/**
 * 放心用，低版本 IE 也没有问题
 */

function equal(arr1, arr2) {
  const length = arr1.length;
  if (length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// Expression bodies
const array = [1, 2, 3].map(value => value + 10);
console.log('array[0] === 11', array[0] === 11);
console.log('array[1] === 12', array[1] === 12);
console.log('array[2] === 13', array[2] === 13);

// Lexical this
const bob = {
  name: 'Bob',
  friends: ['John', 'Jack', 'Tom', 'Lily'],
  printFriends() {
    const temp = [];
    this.friends.forEach((f) => {
      console.log('Lexical this', this === bob);
      temp.push(f);
    });
    console.log('Lexical this', equal(temp, bob.friends));
  },
};
bob.printFriends();

// Lexical arguments
function square() {
  const example = () => {
    const numbers = [];
    const args = Array.prototype.slice.call(arguments, 0);
    // Statement bodies
    args.forEach((number) => {
      numbers.push(number * number);
    });

    return numbers;
  };

  return example();
}

console.log(
  'square(2, 4, 7.5, 8, 11.5, 21) equal to [4, 16, 56.25, 64, 132.25, 441]',
  equal(square(2, 4, 7.5, 8, 11.5, 21), [4, 16, 56.25, 64, 132.25, 441]),
);
// returns: [4, 16, 56.25, 64, 132.25, 441];

console.log('-------- arrow function --------');
