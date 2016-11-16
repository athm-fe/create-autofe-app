var path = require('path');
var gulp = require('gulp');
var config = require('../config/gulpConfig');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-urls');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function () {
  // Ignore files that may reference assets. We'll rev them next.
  var ignoreThese = '!' + path.join(config.rev.base, '/**/*+(css|js|json|html)');

  return gulp.src([path.join(config.rev.base, '/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(config.rev.dest))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest(config.rev.dest));
});

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function () {
  var manifest = path.join(config.rev.dest, 'rev-manifest.json');

  return gulp.src(path.join(config.rev.base, '/**/**.{css,js}'))
    .pipe(revReplace({
      manifest: manifest,
      debug: true
    }))
    .pipe(gulp.dest(config.rev.dest));
});
