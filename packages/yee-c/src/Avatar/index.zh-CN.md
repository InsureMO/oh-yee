---
category: Components
title: Avatar
subtitle: 头像
group:
  title: 数据展示
  order: 2
toc: 'content'
---

# Avatar 头像 <span class="yee-mobile-badge" />

用来代表用户或事物，支持图片、图标或字母。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Avatar的基础用法"></code>
<code src="./demo/image.tsx" title="图片" description="带备用文本的图片头像"></code>
<code src="./demo/size.tsx" title="尺寸" description="自定义尺寸的头像"></code>
<code src="./demo/icon.tsx" title="图标" description="不同形状的图标头像"></code>

## API

### AvatarProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| classNames | `Partial<Record<AvatarSemanticDOM, string>>` | 结构化类名 | - |
| styles | `Partial<Record<AvatarSemanticDOM, React.CSSProperties>>` | 结构化样式 | - |
| icon | `React.ReactNode \| (() => React.ReactNode)` | 设置头像自定义图标 | - |
| shape | `'circle' \| 'square'` | 设置头像形状 | `'circle'` |
| size | `'small' \| 'default' \| 'large' \| number` | 设置头像大小 | `'default'` |
| src | `string` | 图片头像的网络地址 | - |
| alt | `string` | 网络图片不显示时的提示文本 | - |
| children | `React.ReactNode` | 文字头像内容 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### AvatarSemanticDOM