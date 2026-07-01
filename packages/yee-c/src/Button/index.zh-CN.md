---
category: Components
title: Button
subtitle: 按钮
group:
  title: 通用
  order: 1
toc: 'content'
demo:
  cols: 2
---

# Button 按钮 <span class="yee-mobile-badge" />

按钮用于开始一个即时操作。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Button的基础用法"></code>
<code src="./demo/variant.tsx" title="变体与颜色" description="type / color / variant 的全部组合"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的按钮"></code>
<code src="./demo/disabled.tsx" title="禁用" description="禁用状态的按钮"></code>
<code src="./demo/loading.tsx" title="加载中" description="加载状态的按钮"></code>
<code src="./demo/icon.tsx" title="图标" description="带图标的按钮"></code>
<code src="./demo/ghost.tsx" title="幽灵按钮" description="幽灵样式按钮"></code>

## API

### ButtonProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语义化结构样式 | - |
| htmlType | `'button' \| 'reset' \| 'submit'` | html的button原生type属性 | - |
| type | `ButtonType` | 使用预设的按钮样式，即是color和variant的语法糖 | - |
| color | `'default' \| 'primary' \| 'success' \| 'danger' \| 'warning' \| string` | 设置按钮颜色 | - |
| variant | `'solid' \| 'outlined' \| 'dashed' \| 'filled' \| 'text' \| 'link'` | 设置按钮变体 | - |
| ghost | `boolean` | 幽灵属性，使按钮背景透明 | - |
| shape | `'default' \| 'circle' \| 'round'` | 设置按钮形状 | `'default'` |
| size | `'default' \| 'small' \| 'large'` | 设置按钮大小 | `'default'` |
| block | `boolean` | 占据整行 | - |
| icon | `React.ReactNode \| ((props: ButtonProps) => React.ReactNode)` | 设置图标 | - |
| disabled | `boolean` | 是否禁用 | - |
| loading | `boolean` | 是否显示加载状态 | - |
| title | `string` | 提示标题 | - |
| href | `string` | 跳转链接 | - |
| children | `React.ReactNode` | 子节点 | - |
| onClick | `(event: React.MouseEvent<HTMLButtonElement>) => void` | 点击回调事件 | - |

### ButtonType

| 类型 |
| --- |
| `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` |

### ButtonStatus

| 类型 |
| --- |
| `'info' \| 'success' \| 'warning' \| 'danger' \| 'default'` |

### SemanticDOM

| 类型 |
| --- |
| `'icon' \| 'content'` |

## 注意事项

- 已适配移动端（触控高度 44px、圆形/图标按钮 44px、触摸反馈）