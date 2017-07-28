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
    entries[key] = `.${path.sep}${path.join('src', filePath)}`;
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
            presets: [
              ['env', {
                // use webpack modules solution
                modules: false,
                target: {
                  ie: '7',
                },
                // transform-es2015-classes
                // transform-es2015-computed-properties
                // transform-es2015-for-of
                // transform-es2015-spread
                // transform-es2015-template-literals
                // transform-es2015-modules-commonjs
                // loose: true,
                // transform-es2015-arrow-functions
                // transform-es2015-template-literals
                // spec: true,
              }],
            ],
            plugins: [
              // for <=IE8
              // var foo = {
              //   default: function () {}
              // };
              // ---->
              // var foo = {
              //   'default': function () {}
              // };
              'transform-es3-property-literals',
              // for <=IE8
              // foo.default; ----> foo['default'];
              'transform-es3-member-expression-literals',
              // import() now is in stage
              'syntax-dynamic-import',
              // object rest and spread
              // TODO useBuiltIns
              'transform-object-rest-spread',
              // Transforms class properties, property and static
              // TODO spec: true
              'transform-class-properties',
              // TODO transform-runtime
            ],
          },
        },
      },
    ],
  },
});
