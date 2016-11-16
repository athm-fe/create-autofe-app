var gulp = require('gulp');
var del = require('del');
var config = require('../config/gulpConfig');

var cleanTask = function (cb) {
  var patterns = config.clean.dest;

  del(patterns).then(function () {
    cb();
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
