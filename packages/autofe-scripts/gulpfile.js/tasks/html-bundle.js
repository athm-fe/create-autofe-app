'use strict';

const { src, dest } = require('gulp');
const config = require('../config');
const include = require('gulp-include');

function htmlBundle() {
  return src(config.htmlBundle.src)
    .pipe(include())
    .pipe(dest(config.htmlBundle.dest));
}

exports.htmlBundle = htmlBundle;
