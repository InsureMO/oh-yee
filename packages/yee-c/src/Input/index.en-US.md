---
category: Components
title: Input
subtitle: Input
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Input <span class="yee-mobile-badge" />

A basic input field that lets users enter text.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Input"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Input"></code>
<code src="./demo/addon.tsx" title="Prefix and Suffix" description="Input with prefix and suffix"></code>
<code src="./demo/allowClear.tsx" title="Allow Clear" description="Input with clear icon"></code>
<code src="./demo/borderless.tsx" title="Borderless" description="Input without border"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled input"></code>

## Password

Password component is based on Input component with additional password visibility toggle functionality.

<code src="./demo/password.tsx" title="Password" description="Basic usage of Password"></code>

## Email

Email component is based on Input component with type set to email.

<code src="./demo/email.tsx" title="Email" description="Basic usage of Email"></code>

## API

### InputProps

InputProps extends Omit<React.InputHTMLAttributes<`HTMLInputElement`>, 'size' | 'prefix' | 'onChange'>

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| classNames | `Record<CompositionDOM, string>` | Structured class names | - |
| styles | `Record<CompositionDOM, React.CSSProperties>` | Structured inline styles | - |
| size | `'small' \| 'default' \| 'large'` | Size | - |
| value | `string \| number` | Controlled value | - |
| defaultValue | `string \| number` | Default value | - |
| bordered | `boolean` | Whether to show border | `true` |
| prefix | `React.ReactNode` | Prefix | - |
| suffix | `React.ReactNode` | Suffix | - |
| disabled | `boolean` | Whether disabled | - |
| allowClear | `boolean` | Whether to allow clear | - |
| onChange | `(value: string, event: React.ChangeEvent<`HTMLInputElement`> \| React.MouseEvent<HTMLSpanElement>) => void` | Callback when input value changes | - |

### PasswordProps

PasswordProps extends InputProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| visibilityToggle | `boolean` | Whether to show visibility toggle button | `true` |

### EmailProps

EmailProps extends InputProps

Email component doesn't have additional props, it just sets the type to email.

### CompositionDOM

| Type |
| --- |
| `'prefix' \| 'input' \| 'suffix' \| 'clear'` |

## Notes

- Adapted for mobile (input height 44px, font-size 16px to prevent iOS auto-zoom)