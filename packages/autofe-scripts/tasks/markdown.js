var gulp = require('gulp');
var markdown = require('gulp-markdown');
var wrap = require('gulp-wrap');
var highlight = require('highlight.js');
var config = require('../config/gulpConfig');
var browserSync = require('../config/browserSync');
var join = require('path').join;

var markdownTask = function () {
  return gulp.src(config.markdown.src)
    .pipe(markdown({
      breaks: true,
      highlight: function (code) {
        return highlight.highlightAuto(code).value;
      }
    }))
    .pipe(wrap({ src: join(__dirname, 'markdown.html') }))
    .pipe(gulp.dest(config.markdown.dest))
    .pipe(browserSync.stream());
};

gulp.task('markdown', markdownTask);
module.exports = markdownTask;
