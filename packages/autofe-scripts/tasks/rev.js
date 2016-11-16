const path = require('path');
const gulp = require('gulp');
const config = require('../config/gulpConfig');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-urls');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function () {
  // Ignore files that may reference assets. We'll rev them next.
  const ignoreThese = '!' + path.join(config.rev.base, '/**/*+(css|js|json|html)');

  return gulp.src([path.join(config.rev.base, '/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(config.rev.dest))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest(config.rev.dest));
});

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function () {
  const manifest = path.join(config.rev.dest, 'rev-manifest.json');

  return gulp.src(path.join(config.rev.base, '/**/**.{css,js}'))
    .pipe(revReplace({
      manifest: manifest,
      debug: true
    }))
    .pipe(gulp.dest(config.rev.dest));
});
