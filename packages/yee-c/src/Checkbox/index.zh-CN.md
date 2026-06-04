---
category: Components
title: Checkbox
subtitle: 多选框
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Checkbox 多选框

多选框用于在一组选项中选择多个项目。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Checkbox的基础用法"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的Checkbox"></code>
<code src="./demo/indeterminate.tsx" title="半选状态" description="带半选状态的Checkbox"></code>
<code src="./demo/group.tsx" title="多选组" description="多选框组"></code>
<code src="./demo/button.tsx" title="按钮风格" description="按钮风格的多选框"></code>

## API

### CheckboxProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 语义化标签 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语义化样式 | - |
| checked | `boolean` | 是否选中 | - |
| defaultChecked | `boolean` | 是否默认选中 | - |
| disabled | `boolean` | 是否禁用 | - |
| children | `React.ReactNode` | 子元素 | - |
| value | `string \| number` | 绑定的值 | - |
| indeterminate | `boolean` | 是否为半选状态 | - |
| onChange | `(event: ChangeEvent<HTMLInputElement>) => void` | 选中变化时的回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### CheckboxGroupProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| buttonStyle | `'outline' \| 'solid'` | 按钮风格 | - |
| disabled | `boolean` | 是否禁用 | - |
| defaultValue | `Array<any>` | 默认值 | - |
| value | `Array<any>` | 受控值 | - |
| name | `string` | checkbox的name对应的属性值 | - |
| options | `Array<CheckboxOption>` | 选项 | - |
| onChange | `(value: Array<string \| number>) => void` | 值变化时的回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SemanticDOM

| 类型 |
| --- |
| `'label' \| 'inner'` |

### CheckboxOption

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| label | `React.ReactNode` | 标签 | - |
| value | `string \| number` | 值 | - |
| disabled | `boolean` | 禁用状态 | - |