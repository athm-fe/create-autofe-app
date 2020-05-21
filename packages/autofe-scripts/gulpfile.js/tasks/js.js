'use strict';

const { src, dest } = require('gulp');
const config = require('../config');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const insert = require('gulp-insert');
const PluginError = require('plugin-error');
const projectConfig = require('../../config');
const resolveClientEnv = require('../../util/resolveClientEnv');

const variablesForDev = `
  window.process = window.process || {};
  window.process.env = ${JSON.stringify(resolveClientEnv(projectConfig, true))};
`

function js() {
  return src(config.js.src)
    .pipe(gulpif(process.env.NODE_ENV !== 'production', insert.prepend(
      variablesForDev
    )))
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify({
      output: {
        ascii_only: true,
      },
      compress: {
        global_defs: resolveClientEnv(projectConfig),
      },
    })))
    .on('error', function(err) {
      var message = new PluginError('js', err).toString();
      process.stderr.write(`${message}\n`);
      process.exit(1);
    })
    .pipe(rename((path) => {
      path.basename = path.basename.replace(/\.old$/, '');
    }))
    .pipe(dest(config.js.dest))
}

exports.js = js;
