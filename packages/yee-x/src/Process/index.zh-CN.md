---
category: Components
title: Process
subtitle: 进程
group:
  title: 提示
  order: 1
toc: 'content'
---

## Process 进程
对处理流程进行动态展示

### 代码示例
<code src="./demo/basic.tsx" title="基础使用"></code>
<code src="./demo/title.tsx" title="设置标题" description="通过<i>title</i>属性设置标题"></code>

### API

### SemanticType

| 类型 |
|------|
| `'title' \| 'message'` |

### ProcessProps

| 属性名       | 类型            | 描述         |  默认值    |
|------------|------------------|------------|---------|
| prefixCls  | `string`       | 自定义类名前缀 |       |
| className  | `string`       | 自定义根类名   |       |
| style      | `React.CSSProperties`  | 自定义根样式   |        |
| classNames | `Partial<Record<SemanticType, string>>`    | 语义化类名     |       |
| styles     | `Partial<Record<SemanticType, React.CSSProperties>>`|语义化样式   |      |
| title      | `React.ReactNode`      | 标题         |      |
| message    | `string`               | 提示         |     |
| duration   | `number`               | 动画持续时间   |  `0.2`    |