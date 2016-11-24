var gulp = require('gulp');
var config = require('../config');

var watchTask = function () {
  var tasks = config.watch.tasks || [];

  tasks.forEach(function (taskName) {
    var task = config[taskName];
    if (task) {
      gulp.watch(task.src, [taskName]);
    }
  });
};

gulp.task('watch', ['browserSync'], watchTask);
module.exports = watchTask;
