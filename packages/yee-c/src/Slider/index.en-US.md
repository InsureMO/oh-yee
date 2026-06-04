---
nav: Components
group: Data Entry
---

# Slider

A Slider component for displaying current value and range.

## When To Use

Use when you want to select a value from a range of values.

## Examples

<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/range.tsx">Range Selection</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/custom.tsx">Custom Range and Step</code>
<code src="./demo/tooltip.tsx">Hide Tooltip</code>

## API

| Property          | Description                                                              | Type                                        | Default    |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------------------- | ---------- |
| defaultValue      | The default value of slider                                              | number                                      | 0          |
| value             | The current value of slider                                              | number                                      | -          |
| min               | The minimum value the slider can slide to                                | number                                      | 0          |
| max               | The maximum value the slider can slide to                                | number                                      | 100        |
| step              | The granularity the slider can step through values                       | number                                      | 1          |
| disabled          | If true, the slider will not be interactable                             | boolean                                     | false      |
| range             | Whether to render as a range selector                                    | boolean                                     | false      |
| defaultRangeValue | The default value of range slider                                        | [number, number]                            | [0, 100]   |
| rangeValue        | The current value of range slider                                        | [number, number]                            | -          |
| tooltipVisible    | Whether to display tooltip                                               | boolean                                     | true       |
| onChange          | Callback function that is fired when the user changes the slider's value | (value: number \| [number, number]) => void | -          |
| onAfterChange     | Callback function that is fired when the slider is released              | (value: number \| [number, number]) => void | -          |
| prefixCls         | Custom class name prefix                                                 | string                                      | yee-slider |
| className         | Custom class name                                                        | string                                      | -          |
| style             | Custom style object                                                      | React.CSSProperties                         | -          |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |
