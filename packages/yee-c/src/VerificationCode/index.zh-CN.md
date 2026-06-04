---
category: Components
title: VerificationCode
subtitle: 验证码输入
group:
  title: 数据录入
  order: 49
toc: 'content'
---

# VerificationCode 验证码输入

验证码输入组件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="VerificationCode的基础用法"></code>
<code src="./demo/separator.tsx" title="分隔符" description="自定义分隔符"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的VerificationCode"></code>
<code src="./demo/masked.tsx" title="掩码" description="掩码输入"></code>
<code src="./demo/readonly.tsx" title="只读" description="只读的VerificationCode"></code>

## API

### VerificationCodeProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| disabled | `boolean` | 是否禁用 | - |
| readOnly | `boolean` | 是否只读 | - |
| masked | `boolean` | 是否掩码显示 | - |
| length | `number` | 验证码长度 | - |
| value | `string` | 验证码值，受控 | - |
| defaultValue | `string` | 默认验证码值，非受控 | - |
| className | `string` | 自定义根元素类名 | - |
| style | `React.CSSProperties` | 自定义根元素样式 | - |
| separator | `((data: { index: number }) => React.ReactNode) \| React.ReactNode` | 分隔符 | - |
| onChange | `(value: string, index: number) => void` | 值变化回调 | - |
| onFinish | `(value: string) => void` | 输入完成回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |