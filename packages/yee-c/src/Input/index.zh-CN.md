---
category: Components
title: Input
subtitle: 输入框
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Input 输入框 <span class="yee-mobile-badge" />

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="输入框的基础用法"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的输入框"></code>
<code src="./demo/addon.tsx" title="前缀与后缀" description="带前缀或后缀的输入框"></code>
<code src="./demo/allowClear.tsx" title="可清空" description="带清空图标的输入框"></code>
<code src="./demo/borderless.tsx" title="无边框" description="无边框的输入框"></code>
<code src="./demo/controlled.tsx" title="受控组件" description="受控组件用法"></code>

## 密码框

密码框组件基于输入框组件，增加了密码可见性切换功能。

<code src="./demo/password.tsx" title="密码框" description="密码框的基础用法"></code>

## 邮箱输入框

邮箱输入框组件基于输入框组件，将类型设置为email。

<code src="./demo/email.tsx" title="邮箱输入框" description="邮箱输入框的基础用法"></code>

## API

### InputProps

InputProps extends Omit<React.InputHTMLAttributes<`HTMLInputElement`>, 'size' | 'prefix' | 'onChange'>

| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| classNames | `Record<CompositionDOM, string>` | 结构化类名 | - |
| styles | `Record<CompositionDOM, React.CSSProperties>` | 结构化行内样式 | - |
| size | `'small' \| 'default' \| 'large'` | 尺寸 | - |
| value | `string \| number` | 受控的值 | - |
| defaultValue | `string \| number` | 默认值 | - |
| bordered | `boolean` | 是否显示边框 | `true` |
| prefix | `React.ReactNode` | 前缀 | - |
| suffix | `React.ReactNode` | 后缀 | - |
| disabled | `boolean` | 是否禁用 | - |
| allowClear | `boolean` | 是否允许清空 | - |
| onChange | `(value: string, event: React.ChangeEvent<`HTMLInputElement`> \| React.MouseEvent<HTMLSpanElement>) => void` | 输入值变化的回调 | - |

### PasswordProps

PasswordProps extends InputProps

| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| visibilityToggle | `boolean` | 是否显示切换密码可见性的按钮 | `true` |

### EmailProps

EmailProps extends InputProps

邮箱输入框组件没有额外的属性，只是将类型设置为email。

### CompositionDOM

| 类型 |
| --- |
| `'prefix' \| 'input' \| 'suffix' \| 'clear'` |

## 注意事项

- 已适配移动端（输入框高度 44px、字号 16px 防止 iOS 自动缩放）