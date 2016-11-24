var gulp = require('gulp');
var config = require('../config');
var browserSync = require('../lib/browserSync');

var browserSyncTask = function () {
  browserSync.init(config.browserSync.option);
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
