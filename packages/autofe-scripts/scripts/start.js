'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const runner = require('./lib/runner');

runner('default');
