'use strict';

const gulp = require('gulp');
const config = require('../../config');
require('../../gulpfile.js');
require('../../gulpfile.js/log');

module.exports = function runner(command) {
  const args = process.argv.slice(2);

  process.chdir(config.appDirectory);

  console.log('cwd:', process.cwd());
  console.log('argv:', args);

  gulp.start(command, () => {
    // do nothing...
  });
};
