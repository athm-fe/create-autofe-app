(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{224:function(e,t,r){"use strict";r.r(t);var a=r(0),_=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[e._v("#")]),e._v(" 介绍")]),e._v(" "),t("blockquote",[t("p",[e._v("Thanks to "),t("a",{attrs:{href:"https://create-react-app.dev/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Create React App"),t("OutboundLink")],1),e._v(" and "),t("a",{attrs:{href:"https://cli.vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue CLI"),t("OutboundLink")],1)])]),e._v(" "),t("p",[e._v("Create AutoFE App 简称为 Creator，是一套基于 Webpack 搭建的前端静态页面开发工具，提供：")]),e._v(" "),t("ul",[t("li",[e._v("通过 "),t("code",[e._v("create-autofe-app")]),e._v(" 实现的"),t("s",[e._v("交互式的")]),e._v("项目脚手架。")]),e._v(" "),t("li",[t("s",[e._v("通过 "),t("code",[e._v("autofe-scripts-global")]),e._v(" 实现的零配置原型开发。")])]),e._v(" "),t("li",[e._v("一个运行时依赖 ("),t("code",[e._v("autofe-scripts")]),e._v(")，该依赖：\n"),t("ul",[t("li",[e._v("可升级；")]),e._v(" "),t("li",[e._v("基于 Webpack 构建，并带有合理的默认配置；")]),e._v(" "),t("li",[e._v("可以通过项目内的配置文件进行配置；")]),e._v(" "),t("li",[t("s",[e._v("可以通过插件进行扩展。")])])])]),e._v(" "),t("li",[t("s",[e._v("一个丰富的官方插件集合，")]),e._v(" 集成了前端生态中最好的工具。")]),e._v(" "),t("li",[t("s",[e._v("一套完全图形化的创建和管理项目的用户界面。")])])]),e._v(" "),t("p",[e._v("Creator 支持 macOS、Windows 以及 Linux。"),t("br"),e._v("\n如果发现什么问题，请"),t("a",{attrs:{href:"https://github.com/athm-fe/create-autofe-app/issues/new",target:"_blank",rel:"noopener noreferrer"}},[e._v("反馈"),t("OutboundLink")],1),e._v("给我们。")]),e._v(" "),t("h2",{attrs:{id:"功能支持"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#功能支持"}},[e._v("#")]),e._v(" 功能支持")]),e._v(" "),t("ul",[t("li",[e._v("使用 "),t("s",[t("a",{attrs:{href:"http://browsersync.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Browsersync"),t("OutboundLink")],1)]),e._v(" WebpackDevServer 开启本地服务器\n"),t("ul",[t("li",[e._v("支持文件修改时自动刷新浏览器")]),e._v(" "),t("li",[e._v("支持目录浏览")]),e._v(" "),t("li",[e._v("自动打开浏览器 Chrome")])])]),e._v(" "),t("li",[e._v("使用 "),t("a",{attrs:{href:"https://mozilla.github.io/nunjucks/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Nunjucks"),t("OutboundLink")],1),e._v(" 模版引擎来写 HTML")]),e._v(" "),t("li",[e._v("使用 Sass 写 CSS")]),e._v(" "),t("li",[e._v("使用 PostCSS 支持 Autoprefixer，不再需要自己处理 "),t("code",[e._v("-webkit-")]),e._v(" 等浏览器前缀。")]),e._v(" "),t("li",[e._v("使用 Babel 处理 ES6+")]),e._v(" "),t("li",[e._v("使用 ESLint 检查 ES6+")]),e._v(" "),t("li",[e._v("支持 TypeScript")]),e._v(" "),t("li",[e._v("使用 Markdown 写文档，并生成 HTML 方便查看")]),e._v(" "),t("li",[e._v("开发环境支持 SourceMap")]),e._v(" "),t("li",[e._v("压缩前端资源，包括 CSS、JS 以及 SVG（由于压缩图片影响构建速度，暂不支持）。")])]),e._v(" "),t("p",[e._v("所有这些功能不需要你耗费精力自行配置，Creator 帮你搞定一切。")]),e._v(" "),t("h2",{attrs:{id:"该系统的组件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#该系统的组件"}},[e._v("#")]),e._v(" 该系统的组件")]),e._v(" "),t("p",[e._v("Creator 有几个独立的部分——如果你看到了我们的"),t("a",{attrs:{href:"https://github.com/athm-fe/create-autofe-app/tree/master/packages",target:"_blank",rel:"noopener noreferrer"}},[e._v("源代码"),t("OutboundLink")],1),e._v("，你会发现这个仓库里同时管理了多个单独发布的包。")]),e._v(" "),t("h3",{attrs:{id:"create-autofe-app"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#create-autofe-app"}},[e._v("#")]),e._v(" create-autofe-app")]),e._v(" "),t("p",[t("code",[e._v("create-autofe-app")]),e._v(" 是一个全局安装的 npm 包，提供了终端里的 "),t("code",[e._v("create-autofe-app")]),e._v(" 命令。它可以通过 "),t("code",[e._v("create-autofe-app my-app")]),e._v(" 快速搭建一个新项目。")]),e._v(" "),t("h3",{attrs:{id:"autofe-scripts"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#autofe-scripts"}},[e._v("#")]),e._v(" autofe-scripts")]),e._v(" "),t("p",[t("code",[e._v("autofe-scripts")]),e._v(" 是一个开发环境依赖。它是一个 npm 包，局部安装在每个 "),t("code",[e._v("create-autofe-app")]),e._v(" 创建的项目中。")]),e._v(" "),t("p",[e._v("它是构建于 "),t("a",{attrs:{href:"http://webpack.js.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack"),t("OutboundLink")],1),e._v(" 之上的。它包含了：")]),e._v(" "),t("ul",[t("li",[e._v("一个针对绝大部分应用优化过的内部的 webpack 配置；")]),e._v(" "),t("li",[e._v("项目内部的 "),t("code",[e._v("autofe-scripts")]),e._v(" 命令，提供 "),t("code",[e._v("start")]),e._v(" 和 "),t("code",[e._v("build")]),e._v(" 命令。")])]),e._v(" "),t("h2",{attrs:{id:"贡献代码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#贡献代码"}},[e._v("#")]),e._v(" 贡献代码")]),e._v(" "),t("p",[e._v("We'd love to have your helping hand on "),t("code",[e._v("create-autofe-app")]),e._v("! See "),t("a",{attrs:{href:"https://github.com/athm-fe/create-autofe-app/blob/master/CONTRIBUTING.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("CONTRIBUTING.md"),t("OutboundLink")],1),e._v(" for more information on what we're looking for and how to get started.")])])}),[],!1,null,null,null);t.default=_.exports}}]);