var gulp = require('gulp');
var config = require('../config/gulpConfig');
var browserSync = require('../config/browserSync');
var render = require('gulp-nunjucks-render');
var data = require('gulp-data');
var path = require('path');

var htmlTask = function () {
  var env = render.nunjucks.configure([config.src], { watch: false });

  env.addFilter('assets', function (assetpath) {
    var url = path.join(this.ctx.__ctx_file.prefix || '', assetpath);
    return url;
  });

  return gulp.src([config.html.src, config.html.exclude])
    .pipe(data(function (file) {
      var obj = {
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
