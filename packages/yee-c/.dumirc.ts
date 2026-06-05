import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/oh-yee/',
  publicPath: '/oh-yee/',

  // Register custom plugins: support .md suffix and ?md=raw parameter
  plugins: ['./.dumi/plugin-md-raw.ts', './.dumi/plugin-theme-css.ts'],

  themeConfig: {
    name: 'yee-c',
    footer: 'Copyright © 2026 InsureMO',
    logo: 'https://github.com/InsureMO.png',

    nav: {
      'zh-CN': [
        { title: '指南', link: '/guide' },
        { title: '组件', link: '/components' },
        { title: '工具函数', link: '/tools' },
        { title: 'AI 辅助开发', link: '/ai-dev' },
        { title: '常见问题', link: '/faq' },
      ],
      'en-US': [
        { title: 'Guide', link: '/en/guide' },
        { title: 'Components', link: '/components' },
        { title: 'Tools', link: '/en/tools' },
        { title: 'AI Dev', link: '/en/ai-dev' },
        { title: 'FAQ', link: '/en/faq' },
      ],
    },

    socialLinks: {
      github: 'https://github.com/InsureMO/oh-yee'
    },
  },

  apiParser: false,

  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'EN' },
  ],

  // Build optimization
  chainWebpack(config) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      },
    });

    // Global error handling
    config.plugin('unhandled-rejection').use({
      apply: (compiler: {
        hooks: {
          done: { tap: (arg0: string, arg1: (stats: any) => void) => void };
        };
      }) => {
        compiler.hooks.done.tap('unhandled-rejection', (stats) => {
          if (stats.hasErrors()) {
            const errors = stats.toJson().errors;
            errors.forEach((err: any) =>
              console.error('[dumi] Build Error:', err),
            );
          }
        });
      },
    });
  },

  // Support static export
  exportStatic: {},
});
