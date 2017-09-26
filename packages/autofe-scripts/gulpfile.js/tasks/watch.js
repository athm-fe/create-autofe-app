'use strict';

const gulp = require('gulp');
const config = require('../config');

const watchTask = function () {
  const tasks = config.watch.tasks || [];

  tasks.forEach((taskName) => {
    const task = config[taskName];
    if (task) {
      gulp.watch(task.src, [taskName]);
    }
  });
};

gulp.task('watch', ['browserSync'], watchTask);
module.exports = watchTask;
