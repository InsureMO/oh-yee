import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/oh-yee/yee-x/',
  publicPath: '/oh-yee/yee-x/',

  themeConfig: {
    name: 'yee-x',
    logo: 'https://github.com/InsureMO.png',
    footer: 'Open Source | Copyright © 2026 InsureMO',
    socialLinks: {
      github: 'https://github.com/InsureMO/oh-yee',
    },
    nav: {
      'zh-CN': [
        { title: '指南', link: '/guide' },
        { title: '组件', link: '/components' },
        { title: '更新日志', link: '/changelog' },
        { title: '常见问题', link: '/faq' },
        { title: '资源', link: '/resources' },
        { title: '贡献指南', link: '/contributing' },
      ],
      'en-US': [
        { title: 'Guide', link: '/en-US/guide' },
        { title: 'Components', link: '/en-US/components' },
        { title: 'Changelog', link: '/en-US/changelog' },
        { title: 'FAQ', link: '/en-US/faq' },
        { title: 'Resources', link: '/en-US/resources' },
        { title: 'Contributing', link: '/en-US/contributing' },
      ],
    },
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'EN' },
  ],
  exportStatic: {},
});
