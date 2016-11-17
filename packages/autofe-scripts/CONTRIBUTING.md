# Contributing

## 开发

```
npm install
npm link
```

接下来就可以在任何代码主目录执行如下命令
```
autofe-scripts start
```

## 关于 process.cwd()

如下代码都使用 `process.cwd()` 作为工作目录，所以节省了很多工作。

```javascript
gulp.src(globs[, options])
gulp.dest(path[, options])
gulp.watch(glob[, opts], tasks)
gulp.watch(glob[, opts, cb])
del(patterns, options)
render.nunjucks.configure([config.src], {watch: false});
browserSync.init({
  server: {
    baseDir: root.dest,
    directory: true
  }
})
rev.manifest({merge: true})
```