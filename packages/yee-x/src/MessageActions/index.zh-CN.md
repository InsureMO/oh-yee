---
category: Components
title: MessageActions
subtitle: 消息操作栏
group:
  title: 对话
  order: 4
toc: 'content'
---

## MessageActions 消息操作栏
AI 消息下方的操作栏：复制（成功后变勾）、重新生成、版本切换、点赞/点踩、朗读，并支持自定义扩展动作。

### 代码示例
<code src="./demo/basic.tsx" title="基础使用"></code>
<code src="./demo/feedback.tsx" title="受控用法" description="通过<i>feedback</i>与<i>version</i>受控"></code>

### API

### MessageActionFeedback

| 类型 |
|------|
| `'like' \| 'dislike'` |

### MessageActionsSemanticType

| 类型 |
|------|
| `'root' \| 'item' \| 'item-icon' \| 'item-label' \| 'version' \| 'version-text' \| 'extra'` |

### MessageActionsProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-message-actions` |
| className | `string` | 自定义根类名 | |
| style | `React.CSSProperties` | 自定义根样式 | |
| classNames | `Partial<Record<MessageActionsSemanticType, string>>` | 语义化类名 | |
| styles | `Partial<Record<MessageActionsSemanticType, React.CSSProperties>>` | 语义化样式 | |
| text | `string` | 复制按钮使用的文本，提供后组件内置写入剪贴板 | |
| onCopy | `(text: string \| undefined, succeeded: boolean) => void` | 点击复制后的回调，`succeeded` 标记内置复制是否成功 | |
| regenerating | `boolean` | 重新生成进行中（按钮旋转并禁用） | `false` |
| onRegenerate | `() => void` | 提供后渲染重新生成按钮 | |
| version | `number` | 当前版本号（从 1 开始），受控 | |
| defaultVersion | `number` | 非受控初始版本 | `1` |
| total | `number` | 总版本数，大于 1 时渲染版本切换器 | |
| onVersionChange | `(version: number) => void` | 版本切换回调 | |
| feedback | `MessageActionFeedback` | 受控点赞/点踩状态 | |
| defaultFeedback | `MessageActionFeedback` | 非受控初始反馈 | |
| onFeedbackChange | `(feedback?: MessageActionFeedback) => void` | 反馈变化回调，再次点击取消时传 `undefined` | |
| onReadAloud | `(speaking: boolean) => void` | 提供后渲染朗读按钮 | |
| speaking | `boolean` | 受控朗读状态 | |
| extra | `React.ReactNode` | 追加在末尾的自定义动作 | |
| locale | `MessageActionsLocale` | 内置提示文案覆盖 | |
