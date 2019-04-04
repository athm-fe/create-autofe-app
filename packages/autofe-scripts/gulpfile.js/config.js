'use strict';

const path = require('path');

const paths = require('../config/paths');
const proxy = require('http-proxy-middleware');
const appConfig = require(paths.appConfig);

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

const browserSyncOption = {
  browser: chromeName,
  server: {
    baseDir: root.dest,
    directory: true,
  },
};

if (appConfig.browserSync) {
  const middleProxy = [];
  for (const key in appConfig.browserSync.proxy) {
    if (appConfig.browserSync.proxy.hasOwnProperty(key)) {
      middleProxy.push(proxy(key, appConfig.browserSync.proxy[key]));
    }
  }
  browserSyncOption.server.middleware = middleProxy;
}

module.exports = {
  src: root.src,
  dest: root.dest,
  clean: {
    dest: root.dest,
  },
  copy: {
    src: path.join(root.src, '/**/*.{mp3,mp4,ogg,flv,swf,ico,cur,json,txt}'),
    dest: path.join(root.dest),
  },
  fonts: {
    src: path.join(root.src, '/**/*.{eot,ttf,woff,woff2}'), // svg 交由 images 压缩
    dest: path.join(root.dest),
  },
  images: {
    src: path.join(root.src, '/**/*.{png,jpg,gif,svg}'),
    dest: path.join(root.dest),
  },
  sass: {
    src: path.join(root.src, '/**/*.{scss,css}'),
    dest: root.dest,
  },
  postcssAssets: {
    option: {
      basePath: root.src,
      baseUrl: '/', // TODO config http://x.autoimg.cn/www/
      relative: true,
      cachebuster: false,
    },
  },
  autoprefixer: {
    option: {
      browsers: [
        // defaults
        // '> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead',
        '> 0.2%', 'last 2 versions', 'Firefox ESR', 'not dead',
        'iOS >= 8',
        'Android >= 4.0',
        'Explorer >= 9'
      ],
    },
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
    option: browserSyncOption,
  },
  webpack: {
    src: [path.join(root.src, '/**/*.js'), `!${path.join(root.src, '/**/*.old.js')}`],
  },
  watch: {
    tasks: ['copy', 'fonts', 'images', 'sass', 'js', 'webpack', 'html', 'markdown'],
  },
};
