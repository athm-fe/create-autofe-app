const gulp = require('gulp');
const del = require('del');
const config = require('../config/gulpConfig');

const cleanTask = function (cb) {
  const patterns = config.clean.dest;

  del(patterns).then(function () {
    cb();
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
