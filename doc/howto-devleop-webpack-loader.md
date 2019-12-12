# 如何开发自己的 Webpack Loader

流程：从右向左
pitch：从左向右

0. function loader(content, sourceMap) {}
1. loaderUtils.getOptions(this)
2. validateOptions(), options.json
3. this.rootContext
4. this.resourcePath
5. loaderUtils.interpolateName()
6. __webpack_public_path__
7. this.emitFile(outputPath, content);
8. export default publicPath
9. module.exports = publicPath

异步方式 1
const callback = this.async();
callback(new Error());
callback(null, content);
callback(null, content, map);

添加到依赖树，可以提供给 watch 使用
this.addDependency()

生成 sourcemap
1. postcss
2. sass
3. babel
4. source-map 库

同步
this.emitWarning()
this.emitError()
return content;