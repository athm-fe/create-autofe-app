const gutil = require('gulp-util');
const prettyTime = require('pretty-hrtime');
const chalk = require('chalk');

let failed = false;
process.once('exit', (code) => {
  if (code === 0 && failed) {
    process.exit(1);
  }
});

module.exports = logEvents;

// Wire up logging events
function logEvents(gulpInst) {
  // Total hack due to poor error management in orchestrator
  gulpInst.on('err', () => {
    failed = true;
  });

  gulpInst.on('task_start', (e) => {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    gutil.log(`Starting '${chalk.cyan(e.task)}'...`);
  });

  gulpInst.on('task_stop', (e) => {
    const time = prettyTime(e.hrDuration);
    gutil.log(`Finished '${chalk.cyan(e.task)}' after ${chalk.magenta(time)}`);
  });

  gulpInst.on('task_err', (e) => {
    const msg = formatError(e);
    const time = prettyTime(e.hrDuration);
    gutil.log(`'${chalk.cyan(e.task)}' ${chalk.red('errored after')} ${chalk.magenta(time)}`);
    gutil.log(msg);
  });

  gulpInst.on('task_not_found', (err) => {
    gutil.log(chalk.red(`Task '${err.task}' is not in your gulpfile`));
    gutil.log('Please check the documentation for proper gulpfile formatting');
    process.exit(1);
  });
}

// Format orchestrator errors
function formatError(e) {
  if (!e.err) {
    return e.message;
  }

  // PluginError
  if (typeof e.err.showStack === 'boolean') {
    return e.err.toString();
  }

  // Normal error
  if (e.err.stack) {
    return e.err.stack;
  }

  // Unknown (string, number, etc.)
  return new Error(String(e.err)).stack;
}
