---
title: 快速开始
order: 1
nav:
  title: 指南
  order: 1
---

# 快速开始

yee-x 是一个专为 AI 应用设计的 React 组件库，本指南将帮助你快速上手。

## 安装

### 环境要求

- Node.js >= 16
- React >= 18.0.0
- TypeScript >= 4.5 (可选，但推荐)

### 使用包管理器安装

```bash
# 使用 npm
npm install @rainbow-oh/yee-x

# 使用 yarn
yarn add yee-x

# 使用 pnpm
pnpm add yee-x
```

## 样式定制

### 使用 CSS 变量

yee-x 支持通过 CSS 变量自定义主题：

```css
:root {
  --yee-primary-color: #1890ff;
  --yee-text-color: #333;
  --yee-bg-color: #fff;
  --yee-border-radius: 8px;
  --yee-font-size: 14px;
}
```

### 自定义样式

你也可以通过 className 或 style 属性自定义样式：

```pure_tsx
function App() {
  return (
    <Bubble
      content="自定义样式的气泡"
      className="my-custom-bubble"
      style={{ backgroundColor: '#f0f0f0' }}
    />
  );
}
```

## TypeScript 支持

yee-x 使用 TypeScript 编写，提供完整的类型定义：

```pure_tsx
import type { BubbleProps, MarkdownProps } from '@rainbow-oh/yee-x';

const bubbleProps: BubbleProps = {
  content: 'Hello',
  role: 'assistant',
};
```

## 下一步

- 查看 [组件文档](/components) 了解所有可用组件
- 阅读 [常见问题](/faq) 解决常见问题
- 查看 [资源](/resources) 获取更多学习资料
- 参与 [贡献](/contributing) 一起完善 yee-x

## 需要帮助？

如果你在使用过程中遇到问题：

- 查看 [常见问题](/faq)
- 提交 [Issue](https://github.com/insureMO/oh-yee/issues)
- 参与 [讨论](https://github.com/insureMO/oh-yee/discussions)
