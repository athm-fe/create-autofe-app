'use strict';

const path = require('path');

const root = {
  src: 'src',
  dest: 'build',
};

let chromeName = 'google chrome';

if (process.platform === 'darwin') {
  chromeName = 'google chrome';
} else if (process.platform === 'linux') {
  chromeName = 'google-chrome';
} else if (process.platform === 'win32') {
  chromeName = 'chrome';
}

module.exports = {
  src: root.src,
  dest: root.dest,
  clean: {
    dest: root.dest,
  },
  svg: {
    src: path.join(root.src, '/**/*.svg'),
    dest: path.join(root.dest),
  },
  js: {
    src: path.join(root.src, '/**/*.old.js'),
    dest: root.dest,
  },
  html: {
    src: path.join(root.src, '/**/*.html'),
    dest: root.dest,
    exclude: `!${path.join(root.src, '/**/_*.html')}`,
  },
  htmlBundle: {
    src: path.join(root.dest, '/**/*.bundle.html'),
    dest: root.dest,
  },
  markdown: {
    src: path.join(root.src, '/**/*.md'),
    dest: root.dest,
  },
  browserSync: {
    option: {
      open: "external",
      browser: chromeName,
      server: {
        baseDir: root.dest,
        directory: true,
      },
    },
  },
  watch: {
    tasks: ['svg', 'js', 'html', 'markdown'],
  },
};
