(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{238:function(t,e,a){"use strict";a.r(e);var s=a(0),r=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"更新版本"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#更新版本"}},[t._v("#")]),t._v(" 更新版本")]),t._v(" "),e("p",[t._v("Creator 分成两个包：")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("create-autofe-app")]),t._v(" 是一个全局命令行工具，可以用来创建项目，之后就基本用不到。")]),t._v(" "),e("li",[e("code",[t._v("autofe-scripts")]),t._v(" 是上面创建的项目在开发过程中所需要的一个运行时依赖包，一般情况下，也只需要这个包就够了。")])]),t._v(" "),e("h2",{attrs:{id:"升级-create-autofe-app"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级-create-autofe-app"}},[t._v("#")]),t._v(" 升级 create-autofe-app")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("提示")]),t._v(" "),e("p",[t._v("关于 create-autofe-app 的安装和使用请移步"),e("a",{attrs:{href:"./getting-started"}},[t._v("快速开始")]),t._v("。")])]),t._v(" "),e("p",[t._v("前面讲到过，如果想要创建项目，执行如下命令即可：")]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[t._v("npx create-autofe-app my-app\n")])])]),e("p",[t._v("当运行 "),e("code",[t._v("create-autofe-app")]),t._v(" 来创建新项目的时候，它总是会去 npm 下载 "),e("code",[t._v("autofe-scripts@latest")]),t._v("，所以你能够自动获得最新发布的功能或者优化。")]),t._v(" "),e("h2",{attrs:{id:"升级-autofe-scripts"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级-autofe-scripts"}},[t._v("#")]),t._v(" 升级 autofe-scripts")]),t._v(" "),e("p",[t._v("如果你已经有了一个项目，并且想把该项目的 "),e("code",[t._v("autofe-scripts")]),t._v(" 升级到新版本。请先"),e("a",{attrs:{href:"https://github.com/athm-fe/create-autofe-app/blob/master/CHANGELOG.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("打开版本修改日志"),e("OutboundLink")],1),t._v("，找到你的当前版本（在 "),e("code",[t._v("package.json")]),t._v(" 可以找到）和新版本之间的差异。有可能新版本和老版本不兼容，需要你按照 "),e("code",[t._v("CHANGELOG.md")]),t._v(" 的说明来修改你的代码。")]),t._v(" "),e("p",[t._v("但是我们会尽量保证 "),e("code",[t._v("autofe-scripts")]),t._v(" 新老版本之间的兼容，做到不需要你修改代码，或者仅仅是修改少量的代码，即可迁移成功。")]),t._v(" "),e("p",[t._v("所以，大多数情况下，执行如下命令即可：")]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" i --save-dev autofe-scripts@latest\n")])])]),e("p",[t._v("该命令会自动产生如下改动：")]),t._v(" "),e("div",{staticClass:"language-diff extra-class"},[e("pre",{pre:!0,attrs:{class:"language-diff"}},[e("code",[t._v("// package.json\n{\n"),e("span",{pre:!0,attrs:{class:"token unchanged"}},[e("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),e("span",{pre:!0,attrs:{class:"token line"}},[t._v(' "devDependencies": {\n')])]),e("span",{pre:!0,attrs:{class:"token deleted-sign deleted"}},[e("span",{pre:!0,attrs:{class:"token prefix deleted"}},[t._v("-")]),e("span",{pre:!0,attrs:{class:"token line"}},[t._v('    "autofe-scripts": "^1.2.0",\n')])]),e("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[e("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),e("span",{pre:!0,attrs:{class:"token line"}},[t._v('    "autofe-scripts": "^1.3.4",\n')])]),e("span",{pre:!0,attrs:{class:"token unchanged"}},[e("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),e("span",{pre:!0,attrs:{class:"token line"}},[t._v(" },\n")])]),t._v("}\n")])])]),e("p",[t._v("如果想安装指定版本，只要手动修改 "),e("code",[t._v("package.json")]),t._v(" 文件里的 "),e("code",[t._v("autofe-scripts")]),t._v(" 的版本号，然后重新 "),e("code",[t._v("npm install")]),t._v(" 即可。")]),t._v(" "),e("h2",{attrs:{id:"重大变更"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重大变更"}},[t._v("#")]),t._v(" 重大变更")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("autofe-script@1.3.4")]),t._v(" 主要基于 Webpack 实现，仅残留部分 Gulp 实现。极大增强 CSS 能力，并增强了配置能力。\n"),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/athm-fe/create-autofe-app/blob/master/doc/how-to-migrate-to-v1.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("如何迁移到 autofe-scripts v1 版本"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/athm-fe/create-autofe-app/blob/master/doc/how-to-ts.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("如果手动支持 TypeScript"),e("OutboundLink")],1)])])]),t._v(" "),e("li",[e("code",[t._v("autofe-script@0.x")]),t._v(" 主要基于 Gulp 实现，仅仅 ES6+ 部分使用 Webpack 实现")])]),t._v(" "),e("p",[t._v("详情请参考"),e("a",{attrs:{href:"https://github.com/athm-fe/create-autofe-app/blob/master/CHANGELOG.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("更新记录"),e("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=r.exports}}]);