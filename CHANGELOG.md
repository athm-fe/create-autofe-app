## 0.6.2

1. 修复新增文件时，无法自动刷新浏览器的问题
2. 新增将特殊类型文件复制到 build 目录的功能，目前有 mp3,mp4,ogg,flv,swf,ico,cur,json,txt 。

## 0.6.1

1. 修复 windows 平台下无法自动打开 Chrome 浏览器的问题

## 使用 gulp.spritesmith 添加自动雪碧图

1. 添加 sprite task 文件：autofe-scripts/gulpfile.js/tasks/sprite.js
2. default.js 和 build.js 文件中，插入 sprite 任务
3. config.js 添加 sprite 节点
