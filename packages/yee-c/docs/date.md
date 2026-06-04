# 日期工具 (DateUtils)

日期时间处理相关的工具函数，基于 dayjs 扩展。

## 安装

```bash
npm install @oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用多个日期工具函数：

```typescript
import { DateUtils } from '@oh/yee-tools';

DateUtils.getCurrentDateTime();
DateUtils.formatToViewFormat(new Date());
DateUtils.add('2024-01-15', 1, 'day');
```

### 方式二：按需引入

适合只需要使用单个函数：

```typescript
import {
  getCurrentDateTime,
  formatToViewFormat,
  add
} from '@oh/yee-tools/date';

getCurrentDateTime();
formatToViewFormat(new Date());
add('2024-01-15', 1, 'day');
```

## API

### getCurrentDateTime

获取当前日期时间的格式化字符串。

```typescript
function getCurrentDateTime(format?: string): string
```

**参数：**
- `format`: 格式字符串（默认：`'YYYY-MM-DD HH:mm:ss'`）

**示例：**

```typescript
import { getCurrentDateTime } from '@oh/yee-tools/date';

getCurrentDateTime();
// => '2026-03-02 14:30:00'

getCurrentDateTime('YYYY-MM-DD');
// => '2026-03-02'

getCurrentDateTime('YYYY年MM月DD日');
// => '2026年03月02日'
```

---

### formatStringToDate

将字符串日期格式化为标准格式。

```typescript
function formatStringToDate(
  date: string,
  inputFormat: string,
  outputFormat?: string
): string
```

**参数：**
- `date`: 日期字符串
- `inputFormat`: 输入日期格式
- `outputFormat`: 输出格式（默认：`'YYYY-MM-DD HH:mm:ss'`）

**示例：**

```typescript
import { formatStringToDate } from '@oh/yee-tools/date';

formatStringToDate('15/01/2024', 'DD/MM/YYYY');
// => '2024-01-15 00:00:00'

formatStringToDate('01-15-2024', 'MM-DD-YYYY', 'YYYY年MM月DD日');
// => '2024年01月15日'
```

---

### formatToSubmitFormat

将 Date 对象格式化为提交格式。

```typescript
function formatToSubmitFormat(date: Date | null | undefined, format?: string): string | null
```

**参数：**
- `date`: Date 对象
- `format`: 格式字符串（默认：`'YYYY-MM-DD HH:mm:ss'`）

**示例：**

```typescript
import { formatToSubmitFormat } from '@oh/yee-tools/date';

formatToSubmitFormat(new Date());
// => '2026-03-02 14:30:00'

formatToSubmitFormat(null);
// => null
```

---

### formatToViewFormat

将 Date 对象格式化为展示格式。

```typescript
function formatToViewFormat(date: Date | null | undefined, format?: string): string | null
```

**参数：**
- `date`: Date 对象
- `format`: 格式字符串（默认：`'YYYY-MM-DD HH:mm:ss'`）

**示例：**

```typescript
import { formatToViewFormat } from '@oh/yee-tools/date';

formatToViewFormat(new Date());
// => '2026-03-02 14:30:00'

formatToViewFormat(new Date(), 'YYYY年MM月DD日 HH:mm');
// => '2026年03月02日 14:30'
```

---

### add

给日期增加时间。

```typescript
function add(
  date: string | Date,
  amount: number,
  unit: DateUnit,
  format?: string
): string
```

**参数：**
- `date`: 日期字符串或 Date 对象
- `amount`: 增加的数量
- `unit`: 时间单位（`'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'` 等）
- `format`: 输出格式（默认：`'YYYY-MM-DD HH:mm:ss'`）

**示例：**

```typescript
import { add } from '@oh/yee-tools/date';

add('2024-01-15', 1, 'day');
// => '2024-01-16 00:00:00'

add('2024-01-15', 2, 'months', 'YYYY-MM-DD');
// => '2024-03-15'

add('2024-01-15', -1, 'year');
// => '2023-01-15 00:00:00'
```

---

### subtract

从日期减去时间。

```typescript
function subtract(
  date: string | Date,
  amount: number,
  unit: DateUnit,
  format?: string
): string
```

**参数：**
- `date`: 日期字符串或 Date 对象
- `amount`: 减少的数量
- `unit`: 时间单位（`'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'` 等）
- `format`: 输出格式（默认：`'YYYY-MM-DD HH:mm:ss'`）

**示例：**

```typescript
import { subtract } from '@oh/yee-tools/date';

subtract('2024-01-15', 1, 'day');
// => '2024-01-14 00:00:00'

subtract('2024-01-15', 2, 'months', 'YYYY-MM-DD');
// => '2023-11-15'

subtract('2024-01-15', 1, 'year');
// => '2023-01-15 00:00:00'
```

## 常见用例

```typescript
import { DateUtils } from '@oh/yee-tools';

// 获取今天日期
const today = DateUtils.getCurrentDateTime('YYYY-MM-DD');

// 获取明天日期
const tomorrow = DateUtils.add(today, 1, 'day', 'YYYY-MM-DD');

// 格式化展示
const display = DateUtils.formatToViewFormat(new Date(), 'YYYY年MM月DD日');
```
