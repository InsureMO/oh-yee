---
category: Components
title: InputNumber
subtitle: 数字输入框
group:
  title: 数据录入
toc: 'content'
---

# InputNumber

通过鼠标或键盘，输入范围内的数值。

## 何时使用

- 当需要获取标准数值时。
- 需要对数值进行精确控制时。

## 代码演示

### 基本使用

<code src="./demo/basic.tsx">基本使用</code>

### 三种尺寸

<code src="./demo/size.tsx">三种尺寸</code>

### 前缀和后缀

<code src="./demo/prefix-suffix.tsx">前缀和后缀</code>

### 格式化展示

<code src="./demo/formatter.tsx">格式化展示</code>

### 精度控制

<code src="./demo/precision.tsx">精度控制</code>

### 最大最小值

<code src="./demo/min-max.tsx">最大最小值</code>

### 步长

<code src="./demo/step.tsx">步长</code>

### 禁用状态

<code src="./demo/disabled.tsx">禁用状态</code>

### 无边框

<code src="./demo/borderless.tsx">无边框</code>

### 允许清空

<code src="./demo/allow-clear.tsx">允许清空</code>

### 综合示例

<code src="./demo/comprehensive.tsx">综合示例</code>

## API

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| value | `number \| null` | 受控的值 | - |
| defaultValue | `number \| null` | 默认值 | - |
| min | `number` | 最小值 | -Infinity |
| max | `number` | 最大值 | Infinity |
| step | `number` | 步长 | `1` |
| precision | `number` | 精度（小数位数） | - |
| size | `'small' \| 'default' \| 'large'` | 尺寸 | `'default'` |
| bordered | `boolean` | 是否显示边框 | `true` |
| disabled | `boolean` | 是否禁用 | `false` |
| readOnly | `boolean` | 是否只读 | `false` |
| allowClear | `boolean` | 是否允许清空 | `false` |
| controls | `boolean` | 是否显示步进器 | `true` |
| prefix | `React.ReactNode` | 前缀 | - |
| suffix | `React.ReactNode` | 后缀 | - |
| placeholder | `string` | 输入框占位符 | - |
| formatter | `(value: number) => string` | 格式化显示值 | - |
| parser | `(displayValue: string) => string` | 解析输入值 | - |
| className | `string` | 自定义类名 | - |
| style | `CSSProperties` | 自定义样式 | - |
| classNames | `Partial<Record<CompositionDOM, string>>` | 结构化类名 | - |
| styles | `Partial<Record<CompositionDOM, React.CSSProperties>>` | 结构化样式 | - |
| onChange | `(value: number \| null) => void` | 输入值变化的回调 | - |
| onPressEnter | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | 按下回车的回调 | - |
| onStep | `(value: number, info: { offset: number; type: 'up' \| 'down' }) => void` | 步进器点击回调 | - |

### CompositionDOM

结构化类名和样式支持以下部分：

- `prefix`: 前缀区域
- `input`: 输入框
- `suffix`: 后缀区域
- `clear`: 清空按钮
- `handler`: 步进器区域

### StepInfo

```typescript
interface StepInfo {
  offset: number;
  type: 'up' | 'down';
}
```
