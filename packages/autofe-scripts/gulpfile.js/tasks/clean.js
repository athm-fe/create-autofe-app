const gulp = require('gulp');
const del = require('del');
const config = require('../config');

const cleanTask = function () {
  const patterns = config.clean.dest;
  return del(patterns);
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
