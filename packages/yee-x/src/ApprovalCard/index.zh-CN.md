---
category: Components
title: ApprovalCard
subtitle: 审批卡片
group:
  title: 对话
  order: 4
toc: 'content'
---

## ApprovalCard 审批卡片
Agent 执行动作前的确认卡：风险徽章、载荷预览、悬停暂停的倒计时（归零自动按拒绝处理并触发 `onExpire`）、批准范围选择（一次/会话/永久），决策后平滑收起为一行摘要，支持 `onUndo` 撤销。

### 代码示例
<code src="./demo/basic.tsx" title="基础使用" description="风险等级、预览、范围与倒计时"></code>
<code src="./demo/resolved.tsx" title="已决策" description="受控 <i>decision</i> 与撤销"></code>

### API

### ApprovalRisk / ApprovalDecision / ApprovalScope / ApprovalStatus

| 类型 |
|------|
| `'low' \| 'medium' \| 'high'` |
| `'approved' \| 'denied'` |
| `'once' \| 'session' \| 'always'` |
| `'approved' \| 'denied' \| 'expired'` |

### ApprovalCardSemanticType

| 类型 |
|------|
| `'root' \| 'head' \| 'agent' \| 'title' \| 'risk' \| 'countdown' \| 'description' \| 'preview' \| 'scopes' \| 'scope' \| 'actions' \| 'resolved'` |

### ApprovalCardProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-approval-card` |
| className / style | - | 自定义根类名/样式 | |
| classNames / styles | `Partial<Record<ApprovalCardSemanticType, …>>` | 语义化类名/样式 | |
| title | `React.ReactNode` | 要执行的动作描述 | |
| agent | `React.ReactNode` | 发起请求的 agent 标识 | |
| description | `React.ReactNode` | 原因说明 | |
| preview | `React.ReactNode` | 载荷预览 | |
| risk | `ApprovalRisk` | 风险等级徽章 | `'medium'` |
| countdown | `number` | 倒计时（秒），悬停暂停，归零自动拒绝并触发 `onExpire` | |
| onExpire | `() => void` | 倒计时归零回调 | |
| scopes | `ApprovalScope[]` | 批准范围选项，多于一个时渲染选择器 | `['once', 'always']` |
| defaultScope | `ApprovalScope` | 初始范围 | `scopes[0]` |
| onDecide | `(decision, scope) => void` | 批准/拒绝回调 | |
| decision | `ApprovalStatus` | 受控决策状态 | |
| onUndo | `() => void` | 提供后在已决策行渲染撤销按钮；非受控模式撤销会自动复开卡片（倒计时重置），受控模式由消费方清除 decision | |
| footer | `React.ReactNode` | 操作区下方追加内容 | |
| locale | `ApprovalCardLocale` | 内置文案覆盖 | |
