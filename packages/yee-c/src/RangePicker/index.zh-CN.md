---
category: Components
title: RangePicker
subtitle: 日期范围选择器
group:
  title: 数据录入
  order: 29
toc: 'content'
---

# RangePicker 日期范围选择器

用于选择日期范围的组件，支持快捷选择、自定义格式、禁用等功能。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="最基本的日期范围选择器"></code>
<code src="./demo/size.tsx" title="三种尺寸" description="提供小、中、大三种尺寸"></code>
<code src="./demo/disabled.tsx" title="禁用状态" description="可以禁用整个组件或单独禁用开始/结束日期"></code>
<code src="./demo/clear.tsx" title="清除功能" description="支持清除已选择的日期"></code>
<code src="./demo/status.tsx" title="状态样式" description="支持错误、警告等状态样式"></code>
<code src="./demo/format.tsx" title="自定义格式" description="自定义日期显示和保存格式"></code>
<code src="./demo/ranges.tsx" title="快捷选择" description="预设常用的日期范围快捷选项"></code>
<code src="./demo/separator.tsx" title="自定义分隔符" description="自定义输入框之间的分隔符"></code>
<code src="./demo/controlled.tsx" title="受控组件" description="完全受控的日期范围选择器"></code>
<code src="./demo/callbacks.tsx" title="回调事件" description="各种事件回调的使用"></code>
<code src="./demo/advanced.tsx" title="高级配置" description="交互式配置演示所有功能"></code>

## API

### RangePickerProps

| 属性名        | 类型                                                       | 描述                                  | 默认值                     |
| ------------- | ---------------------------------------------------------- | ------------------------------------- | -------------------------- |
| value         | `string[] \| number[] \| Dayjs[]`                          | 受控值，日期范围数组                  | -                          |
| defaultValue  | `string[] \| number[] \| Dayjs[]`                          | 默认值                                | -                          |
| format        | `string`                                                   | 日期显示格式                          | `'YYYY/MM/DD'`             |
| saveFormat    | `string`                                                   | 日期保存格式（onChange 回调中的格式） | `'YYYY/MM/DD'`             |
| placeholder   | `string \| string[]`                                       | 输入框占位符，可以是字符串或数组      | `['开始日期', '结束日期']` |
| disabled      | `boolean \| [boolean, boolean]`                            | 是否禁用，可以分别禁用开始和结束日期  | `false`                    |
| allowClear    | `boolean`                                                  | 是否显示清除按钮                      | `true`                     |
| size          | `'small' \| 'middle' \| 'large'`                           | 输入框尺寸                            | `'middle'`                 |
| status        | `'error' \| 'warning'`                                     | 设置校验状态                          | -                          |
| separator     | `ReactNode`                                                | 输入框之间的分隔符                    | `'~'`                      |
| ranges        | `Record<string, [Dayjs, Dayjs] \| (() => [Dayjs, Dayjs])>` | 预设时间范围快捷选择                  | -                          |
| endLimitStart | `boolean`                                                  | 结束日期是否受开始日期限制            | `true`                     |
| disabledDate  | `(current: Dayjs, type: 'start' \| 'end') => boolean`      | 不可选择的日期                        | -                          |
| classNames    | `Partial<Record<'startinput' \| 'endinput', string>>`      | 结构化类名                            | -                          |
| styles        | `Partial<Record<'startinput' \| 'endinput', React.CSSProperties>>` | 结构化样式                            | -                          |
| className     | `string`                                                   | 自定义类名                            | -                          |
| style         | `CSSProperties`                                            | 自定义样式                            | -                          |
| prefixCls     | `string`                                                   | 自定义类名前缀                        | `'yee-range-picker'`       |
| onChange      | `(value: string[], date: Dayjs[]) => void`                 | 日期范围变化时的回调                  | -                          |
| onStartChange | `(value: string, date: Dayjs) => void`                     | 开始日期变化时的回调                  | -                          |
| onEndChange   | `(value: string, date: Dayjs) => void`                     | 结束日期变化时的回调                  | -                          |
| onOpenChange  | `(open: boolean) => void`                                  | 弹出日历和关闭日历的回调              | -                          |
| onClear       | `() => void`                                               | 清除时的回调                          | -                          |
| responsive    | `boolean`                                                  | 是否根据屏幕宽度自动切换移动端/桌面端渲染模式 | `true`                     |

## 使用示例

### 基础用法

```tsx
import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState([]);

  return (
    <RangePicker
      value={value}
      onChange={(dates, dateStrings) => {
        console.log(dates, dateStrings);
        setValue(dates);
      }}
      placeholder={['开始日期', '结束日期']}
    />
  );
};
```

### 快捷选择

```tsx
import dayjs from 'dayjs';
import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState([]);

  const ranges = {
    今天: [dayjs(), dayjs()],
    最近7天: [dayjs().subtract(6, 'day'), dayjs()],
    最近30天: [dayjs().subtract(29, 'day'), dayjs()],
    本月: [dayjs().startOf('month'), dayjs().endOf('month')],
  };

  return (
    <RangePicker
      value={value}
      ranges={ranges}
      onChange={(dates) => setValue(dates)}
    />
  );
};
```

### 自定义格式

```tsx
import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState([]);

  return (
    <RangePicker
      value={value}
      format="YYYY-MM-DD"
      saveFormat="YYYY-MM-DD"
      onChange={(dates) => setValue(dates)}
    />
  );
};
```

## 注意事项

1. `format` 用于控制输入框中的日期显示格式
2. `saveFormat` 用于控制 `onChange` 回调中返回的日期字符串格式
3. 当 `endLimitStart` 为 `true` 时，结束日期不能早于开始日期
4. `ranges` 中的值可以是固定的日期数组，也可以是返回日期数组的函数
5. `disabled` 可以是布尔值（同时禁用两个输入框）或数组（分别控制）
