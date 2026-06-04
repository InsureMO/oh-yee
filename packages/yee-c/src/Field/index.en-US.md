---
category: Components
title: Field
subtitle: Field
group:
  title: Form
  order: 10
toc: 'content'
---

# Field

A standalone form field component that works without a `<Form>` wrapper. Uses `useVirtualForm` to create a virtual form for value management and validation.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Create a virtual form with useVirtualForm and bind Field to Input"></code>
<code src="./demo/validation.tsx" title="Validation" description="required, minLength, regexp, validator rules and validateTrigger"></code>
<code src="./demo/layout.tsx" title="Layout & Style" description="Vertical/horizontal layout and semantic style customization"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disable the entire field via the disabled prop"></code>

## API

### FieldProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| formName | `string` | Virtual form name (required) | - |
| name | `string` | Field name (required) | - |
| label | `React.ReactNode` | Field label | - |
| children | `React.ReactElement` | Form control (must be a single React element) | - |
| rules | `Rule[]` | Validation rules | - |
| required | `boolean` | Whether the field is required (shows asterisk) | `false` |
| layout | `'vertical' \| 'horizontal'` | Layout direction | `'vertical'` |
| disabled | `boolean` | Whether the field is disabled | `false` |
| prefixCls | `string` | Class name prefix | `'yee-field'` |
| className | `string` | Root element class name | - |
| style | `React.CSSProperties` | Root element style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic styles | - |

### Rule

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| required | `boolean` | Whether the field is required | - |
| min | `number` | Minimum value | - |
| max | `number` | Maximum value | - |
| minLength | `number` | Minimum length | - |
| maxLength | `number` | Maximum length | - |
| regexp | `RegExp` | Regex pattern | - |
| validator | `(value: unknown) => boolean` | Custom validation function | - |
| message | `string` | Error message (required) | - |
| validateTrigger | `'onBlur' \| 'onChange' \| 'onSubmit' \| Array` | When to trigger validation | - |
