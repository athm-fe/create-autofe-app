const gulp = require('gulp');
const config = require('../config/gulpConfig');
const browserSync = require('../config/browserSync');

const browserSyncTask = function () {
  browserSync.init(config.browserSync.option);
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
