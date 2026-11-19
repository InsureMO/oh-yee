---
category: Components
title: InlineDiff
subtitle: 行内差异
group:
  title: 对话
  order: 4
toc: 'content'
---

## InlineDiff 行内差异
AI 对文本的修改以行内 diff 呈现：删除线/高亮标出改动点，逐处点击循环切换 接受 → 拒绝 → 复原，随时通过 `onResolve` 拿到当前的合并结果；工具栏支持全部接受/全部拒绝/重置。

### 代码示例
<code src="./demo/basic.tsx" title="基础使用" description="点击改动点逐处决策，实时输出合并文本"></code>

### API

### DiffDecision

| 类型 |
|------|
| `'accepted' \| 'rejected'` |

### InlineDiffSemanticType

| 类型 |
|------|
| `'root' \| 'toolbar' \| 'text' \| 'del' \| 'ins'` |

### InlineDiffProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-inline-diff` |
| className / style | - | 自定义根类名/样式 | |
| classNames / styles | `Partial<Record<InlineDiffSemanticType, …>>` | 语义化类名/样式 | |
| original | `string` | 原文 | |
| modified | `string` | AI 改写后的文本 | |
| decisions | `Record<string, DiffDecision>` | 受控决策表，键为改动点 id（`"0"`、`"1"`…） | |
| defaultDecisions | `Record<string, DiffDecision>` | 非受控初始决策 | `{}` |
| onDecide | `(id, decision?) => void` | 单个改动点决策回调，复原时 `decision` 为 `undefined` | |
| onResolve | `(text: string) => void` | 决策变化后输出当前合并文本 | |
| showToolbar | `boolean` | 是否显示全部接受/拒绝/重置工具栏 | `true` |
| locale | `InlineDiffLocale` | 内置文案覆盖 | |

> 词级 diff 在组件内部完成（LCS）；超过 1000 词的文本会退化为整段替换的单一改动点。
