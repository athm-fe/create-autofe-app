#!/usr/bin/env node
var spawn = require('cross-spawn');

var script = process.argv[2];
var args = process.argv.slice(3);

var result;

switch (script) {
  case 'start':
  case 'build':
  case 'test':
  case 'eject':
  case 'origJS':
    result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)].concat(args),
      { stdio: 'inherit' },
    );
    process.exit(result.status);
    break;
  default:
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update autofe-scripts?');
    break;
}
