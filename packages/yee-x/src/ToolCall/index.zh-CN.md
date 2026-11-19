---
category: Components
title: ToolCall
subtitle: 工具调用
group:
  title: 对话
  order: 4
toc: 'content'
---

## ToolCall 工具调用
一行式工具调用卡：状态 + 计时 + 摘要，展开查看参数与结果（带复制），失败可重试；`ToolCall.Group` 将多条调用汇总为可折叠分组。

### 代码示例
<code src="./demo/basic.tsx" title="基础使用"></code>
<code src="./demo/group.tsx" title="分组汇总"></code>

### API

### ToolCallStatus

| 类型 |
|------|
| `'pending' \| 'running' \| 'success' \| 'error'` |

### ToolCallSemanticType

| 类型 |
|------|
| `'root' \| 'header' \| 'icon' \| 'name' \| 'status' \| 'duration' \| 'collapse' \| 'body' \| 'section' \| 'section-label' \| 'section-copy' \| 'pre'` |

### ToolCallProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-toolcall` |
| className | `string` | 自定义根类名 | |
| style | `React.CSSProperties` | 自定义根样式 | |
| classNames | `Partial<Record<ToolCallSemanticType, string>>` | 语义化类名 | |
| styles | `Partial<Record<ToolCallSemanticType, React.CSSProperties>>` | 语义化样式 | |
| status | `ToolCallStatus` | 调用状态 | `'running'` |
| name | `string` | 工具名 | |
| icon | `React.ReactNode` | 名称前的图标，默认按状态渲染（旋转/成功/失败）| |
| title | `React.ReactNode` | 覆盖整行摘要 | |
| args | `unknown` | 参数对象，展开后 JSON 展示 | |
| result | `unknown` | 结果对象，展开后 JSON 展示 | |
| error | `unknown` | 错误对象，独立展示 | |
| duration | `number` | 耗时（秒） | |
| startTime | `number` | running 状态的起始时间戳（ms），启用实时计时 | |
| collapsible | `boolean` | 是否可折叠 | `true` |
| collapsed | `boolean` | 受控折叠状态 | |
| defaultCollapsed | `boolean` | 非受控初始折叠 | `true` |
| onCollapseChange | `(collapsed: boolean) => void` | 折叠回调 | |
| onRetry | `() => void` | 提供后在失败状态渲染重试按钮 | |
| locale | `ToolCallLocale` | 内置文案覆盖 | |

### ToolCallGroupProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| items | `ToolCallProps[]` | 工具调用列表，建议 name 或 id 唯一以保持行状态稳定 | |
| summary | `React.ReactNode` | 覆盖自动汇总文案（如 `3 tool calls · 2 success · 1 failed`） | |
| collapsible | `boolean` | 是否可折叠 | `true` |
| collapsed | `boolean` | 受控折叠状态 | |
| defaultCollapsed | `boolean` | 非受控初始折叠 | `false` |
| onCollapseChange | `(collapsed: boolean) => void` | 折叠回调 | |
