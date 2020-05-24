# 如何写文档

[[toc]]

## Asset Handling

<p>
  <img :src="$withBase('/logo.png')" width="200" alt="logo">
</p>

针对 `public` 下的内容，如下两种路径都会有问题

```
![hero](/logo.png)

<img src="/logo.png" alt="logo">
```

应该使用

```html
<img :src="$withBase('/logo.png')" width="200" alt="logo">
```

## Markdown

### Custom Containers

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in IE / Edge
:::

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, VuePress!')
```
:::

::: vue
theme
├── components
│   ├── `Home.vue`
│   ├── `Navbar.vue`
│   └── `Sidebar.vue`
├── layouts
│   ├── `404.vue`
│   └── `Layout.vue`
├── package.json
└── index.js
:::

::: upgrade
更新 `vuepress/config.js`:
```diff
// vuepress/config.js
module.exports = {
-  markdown: {
-    config(md) { /* ... */ }
-  },
+  extendMarkdown(md) { /* ... */ }
}
```
:::

### Emoji :tada:

:tada: :100:

A list of all emojis available can be found [here](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).

### GitHub-Style Tables <Badge text="like" type="warning"/>

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Syntax Highlighting in Code Blocks <Badge text="test badge"/>

js

```js
export default {
  name: 'MyComponent',
  // ...
}
```

html

```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

高亮

```js{3,4,5}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

### use Vue in Markdown

注意，由于是 SSR，因此要注意 Vue 组件只能使用有限的生命周期，详情请参考 [universal code requirements](https://ssr.vuejs.org/guide/universal.html)

如果你需要使用不支持 SSR 的组件，你可以使用内置的 `<ClientOnly>` 包裹它们：

```md
<ClientOnly>
  <NonSSRFriendlyComponent/>
</ClientOnly>
```

请注意，这并不能解决一些组件或库在导入时就试图访问浏览器 API 的问题 —— 如果需要使用这样的组件或库，你需要在合适的生命周期钩子中动态导入它们：

```vue
<script>
export default {
  mounted () {
    import('./lib-that-access-window-on-import').then(module => {
      // use code
    })
  }
}
</script>
```

#### Interpolation

{{ 1 + 1 }}

#### Directives

<span v-for="i in 3">{{ i }} </span>

#### Access to Site & Page Data

{{ $page }}

#### Escaping

::: v-pre
`{{ This will be displayed as-is }}`
:::

#### Using Components

Any `*.vue` files found in `.vuepress/components` are automatically registered as `global`, `async` components. For example:

<demo-1/>
<OtherComponent/>
<Foo-Bar/>

#### Built-In Components

* `OutboundLink` 外链
* `ClientOnly`
* `Content` 写自定义布局或者主题时非常有用
* `Badge` 角标

Badge <Badge text="beta" type="warning" vertical="middle" /> <Badge text="default theme" type="tip" /> <Badge text="error" type="error" vertical="top" />

## Plugin

### flowchart

[vuepress-plugin-flowchart](https://github.com/ulivz/vuepress-plugin-flowchart)

```
@flowstart
st=>start: Start:>http://www.google.com[blank]
e=>end:>http://www.google.com
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes
or No?:>http://www.google.com
io=>inputoutput: catch something...
para=>parallel: parallel tasks

st->op1->cond
cond(yes)->io->e
cond(no)->para
para(path1, bottom)->sub1(right)->op1
para(path2, top)->op1
@flowend
```

@flowstart
st=>start: Start
e=>end: End

st->e
@flowend

@flowstart
st=>start: Start:>http://www.google.com[blank]
e=>end:>http://www.google.com
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes
or No?:>http://www.google.com
io=>inputoutput: catch something...
para=>parallel: parallel tasks

st->op1->cond
cond(yes)->io->e
cond(no)->para
para(path1, bottom)->sub1(right)->op1
para(path2, top)->op1
@flowend