module.exports = {
  base: '/create-autofe-app/',
  title: 'Create AutoFE App',
  description: 'Recommended Tooling for AutoFE Development',
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    repo: 'athm-fe/create-autofe-app',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    sidebarDepth: 3,
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '配置参考', link: '/config/' },
      { text: '更新记录', link: 'https://github.com/athm-fe/create-autofe-app/blob/master/CHANGELOG.md' },
    ],
    sidebar: {
      '/guide/': [
        '',
        {
          title: '基础',
          collapsable: false,
          children: [
            'getting-started',
            'folder-structure',
            'autofe-scripts',
            'dev-convention',
            'updating-to-new-releases',
          ]
        },
        {
          title: '开发',
          collapsable: false,
          children: [
            'static-assets',
            'javascript',
            'html',
            'css',
            'browser-compatibility',
            'webpack',
            'mode-and-env',
            'eslint',
            'typescript',
            'troubleshooting',
          ]
        }
      ],
    },
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    // ['@vuepress/pwa', {
    //   serviceWorker: true,
    //   updatePopup: true
    // }],
    ['@vuepress/medium-zoom', true],
    // ['@vuepress/google-analytics', {
    //   ga: 'UA-128189152-1'
    // }],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>'
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>'
    }],
    ['flowchart']
  ],
  extraWatchFiles: [],
  evergreen: true,
};
