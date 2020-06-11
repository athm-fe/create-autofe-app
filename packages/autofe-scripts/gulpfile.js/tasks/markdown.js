'use strict';

const { src, dest } = require('gulp');
const md = require('gulp-markdown');
const wrap = require('gulp-wrap');
const highlight = require('highlight.js');
const join = require('path').join;
const config = require('../config');
const gulpif = require('gulp-if');
const insert = require('gulp-insert');

function markdown() {
  return src(config.markdown.src)
    .pipe(md({
      breaks: true,
      highlight(code) {
        return highlight.highlightAuto(code).value;
      },
    }))
    .pipe(wrap({ src: join(__dirname, 'markdown.html') }))
    .pipe(gulpif(process.env.NODE_ENV !== 'production', insert.append(
      '<script src="/webpack-dev-server.js"></script>'
    )))
    .pipe(dest(config.markdown.dest))
}

exports.markdown = markdown;
