---
category: Components
title: Cascader
subtitle: Cascader
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Cascader

Cascade selection box for multi-level data selection.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Cascader"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Cascader"></code>
<code src="./demo/fieldNames.tsx" title="Custom Field Names" description="Cascader with custom field names"></code>
<code src="./demo/search.tsx" title="Search" description="Cascader with search functionality"></code>
<code src="./demo/multiple.tsx" title="Multiple" description="Cascader with multiple selection"></code>

## API

### CascaderProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root element class name | - |
| style | `React.CSSProperties` | Custom root element style | - |
| options | `Option[]` | Data options | - |
| expandTrigger | `'hover' \| 'click'` | Expand trigger type | - |
| defaultValue | `Array<string \| number> \| Array<Array<string \| number>>` | Default value, uncontrolled | - |
| value | `Array<string \| number> \| Array<Array<string \| number>>` | Value, controlled | - |
| disabled | `boolean` | Disabled state | - |
| children | `React.ReactNode` | Custom trigger node | - |
| loading | `boolean` | Data is loading | - |
| multiple | `boolean` | Multiple selection | - |
| searchable | `boolean` | Is it searchable | - |
| placement | `CascaderPlacementType` | Popup position | - |
| suffix | `React.ReactNode \| (() => React.ReactNode)` | Input suffix | - |
| changeOnSelect | `boolean` | Clicking on each level of menu options will result in changes in the values | - |
| fieldNames | `FieldNames` | Custom option field name | `{ label: 'label', value: 'value', children: 'children' }` |
| fullNode | `boolean` | Full node | - |
| onlyParentNode | `boolean` | Only parent node | - |
| optionLabelProp | `string \| ((obj: object) => any)` | Option label property | - |
| popupClassName | `string` | Popup class name | - |
| loadData | `(option: Option) => Promise<Array<Option>>` | Load data function | - |
| onChange | `(value: Array<Array<string \| number>> \| Array<string \| number> \| undefined, options: Array<Option>) => void` | Value change callback | - |
| onOpenChange | `(open: boolean) => void` | Open change callback | - |

### CascaderPlacementType

| Type |
| --- |
| `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomRight' \| 'bottomLeft'` |

### Option

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| label | `string` | Label | - |
| value | `string \| number` | Value | - |
| children | `Option[]` | Children options | - |
| disabled | `boolean` | Disabled state | - |
| isLeaf | `boolean` | Is leaf node | - |
| level | `number` | Level | - |
| [prop: string] | `unknown` | Other properties | - |

### FieldNames

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| label | `string` | Label field name | - |
| value | `string` | Value field name | - |
| children | `string` | Children field name | - |

## Notes

- Not recommended for mobile. Consider using WheelPicker or Picker instead