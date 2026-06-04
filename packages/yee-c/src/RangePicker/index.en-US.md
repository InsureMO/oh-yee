---
category: Components
title: RangePicker
subtitle: Date Range Picker
group:
  title: Data Entry
  order: 29
toc: 'content'
---

# RangePicker

A component for selecting date ranges with support for shortcuts, custom formats, and disabled states.

## Examples

<code src="./demo/basic.tsx" title="Basic Usage" description="Basic date range picker"></code>
<code src="./demo/size.tsx" title="Three Sizes" description="Small, middle and large sizes"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disable the entire component or individual inputs"></code>
<code src="./demo/clear.tsx" title="Clear" description="Support clearing selected dates"></code>
<code src="./demo/status.tsx" title="Status" description="Support error and warning status"></code>
<code src="./demo/format.tsx" title="Custom Format" description="Customize date display and save format"></code>
<code src="./demo/ranges.tsx" title="Preset Ranges" description="Preset common date range shortcuts"></code>
<code src="./demo/separator.tsx" title="Custom Separator" description="Customize the separator between inputs"></code>
<code src="./demo/controlled.tsx" title="Controlled Component" description="Fully controlled date range picker"></code>
<code src="./demo/callbacks.tsx" title="Callbacks" description="Various event callbacks"></code>
<code src="./demo/advanced.tsx" title="Advanced Configuration" description="Interactive demo of all features"></code>

## API

### RangePickerProps

| Property      | Type                                                       | Description                                              | Default                      |
| ------------- | ---------------------------------------------------------- | -------------------------------------------------------- | ---------------------------- |
| value         | `string[] \| number[] \| Dayjs[]`                          | Controlled value, date range array                       | -                            |
| defaultValue  | `string[] \| number[] \| Dayjs[]`                          | Default value                                            | -                            |
| format        | `string`                                                   | Date display format                                      | `'YYYY/MM/DD'`               |
| saveFormat    | `string`                                                   | Date save format (format in onChange callback)           | `'YYYY/MM/DD'`               |
| placeholder   | `string \| string[]`                                       | Input placeholder, can be string or array                | `['Start date', 'End date']` |
| disabled      | `boolean \| [boolean, boolean]`                            | Whether to disable, can disable start and end separately | `false`                      |
| allowClear    | `boolean`                                                  | Whether to show clear button                             | `true`                       |
| size          | `'small' \| 'middle' \| 'large'`                           | Input size                                               | `'middle'`                   |
| status        | `'error' \| 'warning'`                                     | Set validation status                                    | -                            |
| separator     | `ReactNode`                                                | Separator between inputs                                 | `'~'`                        |
| ranges        | `Record<string, [Dayjs, Dayjs] \| (() => [Dayjs, Dayjs])>` | Preset date range shortcuts                              | -                            |
| endLimitStart | `boolean`                                                  | Whether end date is limited by start date                | `true`                       |
| disabledDate  | `(current: Dayjs, type: 'start' \| 'end') => boolean`      | Specify dates that cannot be selected                    | -                            |
| classNames    | `Partial<Record<'startinput' \| 'endinput', string>>`      | Semantic class names                                 | -                            |
| styles        | `Partial<Record<'startinput' \| 'endinput', React.CSSProperties>>` | Semantic styles                                     | -                            |
| className     | `string`                                                   | Custom class name                                        | -                            |
| style         | `CSSProperties`                                            | Custom style                                             | -                            |
| prefixCls     | `string`                                                   | Custom class name prefix                                 | `'yee-range-picker'`         |
| onChange      | `(value: string[], date: Dayjs[]) => void`                 | Callback when date range changes                         | -                            |
| onStartChange | `(value: string, date: Dayjs) => void`                     | Callback when start date changes                         | -                            |
| onEndChange   | `(value: string, date: Dayjs) => void`                     | Callback when end date changes                           | -                            |
| onOpenChange  | `(open: boolean) => void`                                  | Callback when panel opens or closes                      | -                            |
| onClear       | `() => void`                                               | Callback when clear                                      | -                            |
| responsive    | `boolean`                                                  | Whether to automatically switch between mobile and desktop rendering based on screen width | `true`                       |

## Usage Examples

### Basic Usage

```tsx
import { RangePicker } from '@rainbow-oh/yee-c';
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
      placeholder={['Start date', 'End date']}
    />
  );
};
```

### Preset Ranges

```tsx
import dayjs from 'dayjs';
import { RangePicker } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState([]);

  const ranges = {
    Today: [dayjs(), dayjs()],
    'Last 7 Days': [dayjs().subtract(6, 'day'), dayjs()],
    'Last 30 Days': [dayjs().subtract(29, 'day'), dayjs()],
    'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
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

### Custom Format

```tsx
import { RangePicker } from '@rainbow-oh/yee-c';
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

## Notes

1. `format` controls the date display format in the input
2. `saveFormat` controls the date string format returned in the `onChange` callback
3. When `endLimitStart` is `true`, the end date cannot be earlier than the start date
4. Values in `ranges` can be fixed date arrays or functions that return date arrays
5. `disabled` can be a boolean (disable both inputs) or an array (control separately)
