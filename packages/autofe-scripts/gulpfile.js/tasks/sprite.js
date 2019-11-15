const gulp = require('gulp');
const config = require('../config');
const spritesmith = require('gulp.spritesmith');
const browserSync = require('../lib/browserSync');

const isProd = process.env.NODE_ENV === 'production';

var fs = require('fs');
var path = require('path');

var filePath = path.resolve(config.src);

var spriteDirArr = [];
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  var files = fs.readdirSync(filePath);
  //遍历读取到的文件列表
  files.forEach(function(filename) {
    //获取当前文件的绝对路径
    var filedir = path.join(filePath, filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    var stats = fs.statSync(filedir);
    var isDir = stats.isDirectory(); //是文件夹
    if (isDir) {
      if (filedir.endsWith('/sprite')) {
        spriteDirArr.push(filedir);
      } else {
        fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
    }
  });
}

gulp.task('sprite', function(cb) {
  fileDisplay(filePath);
  spriteDirArr.forEach(function(folder) {
    // var cdnDir = '//s.autoimg.cn/2sc/2sc_new/sprites/'+folder.match(/src\/(\S*\/)sprite/)[1];
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
