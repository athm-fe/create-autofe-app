const gulp = require('gulp');
const config = require('../config/gulpConfig');
const browserSync = require('../config/browserSync');
const render = require('gulp-nunjucks-render');
const data = require('gulp-data');
const path = require('path');

const htmlTask = function () {
  const env = render.nunjucks.configure([config.src], { watch: false });

  env.addFilter('assets', function (assetpath) {
    const url = path.join(this.ctx.__ctx_file.prefix || '', assetpath);
    return url;
  });

  return gulp.src([config.html.src, config.html.exclude])
    .pipe(data(function (file) {
      const obj = {
        path: file.path,
        relative: file.relative,
        base: file.base,
        prefix: path.relative(path.resolve(file.path, '..'), file.base)
      };
      return {
        __ctx_file: obj
      };
    }))
    .pipe(render())
    .pipe(gulp.dest(config.html.dest))
    .pipe(browserSync.stream());
};

gulp.task('html', htmlTask);
module.exports = htmlTask;
