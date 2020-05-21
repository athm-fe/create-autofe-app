'use strict';

const spawn = require('cross-spawn');
const config = require('../../config');
const loadEnv = require('../../config/env');

const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';

// load mode .env
if (mode) {
  loadEnv(mode);
}
// load base .env
loadEnv();

module.exports = function runner(command) {
  const args = process.argv.slice(2);

  process.chdir(config.appDirectory);

  console.log('cwd:', process.cwd());
  console.log('argv:', args);

  const gulpBin = require.resolve('gulp/bin/gulp.js');
  const gulpFile = require.resolve('../../gulpfile.js/index.js')
  const gulpArgs = [
    `${gulpBin}`,
    `--cwd=${config.appDirectory}`,
    `--gulpfile=${gulpFile}`,
    command,
  ];

  spawn('node', gulpArgs, { stdio: 'inherit' });
};
