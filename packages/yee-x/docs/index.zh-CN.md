---
hero:
  title: yee-x
  description: 专为 AI 应用设计的 React 组件库
  actions:
    - text: 快速开始
      link: /guide
    - text: 组件总览
      link: /components
features:
  - title: 🎯 专注 AI 场景
    description: 提供聊天气泡、Markdown 渲染、代码高亮、流式输出等 AI 应用必备组件，开箱即用
  - title: 🔧 高度可定制
    description: 所有组件提供丰富的配置选项和自定义接口，轻松满足个性化需求
  - title: 💡 低耦合设计
    description: 与具体平台和框架耦合度低，可以轻松集成到各种 React 项目中
  - title: 📦 TypeScript 支持
    description: 使用 TypeScript 开发，提供完整的类型定义，带来更好的开发体验
  - title: 🌐 国际化
    description: 内置中英文支持，易于扩展其他语言，满足全球化需求
  - title: 🚀 现代化技术栈
    description: 基于 React 18+、TypeScript 等现代化技术栈，性能优异
---

## 快速上手

### 安装

```bash
# 使用 npm
npm install @rainbow-oh/yee-x

# 使用 yarn
yarn add yee-x

# 使用 pnpm
pnpm add yee-x
```

### 使用

```pure_tsx
import { Bubble, Markdown, CodeBlock } from '@rainbow-oh/yee-x';

function App() {
  return (
    <div>
      <Bubble content="Hello, yee-x!" />
      <Markdown content="# Welcome to yee-x" />
      <CodeBlock code="const hello = 'world';" language="javascript" />
    </div>
  );
}
```

## 谁在使用

yee-x 正在被越来越多的 AI 应用采用，帮助开发者快速构建高质量的用户界面。

## 参与贡献

我们欢迎所有形式的贡献，无论是新功能、Bug 修复还是文档改进。查看 [贡献指南](/contributing) 了解更多。

## 社区支持

- 💬 [GitHub Discussions](https://github.com/insureMO/oh-yee/discussions) - 讨论和提问
- 🐛 [GitHub Issues](https://github.com/insureMO/oh-yee/issues) - 报告问题
- 📖 [更新日志](/changelog) - 查看版本更新
- ❓ [常见问题](/faq) - 常见问题解答
