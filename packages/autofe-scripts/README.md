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

`options.cwd`, Default: `process.cwd()`