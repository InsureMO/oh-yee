---
category: Components
title: Process
subtitle: Process
group:
  title: 提示
  order: 1
toc: 'content'
---

## Process 进程
Dynamically display the processing flow

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage"></code>
<code src="./demo/title.tsx" title="Set Title" description="Set the title through the<i>title</i>attribute"></code>

### API

### SemanticType

| 类型 |
|------|
| `'title' \| 'message'` |

### ProcessProps

| property       | type         | description  |  default    |
|------------|------------------|------------|---------|
| prefixCls  | `string`       | Customize class name prefix |       |
| className  | `string`       | Customize root class name   |       |
| style      | `React.CSSProperties`  | Customize root style   |        |
| classNames | `Partial<Record<SemanticType, string>>`    | Semantic class name     |       |
| styles     | `Partial<Record<SemanticType, React.CSSProperties>>`|Semantic style   |      |
| title      | `React.ReactNode`      | title         |      |
| message    | `string`               | message         |     |
| duration   | `number`               | Animation duration   |  `0.2`    |