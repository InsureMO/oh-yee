---
category: Components
title: Search
subtitle: 搜索框
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Search 搜索框

用于查询数据的搜索输入框。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="搜索框的基础用法"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的搜索框"></code>
<code src="./demo/allowClear.tsx" title="可清空" description="带清空图标的搜索框"></code>
<code src="./demo/borderless.tsx" title="无边框" description="无边框的搜索框"></code>
<code src="./demo/controlled.tsx" title="受控组件" description="受控组件用法"></code>
<code src="./demo/enterButton.tsx" title="搜索按钮" description="带搜索按钮的搜索框"></code>

## API

### SearchProps

SearchProps extends Omit<React.InputHTMLAttributes<`HTMLInputElement`>, 'size' | 'prefix' | 'onChange'>, Omit<TriggerProps, 'children' | 'popup'>

| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `'yee-search'` |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| classNames | `Record<SemanticDOM, string>` | 结构化类名 | - |
| styles | `Record<SemanticDOM, React.CSSProperties>` | 结构化行内样式 | - |
| size | `'small' \| 'default' \| 'large'` | 尺寸 | `'default'` |
| value | `string` | 受控的值 | - |
| defaultValue | `string` | 默认值 | - |
| bordered | `boolean` | 是否显示边框 | `true` |
| prefix | `React.ReactNode` | 前缀 | - |
| suffix | `React.ReactNode` | 后缀 | - |
| disabled | `boolean` | 是否禁用 | `false` |
| allowClear | `boolean` | 是否允许清空 | `false` |
| searchOnAction | `'typing' \| 'enter'` | 触发搜索事件的方式 | `'typing'` |
| suggestions | `Array<SearchOption>` | 建议数据 | - |
| options | `Array<SearchOption>` | 搜索选项 | - |
| optionRender | `(option: SearchOption) => React.ReactNode` | 自定义选项节点 | - |
| suggestionRender | `(option: SearchOption) => React.ReactNode` | 自定义建议节点 | - |
| placeholder | `string` | 占位文本 | - |
| onChange | `(option: SearchOption \| null) => void` | 输入值变化的回调 | - |
| onSearch | `(value: string) => void` | 搜索触发的回调 | - |

### SemanticDOM

| 类型 |
| --- |
| `'prefix' \| 'input' \| 'suffix' \| 'clear' \| 'button'` |

### SearchOption

SearchOption 继承 ListItemProps