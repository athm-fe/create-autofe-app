# 目录结构

通过前文的命令，Creator 创建了一个名为 `my-app` 的项目文件夹，其目录结构大体是这样的：

```{5,6,7,8,9,10,11,12,13,14,15}
my-app/
  README.md
  package.json
  node_modules/
  .gitignore
  .env
  .env.development
  .env.production
  .browserslistrc
  .eslintignore
  .eslintrc.js
  babel.config.js
  postcss.config.js
  creator.config.js
  tsconfig.json
  public/
    favicon.ico
  src/
    index/
      css/
        _base.scss
        _part1.scss
        _part2.scss
        _reset.scss
        main.scss
      img/
        bg.png
      js/
        vendor/
          es6-promise.auto.min.old.js
        index.entry.js
        main.old.js
      pic/
        01.jpg
      _part1.html
      _part2.html
      index.html
    demo/
      index.html
```

::: tip 约定优于配置
相信很多人都听到过约定优于配置的说法，我们也遵从这个原则，约定优先，在这个项目中，我们做了很多约定，但是总会有需要自定义配置的时候，因此行业内产生了很多标准化的配置文件，我们也采用了这些标准，也就是你前面看到的那一部分高亮的文件名。
:::

目前，你不需要关心这些高亮的文件，也不必修改它们。相信我，所有这些文件都是必要的，当你想自定义配置或者拓展功能的时候，会体会到它的好处。

只有 `src` 目录下的代码才会被 `autofe-scripts` 打包构建，因此你编写的所有代码都需要放在 该目录里。打包构建的文件会输出到 `build` 目录下。

`public` 下的文件会被直接拷贝到 `build` 目录下，不做任何额外处理。
