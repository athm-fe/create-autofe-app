# Error Handling on gulp

目前，我们基本上都会使用 gulp 来完成 sass 、es6 、HTML 模版等的预编译工作。而且，我们还会监听这些文件的变化，实时编译源文件。但是 gulp 不会帮我们处理错误，假如你的源代码在编译时报错，gulp 会直接抛出错误，导致我们的监听任务中止运行。而且，这些错误信息往往没办法帮助我们排查错误。

**举例说明：**

*test.js*

```javascript
(function () {
  console.log('Hello world from old script.');
}());

var test = () => 'test';

console.log('-------- old script --------');

```

当使用 `gulp-uglify` 来压缩该文件时，报如下错误：

```
events.js:182
      throw er; // Unhandled 'error' event
      ^
Error
    at new JS_Parse_Error (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:1534:18)
    at js_error (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:1542:11)
    at croak (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2089:9)
    at token_error (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2097:9)
    at unexpected (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2103:9)
    at expr_atom (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2618:13)
    at maybe_unary (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2792:19)
    at expr_ops (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2827:24)
    at maybe_conditional (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2832:20)
    at maybe_assign (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2856:20)
    at expression (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2875:20)
    at expr_atom (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2608:26)
    at maybe_unary (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2792:19)
    at expr_ops (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2827:24)
    at maybe_conditional (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2832:20)
    at maybe_assign (eval at <anonymous> (/Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/node_modules/uglify-js/tools/node.js:28:1), <anonymous>:2856:20)
```

这些错误没有任何帮助，我们想要的是下面这样的：

```
Error in plugin 'js'
Message:
    /Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/template/src/index/js/main.old.js: SyntaxError: Unexpected token: punc ())
Details:
    fileName: /Users/jpuncle/Projects/fe/create-autofe-app/packages/autofe-scripts/template/src/index/js/main.old.js
    lineNumber: 5
```

通过如上错误信息，我们可以轻松发现报错的原因：代码第 5 行使用了箭头函数，但是 UglifyJS 不支持 ES6 语法的处理。

## 以 `gulp-sass` 为例

要想解决上面的问题，先让我们来了解下 gulp 是如何处理错误的：

1. 错误发生
2. 错误会往外抛出，直到产生 node uncaught exception
3. 从而导致 gulp 进程非正常结束。

在这个过程中，真正有帮助的错误信息可能被 gulp 吞掉，就像上文中描述的那样。我们希望在报错的时候，能够得到准确的、有帮助的错误信息，而且还希望能够保证我们的监听进程继续运行。

但是具体是怎么做呢？让我们一步步来：

### 拦截错误

大家都知道 gulp 是基于流的，也就是 stream ，不了解的可以看看 [substack/stream-handbook](https://github.com/substack/stream-handbook) 。要想处理 stream 的错误，可以监听其 `error` 事件来处理某一个 stream 过程中的错误。

可以这么写：

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

上面的代码，都表示处理 `sass()` 处理流中发生的错误，具体错误处理逻辑在 `sass.logError` 中，后文会详细讲到。

### 拦截错误的陷阱

看下下面的这种写法：

```javascript
.pipe(uglify())
.pipe(rename())
.pipe(gulp.dest('build'))
.on('error', fn)
```

但是要注意，stream 的 `pipe` 不会把 error 传递下去，所以这块代码时有问题的，它并不能处理 `uglify()` 发生的错误。所以需要在可能的每个地方加上处理：

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

其实，个人不喜欢用 `pump` 的这种写法，宁愿老老实实地多写几个 `on error` ，而且还能做到不同的错误采用不同的处理逻辑，多好。

### 处理错误

看一下 `sass.logError` 的源码：

```javascript
gulpSass.logError = function logError(error) {
  var message = new gutil.PluginError('sass', error.messageFormatted).toString();
  process.stderr.write(message + '\n');
  this.emit('end');
};
```

首先，这一部分代码把错误信息输出到了控制台，也就是 `process.stderr` ，其中 `gutil.PluginError` 是 gulp 官方提供的格式化错误信息的工具 API ，具体参见 [`gutil`](https://github.com/gulpjs/gulp-util)。

然后 `this.emit('end');` 表示正常结束当前流（不抛出错误），继续后续 `pipe` ，通过这种方式，就可以保证 gulp 进程继续执行，这样就不会中断我们的监听任务的执行。

到这里，`gulp-sass` 推荐的错误处理方法就讲到这里。

## `gulp-plumber` 一点都不好

`gulp-plumber` 小有名气，号称保证能够继续执行，解决了上文中说到的遇到错误就退出进程的问题。但是它有很严重的问题，会导致任务无法正常执行。因为其默认的处理行为是打印错误信息，漏掉了关键的 `this.emit('end');` 。导致 pipeline 无法继续，任务也就无法继续进行。不过庆幸的是，我们可以自定义错误处理逻辑：

```javascript
.pipe(plumber(function(error) {
  console.log(error.toString());
  this.emit('end');
}))
```

**所以，这个插件还是不要用了...**

## `create-autofe-app` 的需求

其实，我们的需求往往更加复杂，比如：

* 开发构建阶段，不终止 gulp 进程，并且提示友好的错误信息，比如：
  * 打印错误到控制台
  * 用 `gulp-notify` or `beeper` 之类的实现系统通知来显示错误
  * 将错误信息显示到页面
* 线上构建阶段，终止 gulp 进程，打印错误到控制台

## 详解错误处理

直接抛出，不推荐。(和 node uncaught exception 没有区别，只是报错信息略有不同)

```javascript
throw error;
```

继续执行，打印错误信息，**推荐**

```javascript
var message = new gutil.PluginError('sass', error.messageFormatted).toString();
process.stderr.write(message + '\n');

this.emit('end');
```

错误退出，打印错误信息，**推荐**
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

## 最佳实践

先抽取一个独立错误模块 `errorHandler.js` ：

```javascript
const notify = require('gulp-notify');
const isProd = process.env.NODE_ENV === 'production';

module.exports = function (error) {
  if (isProd) {
    // TODO 可以美化错误输出
    console.error(error);

    // 错误退出
    process.exit(1);
  } else {
    // TODO 可以美化错误输出
    console.error(error);

    // 发送系统通知
    notify.onError({
      title: 'Compile Error',
      message: error.message,
    });

    // 正常结束，继续后续执行
    this.emit('end');
  }
};
```

然后使用这个模块

```javascript
const errorHandler = require('./errorHandler');

gulp.task('styles', function() {
  return gulp.src('src')
    .pipe(sass())
    .on('error', errorHandler)
    .pipe(gulp.dest('build'));
});
```

## What's next

上文讲到了如何捕获 gulp 的错误，并且应当如何处理后续执行流程，基本来说，已经可以满足绝大数的需求了。美中不足的是，错误信息提示方式略显单薄，如果能够做到在开发时，将错误信息显示到页面就更好了，毕竟大多数时候我们不会去控制台查看是否有显示错误信息。

Ths.