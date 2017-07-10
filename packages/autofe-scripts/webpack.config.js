const path = require('path');
const glob = require('glob');
const config = require('./config/paths');

const context = config.appDirectory;

function getEntries() {
  const entries = {};
  const entryFiles = glob.sync('**/*.entry.js', {
    cwd: path.join(context, 'src'),
  });

  for (let i = 0; i < entryFiles.length; i += 1) {
    const filePath = entryFiles[i];
    const key = path.join(path.dirname(filePath), path.basename(filePath, '.entry.js'));
    entries[key] = `.${path.sep}${path.join('src', filePath)}`;
  }

  console.log(entries);

  return entries;
}

module.exports = {
  context,
  entry: getEntries(),
  output: {
    filename: '[name].js',
    path: path.join(context, 'build'),
  },
};
