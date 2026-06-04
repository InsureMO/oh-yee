---
category: Components
title: Portal
subtitle: 传送门
group:
  title: 其他
  order: 60
toc: 'content'
demo:
  cols: 2
---

# Portal 传送门

将子节点渲染到父组件层级之外的 DOM 节点中。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="切换 Portal 的打开和关闭"></code>

## API

### PortalProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| children | `React.ReactElement` | Portal 中渲染的内容 | - |
| open | `boolean` | 是否打开 Portal | - |
| destroyOnClose | `boolean` | 关闭时是否销毁内容 | - |
| prefixCls | `string` | 自定义类名前缀 | `'yee-portal'` |
| triggerNode | `HTMLElement` | 触发节点引用 | - |
| getContainer | `string \| HTMLElement \| (() => HTMLElement)` | 自定义 Portal 容器 | `document.body` |
