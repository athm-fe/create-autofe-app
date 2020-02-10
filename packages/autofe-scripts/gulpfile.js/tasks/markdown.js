'use strict';

const { src, dest } = require('gulp');
const md = require('gulp-markdown');
const wrap = require('gulp-wrap');
const highlight = require('highlight.js');
const join = require('path').join;
const config = require('../config');

function markdown() {
  return src(config.markdown.src)
    .pipe(md({
      breaks: true,
      highlight(code) {
        return highlight.highlightAuto(code).value;
      },
    }))
    .pipe(wrap({ src: join(__dirname, 'markdown.html') }))
    .pipe(dest(config.markdown.dest))
}

exports.markdown = markdown;
