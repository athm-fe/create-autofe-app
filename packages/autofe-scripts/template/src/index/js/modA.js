const modB = require('./modB');
// import modB from './modB';


export default function modA() {
  return 'modA';
}

export const name = 'modA';
export const desc = `Thi is ${name}`;
export const child = modB;
