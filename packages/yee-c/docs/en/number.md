# Number Utils

Precise floating-point arithmetic utilities to solve JavaScript precision issues.

## Installation

```bash
npm install @oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple number utility functions:

```typescript
import { NumberUtils } from '@oh/yee-tools';

NumberUtils.add(0.1, 0.2);
NumberUtils.multiply(0.1, 0.2);
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function:

```typescript
import { add, multiply, divide } from '@oh/yee-tools/number';

add(0.1, 0.2);
multiply(0.1, 0.2);
divide(0.3, 0.1);
```

## Why Precise Calculation?

JavaScript floating-point arithmetic has precision issues:

```typescript
// Native JavaScript arithmetic
0.1 + 0.2;           // 0.30000000000000004 ❌
0.3 - 0.1;           // 0.19999999999999998 ❌
0.1 * 0.2;           // 0.020000000000000004 ❌
0.3 / 0.1;           // 2.9999999999999996   ❌

// Using NumberUtils
NumberUtils.add(0.1, 0.2);      // 0.3          ✅
NumberUtils.subtract(0.3, 0.1); // "0.2"        ✅
NumberUtils.multiply(0.1, 0.2); // 0.02         ✅
NumberUtils.divide(0.3, 0.1);   // 3            ✅
```

## API

### add

Performs precise floating-point addition.

```typescript
function add(arg1: number, arg2: number): number
```

**Example:**

```typescript
import { NumberUtils } from '@oh/yee-tools';

NumberUtils.add(0.1, 0.2);
// => 0.3

NumberUtils.add(1.5, 2.3);
// => 3.8

NumberUtils.add(0.01, 0.02);
// => 0.03
```

---

### subtract

Performs precise floating-point subtraction.

```typescript
function subtract(arg1: number, arg2: number): string
```

**Example:**

```typescript
import { NumberUtils } from '@oh/yee-tools';

NumberUtils.subtract(0.3, 0.1);
// => "0.2"

NumberUtils.subtract(2.5, 1.2);
// => "1.3"

NumberUtils.subtract(1, 0.9);
// => "0.1"
```

**Note:** Returns string type to ensure precision is not lost.

---

### multiply

Performs precise floating-point multiplication.

```typescript
function multiply(arg1: number, arg2: number): number
```

**Example:**

```typescript
import { NumberUtils } from '@oh/yee-tools';

NumberUtils.multiply(0.1, 0.2);
// => 0.02

NumberUtils.multiply(1.5, 2);
// => 3

NumberUtils.multiply(0.07, 100);
// => 7
```

---

### divide

Performs precise floating-point division.

```typescript
function divide(arg1: number, arg2: number): number
```

**Example:**

```typescript
import { NumberUtils } from '@oh/yee-tools';

NumberUtils.divide(0.3, 0.1);
// => 3

NumberUtils.divide(1.5, 0.5);
// => 3

NumberUtils.divide(10, 3);
// => 3.3333333333333335
```

---

### random

Generates a random integer between min and max (inclusive).

```typescript
function random(min: number, max: number): number
```

**Example:**

```typescript
import { NumberUtils } from '@oh/yee-tools';

// Generate random integer between 1-10
NumberUtils.random(1, 10);
// => 7 (example value)

// Generate random integer between 0-100
NumberUtils.random(0, 100);
// => 42 (example value)

// Simulate dice roll
NumberUtils.random(1, 6);
// => 4 (example value)
```

## Common Use Cases

```typescript
import { NumberUtils } from '@oh/yee-tools';

// Financial calculations
const total = NumberUtils.add(0.1, 0.2);  // 0.3
const tax = NumberUtils.multiply(total, 0.1);  // 0.03
const final = NumberUtils.subtract(total, tax);  // "0.27"

// Price calculations
const price = NumberUtils.multiply(99.9, 0.8);  // 79.92
const discount = NumberUtils.subtract(100, 20);  // "80"

// Random generation
const randomId = NumberUtils.random(1000, 9999);
const luckyDraw = NumberUtils.random(1, 100);
```

## Notes

1. **subtract returns string**: To ensure precision is not lost, `subtract` returns string type
2. **random is inclusive**: `random(min, max)` can return min or max values
3. **Performance**: Precise calculations are slightly slower than native operations, use as needed
