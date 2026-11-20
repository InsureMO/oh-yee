---
category: Components
title: ModelPicker
subtitle: 模型选择
group:
  title: 输入
  order: 2
toc: 'content'
---

## ModelPicker 模型选择
AI 聊天的模型菜单：触发按钮显示当前模型，下拉按分组列出可选模型（悬浮时填充 质量/速度/成本 对比条）；支持 extended thinking 开关及 effort 档位展开，底部显示首 token 延迟与价格。可放入 `Sender` 的 `header` 面板使用。

### 代码示例
<code src="./demo/basic.tsx" title="基础使用" description="受控选择、thinking 开关与 effort"></code>

### API

### ThinkingEffort

| 类型 |
|------|
| `'low' \| 'medium' \| 'high'` |

### AIModel

| 属性名 | 类型 | 描述 |
|------------|------------------|------------|
| id | `string` | 唯一标识 |
| name | `React.ReactNode` | 显示名 |
| group | `string` | 分组标签 |
| quality / speed / cost | `number` | 0-100 对比分（cost 越高越贵） |
| thinking | `boolean` | 支持 extended thinking，显示开关 |
| meta | `React.ReactNode` | 静态说明行 |
| firstToken | `React.ReactNode` | 首 token 延迟说明 |
| price | `React.ReactNode` | 价格说明 |
| disabled | `boolean` | 不可选 |

### ModelPickerSemanticType

| 类型 |
|------|
| `'root' \| 'trigger' \| 'trigger-name' \| 'menu' \| 'group-label' \| 'item' \| 'item-name' \| 'item-meta' \| 'metrics' \| 'metric' \| 'metric-label' \| 'metric-bar' \| 'metric-fill' \| 'thinking-row' \| 'effort' \| 'effort-option' \| 'info-row'` |

### ModelPickerProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-model-picker` |
| className / style | - | 自定义根类名/样式 | |
| classNames / styles | `Partial<Record<ModelPickerSemanticType, …>>` | 语义化类名/样式 | |
| models | `AIModel[]` | 可选模型 | |
| value | `string` | 受控选中 id | |
| defaultId | `string` | 非受控初始选中 | `models[0].id` |
| onChange | `(id, model) => void` | 选中回调，同时关闭菜单 | |
| thinkingEnabled | `boolean` | 受控 thinking 开关 | |
| defaultThinkingEnabled | `boolean` | 非受控初始开关 | `false` |
| onThinkingChange | `(enabled) => void` | 开关回调 | |
| effort | `ThinkingEffort` | 受控 effort | |
| defaultEffort | `ThinkingEffort` | 非受控初始 effort | `'medium'` |
| onEffortChange | `(effort) => void` | effort 回调 | |
| showMetrics | `boolean` | 是否显示对比条 | `true` |
| disabled | `boolean` | 禁用触发按钮 | `false` |
| renderTrigger | `(model) => ReactNode` | 自定义触发内容（注意：rc-trigger 会覆写其根元素的 onClick，请勿依赖）| |
| locale | `ModelPickerLocale` | 内置文案覆盖 | |
