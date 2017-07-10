const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');

const jsTask = function () {
  return gulp.src(config.js.src)
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify({
      output: {
        ascii_only: true,
      },
    })))
    .pipe(rename((path) => {
      path.basename = path.basename.replace(/\.orig$/, '');
    }))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.stream());
};

gulp.task('js', jsTask);
module.exports = jsTask;
