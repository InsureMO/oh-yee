---
nav: Components
group: Data Entry
---

# InputNumber

Enter a number within certain range with the mouse or keyboard.

## When To Use

- When a numeric value needs to be provided.
- When precise control over numeric values is required.

## Examples

### Basic

<code src="./demo/basic.tsx">Basic</code>

### Three Sizes

<code src="./demo/size.tsx">Three Sizes</code>

### Prefix and Suffix

<code src="./demo/prefix-suffix.tsx">Prefix and Suffix</code>

### Formatter

<code src="./demo/formatter.tsx">Formatter</code>

### Precision

<code src="./demo/precision.tsx">Precision</code>

### Min and Max

<code src="./demo/min-max.tsx">Min and Max</code>

### Step

<code src="./demo/step.tsx">Step</code>

### Disabled

<code src="./demo/disabled.tsx">Disabled</code>

### Borderless

<code src="./demo/borderless.tsx">Borderless</code>

### Allow Clear

<code src="./demo/allow-clear.tsx">Allow Clear</code>

### Comprehensive Example

<code src="./demo/comprehensive.tsx">Comprehensive Example</code>

## API

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| value | `number \| null` | Current value | - |
| defaultValue | `number \| null` | Default value | - |
| min | `number` | Minimum value | -Infinity |
| max | `number` | Maximum value | Infinity |
| step | `number` | Step value | `1` |
| precision | `number` | Precision of input value | - |
| size | `'small' \| 'default' \| 'large'` | Size of input | `'default'` |
| bordered | `boolean` | Whether has border | `true` |
| disabled | `boolean` | Whether disabled | `false` |
| readOnly | `boolean` | Whether readonly | `false` |
| allowClear | `boolean` | Whether allow clear | `false` |
| controls | `boolean` | Whether show controls | `true` |
| prefix | `React.ReactNode` | Prefix icon or text | - |
| suffix | `React.ReactNode` | Suffix icon or text | - |
| placeholder | `string` | Placeholder of input | - |
| formatter | `(value: number) => string` | Format display value | - |
| parser | `(displayValue: string) => string` | Parse input value | - |
| className | `string` | Custom class name | - |
| style | `CSSProperties` | Custom style | - |
| classNames | `Partial<Record<CompositionDOM, string>>` | Structured class names | - |
| styles | `Partial<Record<CompositionDOM, React.CSSProperties>>` | Structured styles | - |
| onChange | `(value: number \| null) => void` | Callback when value changes | - |
| onPressEnter | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | Callback when press enter | - |
| onStep | `(value: number, info: { offset: number; type: 'up' \| 'down' }) => void` | Callback when step | - |

### CompositionDOM

Structured class names and styles support the following parts:

- `prefix`: Prefix area
- `input`: Input element
- `suffix`: Suffix area
- `clear`: Clear button
- `handler`: Step handler area

### StepInfo

```typescript
interface StepInfo {
  offset: number;
  type: 'up' | 'down';
}
```
