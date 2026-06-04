---
category: Components
title: TextArea
subtitle: 文本域
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# TextArea 文本域

多行文本输入框。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="TextArea的基础用法"></code>
<code src="./demo/autosize.tsx" title="自适应高度" description="自适应内容高度的文本域"></code>
<code src="./demo/count.tsx" title="计数器" description="带字符计数的文本域"></code>
<code src="./demo/allowClear.tsx" title="允许清除" description="带清除按钮的文本域"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的文本域"></code>
<code src="./demo/borderless.tsx" title="无边框" description="无边框的文本域"></code>

## API

### TextAreaProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| classNames | `Record<CompositionDOM, string>` | 结构化类名 | - |
| styles | `Record<CompositionDOM, React.CSSProperties>` | 结构化行内样式 | - |
| value | `string` | 受控的值 | - |
| defaultValue | `string` | 默认值 | - |
| autoSize | `boolean \| { minRows?: number; maxRows?: number }` | 自适应内容高度 | - |
| showCount | `boolean` | 是否展示计数器 | - |
| bordered | `boolean` | 是否显示边框 | `true` |
| allowClear | `boolean` | 是否允许删除 | - |
| onChange | `(value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void` | 值变化的回调函数 | - |

CompositionDOM 类型:
```typescript
type CompositionDOM = 'input' | 'clear' | 'count';
```

其他属性与 React 的 `TextArea` 元素相同。