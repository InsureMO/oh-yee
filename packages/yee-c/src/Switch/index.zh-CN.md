---
category: Components
title: Switch
subtitle: 开关
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Switch 开关

在两种状态之间进行切换，比如开和关。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Switch的基础用法"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的Switch"></code>
<code src="./demo/disabled.tsx" title="禁用" description="禁用状态"></code>
<code src="./demo/loading.tsx" title="加载中" description="加载中状态"></code>
<code src="./demo/content.tsx" title="自定义内容" description="选中和未选中时的自定义内容"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的Switch"></code>

## API

### SwitchProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义前缀类名 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Record<SemanticDOM, string>` | 语义结构类名 | - |
| styles | `Record<SemanticDOM, React.CSSProperties>` | 语义结构样式 | - |
| disabled | `boolean` | 禁止使用 | - |
| size | `'small' \| 'default' \| 'large'` | 尺寸 | `default` |
| loading | `boolean` | 加载中 | - |
| checkedChildren | `React.ReactNode` | 选中时的节点 | - |
| unCheckedChildren | `React.ReactNode` | 未选中时的节点 | - |
| checked | `boolean` | 是否选中 | - |
| defaultChecked | `boolean` | 是否默认选中 | - |
| onChange | `(checked: boolean) => void` | 状态变化的回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SemanticDOM

| 类型 | 描述 |
| --- | --- |
| handle | 手柄元素 |
| inner | 内部元素 |
| unchecked | 未选中状态元素 |
| checked | 选中状态元素 |