const modB = require('./modB');

export default function modA() {
  return 'modA';
}

export const name = 'modA';
export const desc = `This is ${name}.`;
export const child = modB;
