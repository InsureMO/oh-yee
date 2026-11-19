---
category: Components
title: Thinking
subtitle: 思考过程
group:
  title: 对话
  order: 4
toc: 'content'
---

## Thinking 思考过程
展示 AI 推理/工作过程的折叠面板：状态图标（旋转/成功/失败）、实时计时、步骤逐条出现、可折叠正文。适用于 reasoning 模型或 agent 执行过程的展示。

### 代码示例
<code src="./demo/basic.tsx" title="基础使用" description="步骤逐步出现并自动完成"></code>
<code src="./demo/status.tsx" title="错误状态" description="通过<i>status</i>设置状态，<i>duration</i>静态计时"></code>

### API

### ThinkingStatus

| 类型 |
|------|
| `'pending' \| 'thinking' \| 'success' \| 'error'` |

### ThinkingStep

| 属性名 | 类型 | 描述 |
|------------|------------------|------------|
| key | `React.Key` | 唯一标识，缺省用索引 |
| title | `React.ReactNode` | 步骤标题 |
| content | `React.ReactNode` | 步骤详情（可选） |

### ThinkingSemanticType

| 类型 |
|------|
| `'root' \| 'header' \| 'status' \| 'label' \| 'timer' \| 'collapse' \| 'body' \| 'steps' \| 'step' \| 'step-marker' \| 'step-title' \| 'step-content' \| 'content'` |

### ThinkingProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-thinking` |
| className | `string` | 自定义根类名 | |
| style | `React.CSSProperties` | 自定义根样式 | |
| classNames | `Partial<Record<ThinkingSemanticType, string>>` | 语义化类名 | |
| styles | `Partial<Record<ThinkingSemanticType, React.CSSProperties>>` | 语义化样式 | |
| status | `ThinkingStatus` | 当前状态 | `'thinking'` |
| label | `React.ReactNode` | 标题，缺省按状态取内置文案 | |
| duration | `number` | 耗时（秒），显示为 `m:ss`；thinking 状态下缺省时组件从挂载开始计时 | |
| steps | `ThinkingStep[]` | 步骤列表，逐条追加展示 | |
| content | `React.ReactNode` | 正文（自由推理内容） | |
| collapsible | `boolean` | 是否可折叠 | `true` |
| collapsed | `boolean` | 受控折叠状态 | |
| defaultCollapsed | `boolean` | 非受控初始折叠 | `false` |
| onCollapseChange | `(collapsed: boolean) => void` | 折叠状态变化回调 | |
| extra | `React.ReactNode` | 头部追加内容 | |
| locale | `ThinkingLocale` | 内置文案覆盖 | |
