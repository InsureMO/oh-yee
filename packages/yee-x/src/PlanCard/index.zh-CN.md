---
category: Components
title: PlanCard
subtitle: 计划卡片
group:
  title: 对话
  order: 4
toc: 'content'
---

## PlanCard 计划卡片
Agent 的分步计划：审阅模式支持重命名、上下排序/拖拽、增删步骤并确认执行；运行模式按 `current` 游标逐条推进，显示实时计时，失败步骤可重试。

### 代码示例
<code src="./demo/review.tsx" title="审阅模式" description="重命名、排序、增删后确认"></code>
<code src="./demo/run.tsx" title="运行模式" description="按 current 游标推进，失败重试"></code>

### API

### PlanStepStatus

| 类型 |
|------|
| `'pending' \| 'running' \| 'success' \| 'error' \| 'skipped'` |

### PlanStep

| 属性名 | 类型 | 描述 |
|------------|------------------|------------|
| key | `React.Key` | 唯一标识，缺省用索引 |
| title | `string` | 步骤标题 |
| description | `React.ReactNode` | 步骤补充说明 |
| status | `PlanStepStatus` | 显式状态，覆盖 `current` 游标推导 |
| duration | `number` | 静态耗时（秒），完成后展示 |

### PlanCardSemanticType

| 类型 |
|------|
| `'root' \| 'header' \| 'title' \| 'collapse' \| 'body' \| 'step' \| 'step-index' \| 'step-title' \| 'step-desc' \| 'step-status' \| 'step-duration' \| 'step-actions' \| 'footer' \| 'add-step'` |

### PlanCardProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-plan-card` |
| className / style | - | 自定义根类名/样式 | |
| classNames / styles | `Partial<Record<PlanCardSemanticType, …>>` | 语义化类名/样式 | |
| steps | `PlanStep[]` | 计划步骤 | |
| mode | `'review' \| 'run'` | 模式 | `'review'` |
| title | `React.ReactNode` | 标题 | |
| collapsible | `boolean` | 是否可折叠 | `false` |
| collapsed / defaultCollapsed / onCollapseChange | - | 折叠状态 | `false` |
| editable | `boolean` | 审阅模式是否允许编辑 | `true` |
| onStepsChange | `(steps: PlanStep[]) => void` | 步骤增删改后的回调 | |
| onConfirm | `(steps: PlanStep[]) => void` | 确认按钮回调 | |
| onCancel | `() => void` | 提供后渲染取消按钮 | |
| current | `number` | 运行模式当前步骤下标 | |
| startedAt | `number` | 当前步骤开始时间戳（ms），启用实时计时 | |
| onStepRetry | `(index: number) => void` | 失败步骤重试回调 | |
| onStepClick | `(index: number) => void` | 步骤行点击回调 | |
| locale | `PlanCardLocale` | 内置文案覆盖 | |
