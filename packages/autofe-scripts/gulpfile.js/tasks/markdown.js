const gulp = require('gulp');
const markdown = require('gulp-markdown');
const wrap = require('gulp-wrap');
const highlight = require('highlight.js');
const join = require('path').join;
const config = require('../config');
const browserSync = require('../lib/browserSync');

const markdownTask = function () {
  return gulp.src(config.markdown.src)
    .pipe(markdown({
      breaks: true,
      highlight(code) {
        return highlight.highlightAuto(code).value;
      },
    }))
    .pipe(wrap({ src: join(__dirname, 'markdown.html') }))
    .pipe(gulp.dest(config.markdown.dest))
    .pipe(browserSync.stream());
};

gulp.task('markdown', markdownTask);
module.exports = markdownTask;
