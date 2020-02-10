'use strict';

const { watch, series, parallel } = require('gulp');
const config = require('./config');
const { clean } = require('./tasks/clean');
const { js } = require('./tasks/js');
const { webpack } = require('./tasks/webpack');
const { html } = require('./tasks/html');
const { markdown } = require('./tasks/markdown');
const { svg } = require('./tasks/svg');
const { htmlBundle } = require('./tasks/html-bundle');
const { browserSync } = require('./tasks/broswerSync');


const watchTask = function(cb) {
  watch(config.svg.src, svg);
  watch(config.js.src, js);
  watch(config.html.src, html);
  watch(config.markdown.src, markdown);

  cb();
};
watchTask.displayName = 'watch';

const build = series(
  clean,
  parallel(js, webpack, html, markdown),
  svg,
  htmlBundle,
);

const serve = series(
  clean,
  parallel(js, webpack, html, markdown),
  svg,
  watchTask,
  browserSync,
);

exports.build = build;
exports.serve = serve;
