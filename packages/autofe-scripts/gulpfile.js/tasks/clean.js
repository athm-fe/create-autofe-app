const gulp = require('gulp');
const del = require('del');
const config = require('../config');

const cleanTask = function (cb) {
  const patterns = config.clean.dest;

  del(patterns).then(() => {
    cb();
  }).catch(() => {
    console.log(arguments);
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
