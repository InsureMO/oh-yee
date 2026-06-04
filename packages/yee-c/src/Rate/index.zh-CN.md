---
category: Components
title: Rate
subtitle: 评分
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Rate 评分

评分组件，用于对事物进行评级操作。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Rate的基础用法"></code>
<code src="./demo/half.tsx" title="半星" description="支持半星评分"></code>
<code src="./demo/readonly.tsx" title="只读" description="只读模式"></code>
<code src="./demo/clear.tsx" title="清除" description="可以清除评分"></code>
<code src="./demo/character.tsx" title="其他字符" description="使用其他字符替换默认星星"></code>
<code src="./demo/tooltip.tsx" title="提示信息" description="带有提示信息的评分"></code>

## API

### RateProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| children | `React.ReactElement` | 子元素，用于自定义评分图标或内容 | - |
| style | `React.CSSProperties` | 内联样式对象 | - |
| className | `string` | 自定义CSS类名 | - |
| count | `number` | 评分总数 | `5` |
| value | `number` | 当前评分值（受控模式） | - |
| defaultValue | `number` | 默认评分值（非受控模式） | - |
| disabled | `boolean` | 是否禁用评分选择 | - |
| allowHalf | `boolean` | 是否允许半星评分 | - |
| allowClear | `boolean` | 是否允许清除已选评分 | - |
| character | `React.ReactNode \| ((params: { index: number }) => React.ReactNode)` | 自定义评分图标或内容 | - |
| onChange | `(value: number) => void` | 评分变化时的回调函数 | - |
| onHoverChange | `(value: number) => void` | 鼠标悬停时的评分回调函数 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |