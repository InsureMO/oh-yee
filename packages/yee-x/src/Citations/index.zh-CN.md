---
category: Components
title: Citations
subtitle: 引用与来源
group:
  title: 对话
  order: 4
toc: 'content'
---

## Citations 引用与来源
RAG 回答的来源展示：来源卡片/编号 chip，悬浮预览摘要与引文，点击跳转；行内 `Citations.Chip` 通过 `CitationsProvider` 与来源联动，可接入 Markdown 渲染。

### 代码示例
<code src="./demo/basic.tsx" title="来源卡片" description="<i>maxVisible</i>控制折叠，超出显示 +N"></code>
<code src="./demo/chip.tsx" title="行内引用 chip" description="通过 Markdown components 覆盖把 <i>#cite-*</i> 链接渲染为行内 chip"></code>

### API

### CitationSource

| 属性名 | 类型 | 描述 |
|------------|------------------|------------|
| id | `string` | 唯一标识，行内 chip 通过它关联 |
| title | `React.ReactNode` | 来源标题 |
| url | `string` | 点击打开的链接 |
| icon | `React.ReactNode` | 卡片图标，缺省按 url 渲染地球图标 |
| snippet | `React.ReactNode` | 悬浮预览摘要 |
| quote | `React.ReactNode` | 引文（高亮段落） |
| meta | `React.ReactNode` | 次要信息，如域名/日期 |

### CitationsSemanticType

| 类型 |
|------|
| `'root' \| 'list' \| 'source' \| 'source-icon' \| 'source-main' \| 'source-title' \| 'source-meta' \| 'overflow'` |

### CitationsProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-citations` |
| className | `string` | 自定义根类名 | |
| style | `React.CSSProperties` | 自定义根样式 | |
| classNames | `Partial<Record<CitationsSemanticType, string>>` | 语义化类名 | |
| styles | `Partial<Record<CitationsSemanticType, React.CSSProperties>>` | 语义化样式 | |
| sources | `CitationSource[]` | 来源列表，缺省取最近的 `CitationsProvider` | |
| layout | `'card' \| 'chip'` | 展示形态 | `'card'` |
| maxVisible | `number` | 只显示前 N 个，超出折叠为 +N chip | |
| onSourceClick | `(source, index) => void` | 点击回调，缺省打开 `url` 新标签页 | |
| showLabel | `boolean` | 是否显示 Sources 标题 | `false` |
| locale | `CitationsLocale` | 内置文案覆盖 | |

### CitationChipProps（`Citations.Chip`）

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| sourceId | `string` | 在最近 `CitationsProvider` 中查找的来源 id | |
| source | `CitationSource` | 直接传入来源，跳过查找 | |
| index | `number` | 展示的编号（从 1 开始），缺省取 provider 位置 | |
| onClick | `(source, index) => void` | 点击回调 | |
| children | `React.ReactNode` | 自定义内容，缺省为编号 | |
