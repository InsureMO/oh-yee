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

A standalone form field component that works without a `<Form>` wrapper. Two usage modes:

- **Virtual form mode**: create a virtual form with `useVirtualForm`; Field manages value and validation (pass `formName` + `name`)
- **Pure layout mode**: omit `formName` (or the form is not registered); Field only renders the label layout and required asterisk, while `value`/`onChange` pass straight through to the child — state is managed by the consumer

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Create a virtual form with useVirtualForm and bind Field to Input"></code>
<code src="./demo/standalone.tsx" title="Pure Layout" description="Without formName, state is managed by the consumer and Field only handles label layout"></code>
<code src="./demo/validation.tsx" title="Validation" description="required, minLength, regexp, validator rules and validateTrigger"></code>
<code src="./demo/layout.tsx" title="Layout & Style" description="Vertical/horizontal layout and semantic style customization"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disable the entire field via the disabled prop"></code>

## API

### FieldProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| formName | `string` | Virtual form name; omit for pure layout mode | - |
| name | `string` | Field name (required in virtual form mode) | - |
| label | `React.ReactNode` | Field label | - |
| children | `React.ReactElement` | Form control (must be a single React element) | - |
| rules | `Rule[]` | Validation rules | - |
| required | `boolean` | Whether the field is required (shows asterisk) | `false` |
| layout | `'vertical' \| 'horizontal'` | Layout direction | `'vertical'` |
| disabled | `boolean` | Whether the field is disabled (merged onto the child, also works in pure layout mode) | `false` |
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
| validator | `(value: unknown) => boolean \| void \| Promise<boolean \| void>` | Custom validation function, supports sync and async (see Form.Rule) | - |
| message | `string` | Error message (required) | - |
| validateTrigger | `'onBlur' \| 'onChange' \| 'onSubmit' \| Array` | When to trigger validation | - |
