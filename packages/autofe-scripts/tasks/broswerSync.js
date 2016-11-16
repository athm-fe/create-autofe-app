var gulp = require('gulp');
var config = require('../config/gulpConfig');
var browserSync = require('../config/browserSync');

var browserSyncTask = function () {
  browserSync.init(config.browserSync.option);
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
