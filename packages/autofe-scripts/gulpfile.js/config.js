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
  copy: {
    src: path.join(root.src, '/**/*.{mp3,mp4,ogg,flv,swf,ico,cur,json,txt}'),
    dest: path.join(root.dest),
  },
  fonts: {
    src: path.join(root.src, '/**/*.{eot,svg,ttf,woff,woff2}'),
    dest: path.join(root.dest),
  },
  images: {
    src: path.join(root.src, '/**/*.{png,jpg,gif,svg}'),
    dest: path.join(root.dest),
    imagemin: {
      progressive: true,
      svgoPlugins: [{ removeViewBox: false, cleanupIDs: false }],
    },
  },
  sass: {
    src: path.join(root.src, '/**/*.{scss,css}'),
    dest: root.dest,
    option: {},
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
      browsers: ['ios >= 6', 'android >= 4.0', 'Explorer >= 6', 'Firefox >= 20', 'Opera > 10'],
    },
  },
  js: {
    src: path.join(root.src, '/**/*.old.js'),
    dest: root.dest,
  },
  oldJS: {
    src: path.join(root.src, '/**/*.js'),
    dest: root.src,
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
      browser: chromeName,
      server: {
        baseDir: root.dest,
        directory: true,
      },
    },
  },
  watch: {
    tasks: ['copy', 'fonts', 'images', 'sass', 'js', 'html', 'markdown'],
  },
};
