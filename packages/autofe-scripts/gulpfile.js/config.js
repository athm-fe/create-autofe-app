'use strict';

const join = require('path').posix.join;

const root = {
  src: 'src',
  dest: 'build',
};

module.exports = {
  src: root.src,
  dest: root.dest,
  clean: {
    dest: root.dest,
  },
  js: {
    src: join(root.src, '/**/*.old.js'),
    dest: root.dest,
  },
  html: {
    src: join(root.src, '/**/*.html'),
    dest: root.dest,
    exclude: `!${join(root.src, '/**/_*.html')}`,
  },
  htmlBundle: {
    src: join(root.dest, '/**/*.bundle.html'),
    dest: root.dest,
  },
  markdown: {
    src: join(root.src, '/**/*.md'),
    dest: root.dest,
  },
};
