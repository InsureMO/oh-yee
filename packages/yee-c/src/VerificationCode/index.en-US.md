---
category: Components
title: VerificationCode
subtitle: Verification Code
group:
  title: Data Entry
  order: 49
toc: 'content'
---

# VerificationCode

Verification code input component.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of VerificationCode"></code>
<code src="./demo/separator.tsx" title="Separator" description="Custom separator"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled VerificationCode"></code>
<code src="./demo/masked.tsx" title="Masked" description="Masked input"></code>
<code src="./demo/readonly.tsx" title="Read Only" description="Read only VerificationCode"></code>

## API

### VerificationCodeProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| disabled | `boolean` | Is disabled | - |
| readOnly | `boolean` | Is readOnly | - |
| masked | `boolean` | Is masked | - |
| length | `number` | Code length | - |
| value | `string` | Code value, controlled | - |
| defaultValue | `string` | Default code value, uncontrolled | - |
| className | `string` | Custom root element class name | - |
| style | `React.CSSProperties` | Custom root element style | - |
| separator | `((data: { index: number }) => React.ReactNode) \| React.ReactNode` | Separator | - |
| onChange | `(value: string, index: number) => void` | Change callback | - |
| onFinish | `(value: string) => void` | Finish callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |