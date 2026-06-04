---
category: Components
title: Tag
subtitle: 标签
group:
  title: 数据展示
  order: 43
toc: 'content'
---

# Tag 标签 <span class="yee-mobile-badge" />

进行标记和分类的小标签。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Tag的基础用法"></code>
<code src="./demo/type.tsx" title="类型" description="不同类型的标签"></code>
<code src="./demo/closable.tsx" title="可关闭" description="可关闭的标签"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的标签"></code>
<code src="./demo/checkable.tsx" title="可选择" description="可选择的标签"></code>
<code src="./demo/dashed.tsx" title="虚线边框" description="虚线边框的标签"></code>
<code src="./demo/icon.tsx" title="图标" description="带图标的标签"></code>

## API

### TagProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| children | `React.ReactNode` | 子节点 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| className | `string` | 自定义类名 | - |
| classNames | `Partial<Record<'icon' \| 'content' \| 'close', string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<'icon' \| 'content' \| 'close', React.CSSProperties>>` | 语义化结构样式 | - |
| closable | `boolean \| React.ReactNode` | 是否可关闭，也可自定义关闭图标 | - |
| status | `TagType` | 内置状态 | - |
| dashed | `boolean` | 是否为虚线 | - |
| size | `'small' \| 'default' \| 'large'` | 尺寸 | `default` |
| icon | `React.ReactNode` | 设置图标 | - |
| checkable | `boolean` | 是否可选中 | - |
| checked | `boolean` | 设置选中状态 | - |
| bordered | `boolean` | 是否显示边框 | `true` |
| onChange | `(checked: boolean) => void` | 切换选中状态时的回调函数 | - |
| onClose | `(e: React.MouseEvent<HTMLSpanElement>) => void` | 关闭标签时的回调函数 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### TagType

```typescript
type TagType = 'success' | 'error' | 'warning' | 'disabled' | 'info' | 'default';
```

### CheckableTagProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| defaultChecked | `boolean` | 设置默认选中状态 | - |
| checked | `boolean` | 设置选中状态 | - |
| onChange | `(checked: boolean) => void` | 切换选中状态时的回调函数 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

> CheckableTagProps 继承 TagProps 的所有属性