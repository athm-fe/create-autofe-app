const path = require('path');
const glob = require('glob');
const paths = require('./paths');

const context = paths.appDirectory;

function getEntries() {
  const entries = {};
  const entryFiles = glob.sync('**/*.entry.js', {
    cwd: path.join(context, 'src'),
  });

  for (let i = 0; i < entryFiles.length; i += 1) {
    const filePath = entryFiles[i];
    const key = path.join(path.dirname(filePath), path.basename(filePath, '.entry.js'));
    entries[key] = [
      require.resolve('autofe-polyfill'),
      `.${path.sep}${path.join('src', filePath)}`,
    ];
  }

  console.log(entries);

  return entries;
}

module.exports = () => ({
  // TODO only for development
  devtool: 'eval',
  context,
  entry: getEntries(),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(context, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [require.resolve('babel-preset-autofe-app')],
          },
        },
      },
    ],
  },
});
