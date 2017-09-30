# Hot to handle error

针对 gulp 和 webpack 。

## 理想情况

* 开发构建阶段，不终止 gulp 进程，错误提示有如下几种
  1. 打印错误到控制台
  2. gulp-notify or beeper 之类的错误通知
  3. 错误信息显示到页面
* 线上构建阶段，终止 gulp 进程，打印错误到控制台

## gulp 如何处理错误

当发生错误时，如果不进行处理，错误会往外抛出，产生 node uncaught exception ，从而导致 gulp 进程非正常结束。

我们在开发的时候，希望能够保证 gulp 进程继续运行。

你可能看到过这个：

```javascript
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('build'))
```

也有这么写的：

```javascript
.pipe(sass())
.on('error', sass.logError)
.pipe(gulp.dest('build'))
```

但是具体是怎么回事儿呢？让我们一步步来解释：

### 如何拦截错误

```javascript
.pipe(uglify())
.pipe(rename())
.pipe(gulp.dest('build'))
.on('error', fn)
```

但是 stream 的 pipe 不会把 error 传递下去，所以需要在可能的每个地方加上处理：

```javascript
.pipe(uglify())
.on('error', fn)
.pipe(rename())
.pipe(gulp.dest('build'))
.on('error', fn)
```

有人觉得这样写太麻烦了，所以开发了一个 `pump` 模块，当发生错误时，`cb` 的第一个参数不为 `null` ，`pump` 还能解决 dest stream 关闭后 source stream 没有关闭的问题。

```javascript
pump([
  gulp.src(...),
  uglify(),
  gulp.dest(...)
], cb)
```

其实，个人不愿意用 `pump` 的这种写法，宁愿老老实实地多写几个 `on error` ，而且还能做到不同的错误处理逻辑，多好。

### 如何处理错误

直接抛出，不推荐。(和 node uncaught exception 没有区别，只是报错信息略有不同)
```javascript
throw error;
```

继续执行，打印错误信息，推荐
```javascript
var message = new gutil.PluginError('sass', error.messageFormatted).toString();
process.stderr.write(message + '\n');
this.emit('end');
```

错误退出，打印错误信息，推荐
```javascript
var message = new gutil.PluginError('sass', error.messageFormatted).toString();
process.stderr.write(message + '\n');
process.exit(1);
```

正常退出，打印错误信息
```javascript
var message = new gutil.PluginError('sass', error.messageFormatted).toString();
process.stderr.write(message + '\n');
process.exit(0);
```

### `gulp-plumber` 的处理方法

`gulp-plumber` 号称保证能够继续执行，解决了上文中说到的遇到错误就退出进程的问题。但是它有很严重的问题，会导致任务无法正常执行。因为其默认的处理行为是打印错误信息，漏掉了关键的 `this.emit('end');` 。导致 pipeline 无法继续，任务也就无法继续进行。不过庆幸的是，我们可以自定义错误处理逻辑：

```javascript
.pipe(plumber(function(error) {
  console.log(error.toString());
  this.emit('end');
}))
```

如果想要区分开发和线上，可以这么写：
```javascript
.pipe(uglify())
.pipe(gulpif(!isProd, plumber(function(error) {
  console.log(error.toString());
  this.emit('end');
})))
```

### gulp 处理错误总结

先抽取一个独立错误模块 `errorHandler.js` ：

```javascript
const notify = require('gulp-notify');

module.exports = function (error) {
  if (isProd) {
    console.error(error);
    process.exit(1);
  } else {
    console.error(error);

    notify.onError({
      title: 'Compile Error',
      message: error.message,
    });

    this.emit('end');
  }
};
```

然后使用这个模块

```javascript
const errorHandler = require('./errorHandler);

gulp.task('styles', function() {
  return gulp.src('src')
    .pipe(plumber({
      errorHandler: errorHandler,
    }))
    .pipe(sass())
    .pipe(gulp.dest('build'));
});
```

## webpack 处理错误

未完待续。