---
category: Components
title: Search
subtitle: Search
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Search

A search input component for querying data.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Search"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Search"></code>
<code src="./demo/allowClear.tsx" title="Allow Clear" description="Search with clear icon"></code>
<code src="./demo/borderless.tsx" title="Borderless" description="Search without border"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled search"></code>
<code src="./demo/enterButton.tsx" title="Enter Button" description="Search with enter button"></code>

## API

### SearchProps

SearchProps extends Omit<React.InputHTMLAttributes<`HTMLInputElement`>, 'size' | 'prefix' | 'onChange'>, Omit<TriggerProps, 'children' | 'popup'>

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | `'yee-search'` |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| classNames | `Record<SemanticDOM, string>` | Structured class names | - |
| styles | `Record<SemanticDOM, React.CSSProperties>` | Structured inline styles | - |
| size | `'small' \| 'default' \| 'large'` | Size | `'default'` |
| value | `string` | Controlled value | - |
| defaultValue | `string` | Default value | - |
| bordered | `boolean` | Whether to show border | `true` |
| prefix | `React.ReactNode` | Prefix | - |
| suffix | `React.ReactNode` | Suffix | - |
| disabled | `boolean` | Whether disabled | `false` |
| allowClear | `boolean` | Whether to allow clear | `false` |
| searchOnAction | `'typing' \| 'enter'` | Trigger search event method | `'typing'` |
| suggestions | `Array<SearchOption>` | Suggest data | - |
| options | `Array<SearchOption>` | Search options | - |
| optionRender | `(option: SearchOption) => React.ReactNode` | Custom option node | - |
| suggestionRender | `(option: SearchOption) => React.ReactNode` | Custom suggestion node | - |
| placeholder | `string` | Placeholder text | - |
| onChange | `(option: SearchOption \| null) => void` | Callback when input value changes | - |
| onSearch | `(value: string) => void` | Callback when search is triggered | - |

### SemanticDOM

| Type |
| --- |
| `'prefix' \| 'input' \| 'suffix' \| 'clear' \| 'button'` |

### SearchOption

SearchOption extends ListItemProps