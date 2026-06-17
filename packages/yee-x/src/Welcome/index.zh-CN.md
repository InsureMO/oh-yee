---
category: Components
title: Welcome
subtitle: 欢迎
group:
  title: 提示
  order: 1
toc: 'content'
---

### 代码演示
<code src="./demo/basic.tsx" title="基础使用"></code>
<code src="./demo/style.tsx" title="自定义样式" description="通过styles和classNames自定义样式"></code>

### API

### SemanticDOM

| 类型 |
|------|
| `'title' | 'description' | 'extra' | 'content'` |

### WelcomeProps

| 属性名       | 类型                                     | 描述         | 默认值 |
|------------|-------------------------------------------|--------------|--------|
| prefixCls  | `string`                                  | 自定义类名前缀 | -     |
| className  | `string`                                  | 自定义根类名   | -     |
| style      | `React.CSSProperties`                     | 自定义根行内样式 | -     |
| classNames | `Partial<Record<SemanticDOM, string>>`      | 语义化结构类名 | -      |
| styles     | `Partial<Record<SemanticDOM, React.CSSProperties>>`   | 语义化结构行内样式 | -      |
| title      | `React.ReactNode`                         | 标题         | -     |
| description| `React.ReactNode`                         | 描述         | -      |
| children   | `React.ReactNode`                         | 子元素       | -      |