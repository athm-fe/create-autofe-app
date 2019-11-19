const gulp = require('gulp');
const config = require('../config');
const spritesmith = require('gulp.spritesmith');

var path = require('path');
const glob = require('glob');

var filePath = path.resolve(config.src);

var spriteDirArr = glob.sync('**/sprite', {
  cwd: filePath,
});

// console.log(spriteDirArr) // [ 'm/brand-series-spec/sprite', 'm/read-img/sprite' ]

gulp.task('sprite', function(cb) {
  spriteDirArr.forEach(function(folder) {
    var folder = path.join(filePath, folder);
    gulp
      .src(folder + '/*.png')
      .pipe(
        spritesmith({
          imgName: '../img/sprite.png',
          cssName: '../css/sprite.css',
          imgPath: '../img/sprite.png',
          padding: 6, // 小图之间的间距, 防止重叠
          cssTemplate: function(data) {
            var arr = [];
            data.sprites.forEach(function(sprite) {
              var rate = sprite.name.endsWith('@3x') ? 3 : sprite.name.endsWith('@2x') ? 2 : 1;
              arr.push(
                '.icon-' +
                  sprite.name.replace(/@\dx/, '') +
                  '{' +
                  "background-image: url('" +
                  sprite.escaped_image +
                  "');" +
                  'background-size:' +
                  parseFloat(sprite.px.total_width) / rate +
                  'px ' +
                  parseFloat(sprite.px.total_height) / rate +
                  'px;' +
                  'background-position: ' +
                  parseFloat(sprite.px.offset_x) / rate +
                  'px ' +
                  parseFloat(sprite.px.offset_y) / rate +
                  'px;' +
                  'width:' +
                  parseFloat(sprite.px.width) / rate +
                  'px;' +
                  'height:' +
                  parseFloat(sprite.px.height) / rate +
                  'px;' +
                  '}\n'
              );
            });
            return arr.join('');
          },
        })
      )
      .pipe(gulp.dest(folder.replace('/src/', '/build/')));
  });
  cb();
});
