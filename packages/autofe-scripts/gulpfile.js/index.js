'use strict';

const { watch, series, parallel } = require('gulp');
const log = require('fancy-log');
const config = require('./config');
const { clean } = require('./tasks/clean');
const { js } = require('./tasks/js');
const { webpack } = require('./tasks/webpack');
const { html } = require('./tasks/html');
const { markdown } = require('./tasks/markdown');
const { htmlBundle } = require('./tasks/html-bundle');

function reload(cb) {
  if (global.__creator_dev_server) {
    const server = global.__creator_dev_server;
    server.sockWrite(server.sockets, 'content-changed');
  }
  cb();
}

function myWatch(...args) {
  const watcher = watch(...args);

  watcher.on('change', function(path) {
    log(`File ${path} was changed`);
  });
  watcher.on('add', function(path) {
    log(`File ${path} was added`);
  });
  watcher.on('unlink', function(path) {
    log(`File ${path} was removed`);
  });

  return watcher;
}

const watchTask = function(cb) {
  myWatch(config.js.src, series(js, reload));
  myWatch(config.html.src, series(html, reload));
  myWatch(config.markdown.src, series(markdown, reload));

  cb();
};
watchTask.displayName = 'watch';

const build = series(
  clean,
  parallel(js, webpack, html, markdown),
  htmlBundle,
);

const serve = series(
  clean,
  parallel(js, webpack, html, markdown),
  watchTask,
);

exports.build = build;
exports.serve = serve;
