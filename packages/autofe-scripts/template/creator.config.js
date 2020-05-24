const path = require('path');

function resolve(relativePath) {
  return path.resolve(__dirname, relativePath);
}

module.exports = {
  externals: {
    jquery: 'jQuery',
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        // assets: resolve('src/assets'),
      },
    },
  },
  transpileDependencies: [
    '@auto/img-crop',
  ],
};
