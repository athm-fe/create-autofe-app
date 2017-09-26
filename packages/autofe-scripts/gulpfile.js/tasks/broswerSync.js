'use strict';

const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');

const browserSyncTask = function () {
  browserSync.init(config.browserSync.option);
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
