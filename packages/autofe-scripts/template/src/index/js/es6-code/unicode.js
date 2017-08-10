/**
 * 可以放心用
 */

// same as ES5.1
console.log('"𠮷".length === 2', '𠮷'.length === 2);

// new RegExp behaviour, opt-in ‘u’
console.log(
  '"𠮷".match(/./u)[0].length === 2',
  '𠮷'.match(/./u)[0].length === 2,
);

// new form
console.log(
  '"\\u{20BB7}" === "𠮷" === "\\uD842\\uDFB7"',
  '\u{20BB7}' === '𠮷' && '𠮷' === '\uD842\uDFB7',
);

if (String.prototype.codePointAt) {
  // new String ops
  console.log(
    '"𠮷".codePointAt(0) === 0x20BB7',
    '𠮷'.codePointAt(0) === 0x20BB7,
  );
} else {
  console.warn('String.prototype.codePointAt does not support');
}

// u for RegExp
console.log(
  '/^\\uD83D/u.test("\\uD83D\\uDC2A") === false',
  /^\uD83D/u.test('\uD83D\uDC2A') === false,
);
console.log(
  '/^\\uD83D/.test("\\uD83D\\uDC2A") === true',
  /^\uD83D/.test('\uD83D\uDC2A') === true,
);

console.log(
  '/^.$/.test("𠮷") === false',
  /^.$/.test('𠮷') === false,
);
console.log(
  '/^.$/u.test("𠮷") === true',
  /^.$/u.test('𠮷') === true,
);

console.log('-------- unicode --------');
