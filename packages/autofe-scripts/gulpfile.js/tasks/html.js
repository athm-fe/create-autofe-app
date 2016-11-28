var gulp = require('gulp');
var config = require('../config');
var browserSync = require('../lib/browserSync');
var render = require('gulp-nunjucks-render');
var data = require('gulp-data');
var path = require('path');
var gutil = require('gulp-util');

var manageEnvironment = function(env) {
  // IncludePrettyExtension
  function IncludePrettyExtension() {
    var tagName = 'includePretty';
    this.tags = [tagName];
    this.parse = function (parse, nodes, lexer) {
      var tag = parse.peekToken();
      if (!parse.skipSymbol(tagName)) {
        parse.fail('parseTemplateRef: expected ' + tagName);
      }

      var args = parse.parseSignature(null, true);

      // var node = new nodes.Include(tag.lineno, tag.colno);
      // node.template = parse.parseExpression();

      parse.advanceAfterBlockEnd(tag.value);

      var indentValue = new nodes.Output(0, 0, [new nodes.TemplateData(0, 0, tag.colno)]);

      var node = new nodes.CallExtension(this, 'run', args, [indentValue]);

      return node;
    };
    this.run = function (context, url, indentValue) {
      var output = '';
      var indentWidth = indentValue() - 1;
      var indentFilter = env.getFilter('indent');
      var trimFilter = env.getFilter('trim');
      var safeFilter = env.getFilter('safe');

      try {
        var tmpl = env.getTemplate(url);
        var result = tmpl.render(context.getVariables());
        if (indentWidth > 0) {
          result = indentFilter(result, indentWidth);
        }
        result = trimFilter(result);
        output = result;
      } catch (e) {
        throw e;
      }

      return safeFilter(output);
    };
  }
  env.addExtension('IncludePrettyExtension', new IncludePrettyExtension());

  // Filter: assets
  env.addFilter('assets', function (assetpath) {
    var url = path.join(this.ctx.__ctx_file.prefix || '', assetpath);
    return url;
  });
};

var options = {
  path: [config.src],
  manageEnv: manageEnvironment
};

render.logError = function (error) {
  var message = new gutil.PluginError('nunjucks', error).toString();
  process.stderr.write(message + '\n');
  this.emit('end');
};


var htmlTask = function () {
  return gulp.src([config.html.src, config.html.exclude])
    .pipe(data(function (file) {
      var obj = {
        path: file.path,
        relative: file.relative,
        base: file.base,
        prefix: path.relative(path.resolve(file.path, '..'), file.base)
      };
      return {
        __ctx_file: obj
      };
    }))
    .pipe(render(options).on('error', render.logError))
    .pipe(gulp.dest(config.html.dest))
    .pipe(browserSync.stream());
};

gulp.task('html', htmlTask);
module.exports = htmlTask;
