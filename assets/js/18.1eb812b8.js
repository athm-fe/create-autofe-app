(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{227:function(s,t,a){"use strict";a.r(t);var n=a(0),r=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"css"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#css"}},[s._v("#")]),s._v(" CSS")]),s._v(" "),t("p",[s._v("Creator 支持 "),t("a",{attrs:{href:"http://postcss.org/",target:"_blank",rel:"noopener noreferrer"}},[s._v("PostCSS"),t("OutboundLink")],1),s._v("、"),t("a",{attrs:{href:"https://sass-lang.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Sass"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("h2",{attrs:{id:"编写样式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#编写样式"}},[s._v("#")]),s._v(" 编写样式")]),s._v(" "),t("p",[s._v("先来一个最简单的：")]),s._v(" "),t("p",[t("code",[s._v("_btn.scss")])]),s._v(" "),t("div",{staticClass:"language-scss extra-class"},[t("pre",{pre:!0,attrs:{class:"language-scss"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn ")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" inline-block"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[t("code",[s._v("main.scss")])]),s._v(" "),t("div",{staticClass:"language-scss extra-class"},[t("pre",{pre:!0,attrs:{class:"language-scss"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"btn"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".some ")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" red"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("编译后，只会产生 "),t("code",[s._v("main.css")]),s._v(" 。")]),s._v(" "),t("p",[t("code",[s._v("main.css")])]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" inline-block"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".some")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" red"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("h2",{attrs:{id:"路径能力"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#路径能力"}},[s._v("#")]),s._v(" 路径能力")]),s._v(" "),t("p",[s._v("Creator 可以给大家带来更加强大、灵活的路径能力。")]),s._v(" "),t("h3",{attrs:{id:"npm-依赖"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#npm-依赖"}},[s._v("#")]),s._v(" npm 依赖")]),s._v(" "),t("p",[s._v("我们可以使用开源的 "),t("a",{attrs:{href:"https://necolas.github.io/normalize.css/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Normalize.css"),t("OutboundLink")],1),s._v("，还可以开发自己的 CSS 包，发布到官方 NPM 或者公司的私有 NPM。")]),s._v(" "),t("p",[s._v("以 "),t("code",[s._v("normalize.css")]),s._v(" 为例，在你的项目中安装你想要的包：")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("npm install normalize.css\n")])])]),t("p",[s._v("然后，在你的样式文件中引用该样式")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"~normalize.css"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")])]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token selector"}},[s._v("body")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" #333"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("h3",{attrs:{id:"别名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#别名"}},[s._v("#")]),s._v(" 别名 @")]),s._v(" "),t("p",[s._v("你可能遇到过如下的代码，眼睛累，脑壳还疼。")]),s._v(" "),t("div",{staticClass:"language-scss extra-class"},[t("pre",{pre:!0,attrs:{class:"language-scss"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"../../../../../common/reset.css"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),t("p",[s._v("而我们支持如下方式：")]),s._v(" "),t("div",{staticClass:"language-scss extra-class"},[t("pre",{pre:!0,attrs:{class:"language-scss"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"@/common/reset.css"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// or")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"~@/common/reset.css"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".test-root-alias ")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("width")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 320px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("height")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 240px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// working")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token url"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"~@/index/img/car.jpg"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" no-repeat"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// not working")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// background: url("@/index/img/car.jpg") no-repeat;')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[s._v("WARNING")]),s._v(" "),t("p",[s._v("CSS 中图片路径使用 "),t("code",[s._v("@")]),s._v(" 别名时，要添加 "),t("code",[s._v("~")]),s._v(" 前缀。")])]),s._v(" "),t("h3",{attrs:{id:"sass-中引用-css"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sass-中引用-css"}},[s._v("#")]),s._v(" Sass 中引用 CSS")]),s._v(" "),t("p",[s._v("Sass 中引用 CSS 时要特别小心如下代码：")]),s._v(" "),t("div",{staticClass:"language-scss extra-class"},[t("pre",{pre:!0,attrs:{class:"language-scss"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'nest/_test_nest2.css'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),t("p",[s._v("因为 Sass 的 "),t("code",[s._v("@import")]),s._v(" 遇到明确指定 "),t("code",[s._v(".css")]),s._v(" 时，并不会导入该文件（参考"),t("a",{attrs:{href:"https://sass-lang.com/documentation/at-rules/import#plain-css-imports",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方文档"),t("OutboundLink")],1),s._v("），而是编译为如下代码：")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token url"}},[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("nest/_test_nest2.css"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")])]),s._v("\n")])])]),t("p",[s._v("这时候，该样式文件实际上是被 "),t("code",[s._v("css-loader")]),s._v(" 导入的，如果存在文件目录嵌套时，就有可能会出现打包失败的情况，有如下两种解决方式：")]),s._v(" "),t("div",{staticClass:"language-scss extra-class"},[t("pre",{pre:!0,attrs:{class:"language-scss"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 去掉 .css 后缀")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'nest/_test_nest2'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'nest/test_nest2'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// or")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 使用别名")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'~@/path/to/nest/_test_nest2.css'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),t("h3",{attrs:{id:"支持-sass-图片相对路径"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#支持-sass-图片相对路径"}},[s._v("#")]),s._v(" 支持 Sass 图片相对路径")]),s._v(" "),t("p",[s._v("假设你的目录结构是这样的：")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("+ main.scss\n+ sub/\n  + _sub.scss\n  + sub.png\n")])])]),t("p",[s._v("代码内容是这样的：")]),s._v(" "),t("p",[t("code",[s._v("main.scss")])]),s._v(" "),t("div",{staticClass:"language-scss extra-class"},[t("pre",{pre:!0,attrs:{class:"language-scss"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("@import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sub/sub"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),t("p",[t("code",[s._v("sub/_sub.scss")])]),s._v(" "),t("div",{staticClass:"language-scss extra-class"},[t("pre",{pre:!0,attrs:{class:"language-scss"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".sub ")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token url"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./sub.png"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" no-repeat"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("输出结果是：")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".sub")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token url"}},[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string url"}},[s._v('"./sub/sub.png"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),s._v(" no-repeat"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("h2",{attrs:{id:"图片内嵌"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#图片内嵌"}},[s._v("#")]),s._v(" 图片内嵌")]),s._v(" "),t("p",[s._v("有时候希望将样式里引用的背景图内嵌到样式里，支持如下两种方式：")]),s._v(" "),t("ul",[t("li",[s._v("小于 1kb 自动内嵌")]),s._v(" "),t("li",[s._v("通过自定义参数 "),t("code",[s._v("datauri")]),s._v(" 直接表示内嵌")])]),s._v(" "),t("div",{staticClass:"language-scss extra-class"},[t("pre",{pre:!0,attrs:{class:"language-scss"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".test-inline ")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token url"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"../img/car.jpg?datauri"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" no-repeat"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token url"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"../img/car.svg?datauri"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" no-repeat"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("h2",{attrs:{id:"自动添加版本号"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自动添加版本号"}},[s._v("#")]),s._v(" 自动添加版本号")]),s._v(" "),t("p",[s._v("为了解决 CDN 缓存的问题，当执行生产环境构建的时候，会自动给 CSS 中的图片路径添加版本号：")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".test-md5")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token url"}},[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("../img/bg.png?6350fa96"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),s._v(" no-repeat"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("该版本号是根据图片文件生成的 MD5，当文件变化时，该版本号才会发生变化。")]),s._v(" "),t("h2",{attrs:{id:"autoprefixer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#autoprefixer"}},[s._v("#")]),s._v(" Autoprefixer")]),s._v(" "),t("p",[s._v("有了 Autoprefixer，你不再需要手动写 "),t("code",[s._v("-webkit-")]),s._v(" ，"),t("code",[s._v("-ms-")]),s._v(" ，"),t("code",[s._v("-moz-")]),s._v(" 等浏览器厂商前缀，也就不再需要使用 Sass 之类的语言来编写一堆 mixins。")]),s._v(" "),t("p",[s._v("加浏览器前缀时，我们只考虑下面所列的浏览器：")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("browsers: [\n  '> 0.2%', 'last 2 versions', 'Firefox ESR', 'not dead',\n  'iOS >= 9',\n  'Android >= 4.4',\n  'Explorer >= 9'\n]\n")])])]),t("p",[s._v("解释一下，"),t("code",[s._v("> 0.2%")]),s._v(" 表示流行使用的浏览器版本，但是由于新发布的版本可能暂时未达到使用率，所以加上 "),t("code",[s._v("last 2 versions")]),s._v(" 以及 "),t("code",[s._v("Firefox ESR")]),s._v("，另外前面的条件可能包含已经 "),t("code",[s._v("dead")]),s._v(" 的浏览器版本，我们不打算考虑这些浏览器，所以使用 "),t("code",[s._v("not dead")]),s._v(" 去掉这些浏览器版本。最后明确指定我们会进行测试的浏览器最低要求，即 "),t("code",[s._v("iOS >= 9, Android >= 4.4, Explorer >= 9")]),s._v(" 。")]),s._v(" "),t("p",[s._v("你可以使用 "),t("a",{attrs:{href:"https://browserl.ist/?q=%3E+0.2%25%2C+last+2+versions%2C+Firefox+ESR%2C+not+dead%2C+iOS+%3E%3D+9%2C+Android+%3E%3D+4.4%2C+Explorer+%3E%3D+9",target:"_blank",rel:"noopener noreferrer"}},[s._v("browser.list"),t("OutboundLink")],1),s._v(" 来查看我们的规则包含了哪些浏览器版本。")]),s._v(" "),t("h3",{attrs:{id:"简单的例子"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#简单的例子"}},[s._v("#")]),s._v(" 简单的例子")]),s._v(" "),t("p",[s._v("原来你可能这么写：")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn .icon")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-webkit-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-ms-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n       "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-o-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("现在这么写就成：")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn .icon")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("h3",{attrs:{id:"自动去掉无用的前缀"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自动去掉无用的前缀"}},[s._v("#")]),s._v(" 自动去掉无用的前缀")]),s._v(" "),t("p",[s._v("Autoprefixer 还会去掉老旧的前缀，比如 "),t("code",[s._v("border-radius")]),s._v(" ：")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-webkit-border-radius")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 10px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("border-radius")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 10px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("根据我们的浏览器支持配置，我们不再需要 "),t("code",[s._v("border-radius")]),s._v(" 的 "),t("code",[s._v("-webkit-")]),s._v("，"),t("code",[s._v("-moz-")]),s._v(" 等前缀。经过 Autoprefixer 处理后会变成这样：")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("border-radius")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 10px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("h3",{attrs:{id:"之前已经手动写了前缀也没关系"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#之前已经手动写了前缀也没关系"}},[s._v("#")]),s._v(" 之前已经手动写了前缀也没关系")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn .icon")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-webkit-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("会被处理成：")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn .icon")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-webkit-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-ms-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n       "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-o-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("h3",{attrs:{id:"怎么用-webkit-min-device-pixel-ratio"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#怎么用-webkit-min-device-pixel-ratio"}},[s._v("#")]),s._v(" 怎么用 "),t("code",[s._v("-webkit-min-device-pixel-ratio")])]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@media")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("min-resolution")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 2dppx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".image")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("background-image")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token url"}},[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("image@2x.png"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("会被处理成")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@media")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-webkit-min-device-pixel-ratio")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-o-min-device-pixel-ratio")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 2/1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("min-resolution")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 2dppx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".image")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("background-image")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token url"}},[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("image@2x.png"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("h3",{attrs:{id:"特定浏览器-hack"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#特定浏览器-hack"}},[s._v("#")]),s._v(" 特定浏览器 hack")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn .icon")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-webkit-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.6"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("会被处理成：")]),s._v(" "),t("div",{staticClass:"language-css extra-class"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn .icon4")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-ms-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-o-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.5"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("-webkit-transform")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scale")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("0.6"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("上面我们介绍了几种 Autoprefixer 的处理规则，更多的用法请参见"),t("a",{attrs:{href:"https://github.com/postcss/autoprefixer",target:"_blank",rel:"noopener noreferrer"}},[s._v("官网"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[s._v("提示")]),s._v(" "),t("p",[s._v("你可以配置 "),t("code",[s._v(".browserslistrc")]),s._v(" 来自定义你需要支持的浏览器。")])]),s._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[s._v("提示")]),s._v(" "),t("p",[s._v("Autoprefixer 是通过 PostCSS 来实现的，如果需要，你可以自定义 "),t("code",[s._v("postcss.config.js")]),s._v(" 来添加更多的功能。")])]),s._v(" "),t("h2",{attrs:{id:"postcss"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#postcss"}},[s._v("#")]),s._v(" PostCSS")]),s._v(" "),t("p",[s._v("Creator 内部使用了 PostCSS。")]),s._v(" "),t("p",[s._v("你可以通过 "),t("code",[s._v("postcss.config.js")]),s._v(" 来配置 PostCSS。也可以通过 "),t("code",[s._v("creator.config.js")]),s._v(" 中的 "),t("code",[s._v("css.loaderOptions.postcss")]),s._v(" 配置 "),t("a",{attrs:{href:"https://github.com/postcss/postcss-loader",target:"_blank",rel:"noopener noreferrer"}},[s._v("postcss-loader"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("p",[s._v("我们默认开启了 "),t("a",{attrs:{href:"https://github.com/postcss/autoprefixer",target:"_blank",rel:"noopener noreferrer"}},[s._v("autoprefixer"),t("OutboundLink")],1),s._v("。如果要配置目标浏览器，请参考 "),t("RouterLink",{attrs:{to:"/guide/browser-compatibility.html#browserslist"}},[s._v("browserslist")]),s._v(" 部分。")],1),s._v(" "),t("h2",{attrs:{id:"css-modules"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#css-modules"}},[s._v("#")]),s._v(" CSS Modules")]),s._v(" "),t("p",[t("strong",[s._v("暂不支持，待开发。")])]),s._v(" "),t("h2",{attrs:{id:"向预处理器-loader-传递选项"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#向预处理器-loader-传递选项"}},[s._v("#")]),s._v(" 向预处理器 Loader 传递选项")]),s._v(" "),t("p",[s._v("有的时候你想要向 webpack 的预处理器 loader 传递选项。你可以使用 "),t("code",[s._v("creator.config.js")]),s._v(" 中的 "),t("code",[s._v("css.loaderOptions")]),s._v(" 选项。比如你可以这样向所有 Sass 样式传入共享的全局变量：")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// vue.config.js")]),s._v("\nmodule"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("css")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("loaderOptions")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("scss")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("prependData")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token template-string"}},[t("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[s._v("`")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('@import "~@/variables.scss";')]),t("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[s._v("`")])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("Loader 可以通过 "),t("code",[s._v("loaderOptions")]),s._v(" 配置，包括：")]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/webpack-contrib/css-loader",target:"_blank",rel:"noopener noreferrer"}},[s._v("css-loader"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/postcss/postcss-loader",target:"_blank",rel:"noopener noreferrer"}},[s._v("postcss-loader"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/webpack-contrib/sass-loader",target:"_blank",rel:"noopener noreferrer"}},[s._v("sass-loader"),t("OutboundLink")],1)])]),s._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[s._v("提示")]),s._v(" "),t("p",[s._v("这样做比使用 "),t("code",[s._v("chainWebpack")]),s._v(" 手动指定 loader 更推荐，因为这些选项需要应用在使用了相应 loader 的多个地方。")])])])}),[],!1,null,null,null);t.default=r.exports}}]);