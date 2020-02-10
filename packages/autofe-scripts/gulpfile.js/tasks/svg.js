'use strict';

const { src, dest } = require('gulp');
const config = require('../config');
const svgmin = require('../lib/svgmin');
const gulpif = require('gulp-if');

function svg() {
  return src(config.svg.src)
    .pipe(gulpif(
      process.env.NODE_ENV === 'production',
      svgmin({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ))
    .pipe(dest(config.svg.dest, { overwrite: false }))
}

exports.svg = svg;
