var gulp = require('gulp');
var del = require('del');
var config = require('../config');

var cleanTask = function (cb) {
  var patterns = config.clean.dest;

  del(patterns).then(function () {
    cb();
  }).catch(function() {
    console.log(arguments);
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
