'use strict';

const del = require('del');
const config = require('../config');

function clean() {
  const patterns = config.clean.dest;
  return del(patterns);
}

exports.clean = clean;
