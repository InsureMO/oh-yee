# Date Utils

Date and time manipulation utilities based on dayjs.

## Installation

```bash
npm install @oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple date utility functions:

```typescript
import { DateUtils } from '@oh/yee-tools';

DateUtils.getCurrentDateTime();
DateUtils.formatToViewFormat(new Date());
DateUtils.add('2024-01-15', 1, 'day');
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function:

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

Gets the current date and time as a formatted string.

```typescript
function getCurrentDateTime(format?: string): string
```

**Parameters:**
- `format`: Format string (default: `'YYYY-MM-DD HH:mm:ss'`)

**Example:**

```typescript
import { getCurrentDateTime } from '@oh/yee-tools/date';

getCurrentDateTime();
// => '2026-03-02 14:30:00'

getCurrentDateTime('YYYY-MM-DD');
// => '2026-03-02'

getCurrentDateTime('YYYY-MM-DD');
// => '2026-03-02'
```

---

### formatStringToDate

Formats a string date to a standardized format.

```typescript
function formatStringToDate(
  date: string,
  inputFormat: string,
  outputFormat?: string
): string
```

**Parameters:**
- `date`: The date string to format
- `inputFormat`: The format of the input date string
- `outputFormat`: Output format (default: `'YYYY-MM-DD HH:mm:ss'`)

**Example:**

```typescript
import { formatStringToDate } from '@oh/yee-tools/date';

formatStringToDate('15/01/2024', 'DD/MM/YYYY');
// => '2024-01-15 00:00:00'

formatStringToDate('01-15-2024', 'MM-DD-YYYY', 'YYYY-MM-DD');
// => '2024-01-15'
```

---

### formatToSubmitFormat

Formats a Date object to submission format.

```typescript
function formatToSubmitFormat(date: Date | null | undefined, format?: string): string | null
```

**Parameters:**
- `date`: The Date object to format
- `format`: Format string (default: `'YYYY-MM-DD HH:mm:ss'`)

**Example:**

```typescript
import { formatToSubmitFormat } from '@oh/yee-tools/date';

formatToSubmitFormat(new Date());
// => '2026-03-02 14:30:00'

formatToSubmitFormat(null);
// => null
```

---

### formatToViewFormat

Formats a Date object to view format.

```typescript
function formatToViewFormat(date: Date | null | undefined, format?: string): string | null
```

**Parameters:**
- `date`: The Date object to format
- `format`: Format string (default: `'YYYY-MM-DD HH:mm:ss'`)

**Example:**

```typescript
import { formatToViewFormat } from '@oh/yee-tools/date';

formatToViewFormat(new Date());
// => '2026-03-02 14:30:00'

formatToViewFormat(new Date(), 'YYYY-MM-DD HH:mm');
// => '2026-03-02 14:30'
```

---

### add

Adds time to a date.

```typescript
function add(
  date: string | Date,
  amount: number,
  unit: DateUnit,
  format?: string
): string
```

**Parameters:**
- `date`: Date string or Date object
- `amount`: The amount to add
- `unit`: Time unit (`'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'`, etc.)
- `format`: Output format (default: `'YYYY-MM-DD HH:mm:ss'`)

**Example:**

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

Subtracts time from a date.

```typescript
function subtract(
  date: string | Date,
  amount: number,
  unit: DateUnit,
  format?: string
): string
```

**Parameters:**
- `date`: Date string or Date object
- `amount`: The amount to subtract
- `unit`: Time unit (`'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'`, etc.)
- `format`: Output format (default: `'YYYY-MM-DD HH:mm:ss'`)

**Example:**

```typescript
import { subtract } from '@oh/yee-tools/date';

subtract('2024-01-15', 1, 'day');
// => '2024-01-14 00:00:00'

subtract('2024-01-15', 2, 'months', 'YYYY-MM-DD');
// => '2023-11-15'

subtract('2024-01-15', 1, 'year');
// => '2023-01-15 00:00:00'
```

## Common Use Cases

```typescript
import { DateUtils } from '@oh/yee-tools';

// Get today's date
const today = DateUtils.getCurrentDateTime('YYYY-MM-DD');

// Get tomorrow's date
const tomorrow = DateUtils.add(today, 1, 'day', 'YYYY-MM-DD');

// Format for display
const display = DateUtils.formatToViewFormat(new Date(), 'YYYY-MM-DD');
```
