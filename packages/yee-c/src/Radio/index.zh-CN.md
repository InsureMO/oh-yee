---
category: Components
title: Radio
subtitle: 单选框
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Radio 单选框

单选框用于在一组选项中选择一个选项。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Radio的基础用法"></code>
<code src="./demo/disabled.tsx" title="禁用" description="禁用的Radio"></code>
<code src="./demo/button.tsx" title="按钮样式" description="按钮样式的Radio"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的按钮样式Radio"></code>
<code src="./demo/options.tsx" title="选项配置" description="通过配置options生成Radio"></code>
<code src="./demo/vertical.tsx" title="垂直布局" description="垂直布局的Radio"></code>

## API

### RadioProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| classNames | `Partial<Record<'inner' \| 'label', string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<'inner' \| 'label', React.CSSProperties>>` | 语义化结构样式 | - |
| defaultChecked | `boolean` | 默认是否选中 | - |
| checked | `boolean` | 受控是否选中 | - |
| disabled | `boolean` | 是否禁用 | - |
| value | `string \| number` | 值 | - |
| label | `React.ReactNode` | 标签 | - |
| children | `React.ReactNode` | 子元素 | - |
| toggleable | `boolean` | 是否切换选中状态 | - |

### RadioGroupProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| defaultValue | `string \| number` | 默认选中值 | - |
| value | `string \| number` | 受控选中值 | - |
| size | `'large' \| 'default' \| 'small'` | 尺寸 | - |
| name | `string` | 组名 | - |
| disabled | `boolean` | 是否禁用所有选项 | - |
| buttonStyle | `'outline' \| 'solid' \| 'cornermark'` | 按钮风格 | - |
| options | `Array<RadioProps & { label: React.ReactNode }>` | 选项，以配置形式 | - |
| onChange | `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void` | 值改变时的回调 | - |