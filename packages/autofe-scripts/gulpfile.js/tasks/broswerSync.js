'use strict';

const bs = require('browser-sync').create();
const config = require('../config');

function browserSync(cb) {
  bs.init(config.browserSync.option);
  cb();
}

exports.browserSync = browserSync;
