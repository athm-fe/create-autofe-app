'use strict';

const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');
const render = require('gulp-nunjucks-render');
const data = require('gulp-data');
const path = require('path');
const gutil = require('gulp-util');

const isProd = process.env.NODE_ENV === 'production';

const manageEnvironment = function (env) {
  // IncludePrettyExtension
  function IncludePrettyExtension() {
    const tagName = 'includePretty';
    this.tags = [tagName];
    this.parse = function (parse, nodes) {
      const tag = parse.peekToken();
      if (!parse.skipSymbol(tagName)) {
        parse.fail(`parseTemplateRef: expected ${tagName}`);
      }

      const args = parse.parseSignature(null, true);

      // var node = new nodes.Include(tag.lineno, tag.colno);
      // node.template = parse.parseExpression();

      parse.advanceAfterBlockEnd(tag.value);

      const indentValue = new nodes.Output(0, 0, [new nodes.TemplateData(0, 0, tag.colno)]);

      const node = new nodes.CallExtension(this, 'run', args, [indentValue]);

      return node;
    };
    this.run = function (context, url, indentValue) {
      let output = '';
      const indentWidth = indentValue() - 1;
      const indentFilter = env.getFilter('indent');
      const trimFilter = env.getFilter('trim');
      const safeFilter = env.getFilter('safe');

      try {
        const tmpl = env.getTemplate(url);
        let result = tmpl.render(context.getVariables());
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
    const url = path.join(this.ctx.__ctx_file.prefix || '', assetpath);
    return url;
  });
};

const options = {
  path: [config.src],
  manageEnv: manageEnvironment,
};

const htmlTask = function () {
  return gulp.src([config.html.src, config.html.exclude])
    .pipe(data((file) => {
      const obj = {
        path: file.path,
        relative: file.relative,
        base: file.base,
        prefix: path.relative(path.resolve(file.path, '..'), file.base),
      };
      return {
        __ctx_file: obj,
      };
    }))
    .pipe(render(options))
    .on('error', function (error) {
      const message = new gutil.PluginError('nunjucks', error).toString();
      process.stderr.write(`${message}\n`);

      if (isProd) {
        process.exit(1);
      } else {
        this.emit('end');
      }
    })
    .pipe(gulp.dest(config.html.dest))
    .on('end', browserSync.reload);
};

gulp.task('html', htmlTask);
module.exports = htmlTask;
