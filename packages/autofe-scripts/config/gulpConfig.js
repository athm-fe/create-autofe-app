var path = require('path');
var paths = require('./paths');

var root = {
  src: path.join(paths.appDirectory, 'src'),
  dest: paths.appBuild
};

module.exports = {
  src: root.src,
  dest: root.dest,
  clean: {
    dest: root.dest
  },
  fonts: {
    src: path.join(root.src, '/**/*.{eot,svg,ttf,woff,woff2}'),
    dest: path.join(root.dest)
  },
  images: {
    src: path.join(root.src, '/**/*.{png,jpg,gif,svg}'),
    dest: path.join(root.dest),
    imagemin: {
      progressive: true,
      svgoPlugins: [{ removeViewBox: false, cleanupIDs: false }]
    }
  },
  sass: {
    src: path.join(root.src, '/**/*.{scss,css}'),
    dest: root.dest,
    option: {}
  },
  js: {
    src: path.join(root.src, '/**/*.js'),
    dest: root.dest
  },
  html: {
    src: path.join(root.src, '/**/*.html'),
    dest: root.dest,
    exclude: '!' + path.join(root.src, '/**/_*.html')
  },
  htmlBundle: {
    src: path.join(root.dest, '/**/*.bundle.html'),
    dest: root.dest
  },
  markdown: {
    src: path.join(root.src, '/**/*.md'),
    dest: root.dest
  },
  browserSync: {
    option: {
      browser: 'google chrome',
      server: {
        baseDir: root.dest,
        directory: true
      }
    }
  },
  watch: {
    tasks: ['fonts', 'images', 'sass', 'js', 'html', 'markdown']
  }
};
