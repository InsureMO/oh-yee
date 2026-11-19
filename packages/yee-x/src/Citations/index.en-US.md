---
category: Components
title: Citations
subtitle: Citations
group:
  title: 对话
  order: 4
toc: 'content'
---

## Citations
Source display for RAG answers: source cards / numbered chips with a hover preview of snippet and quote, click to open. The inline `Citations.Chip` links to sources through `CitationsProvider` and can be wired into a Markdown renderer.

### 代码示例
<code src="./demo/basic.tsx" title="Source cards" description="<i>maxVisible</i>folds the rest into a +N chip"></code>
<code src="./demo/chip.tsx" title="Inline chips" description="Markdown components override renders<i>#cite-*</i>links as inline chips"></code>

### API

### CitationSource

| property | type | description |
|------------|------------------|------------|
| id | `string` | Unique id the inline chips reference |
| title | `React.ReactNode` | Source title |
| url | `string` | Link opened on click |
| icon | `React.ReactNode` | Card icon; a globe when `url` is set |
| snippet | `React.ReactNode` | Short preview in the hover popover |
| quote | `React.ReactNode` | Quoted passage |
| meta | `React.ReactNode` | Secondary line, e.g. domain or date |

### CitationsSemanticType

| Type |
|------|
| `'root' \| 'list' \| 'source' \| 'source-icon' \| 'source-main' \| 'source-title' \| 'source-meta' \| 'overflow'` |

### CitationsProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-citations` |
| className | `string` | Customize root class name | |
| style | `React.CSSProperties` | Customize root style | |
| classNames | `Partial<Record<CitationsSemanticType, string>>` | Semantic class names | |
| styles | `Partial<Record<CitationsSemanticType, React.CSSProperties>>` | Semantic styles | |
| sources | `CitationSource[]` | Sources; falls back to the nearest `CitationsProvider` | |
| layout | `'card' \| 'chip'` | Visual variant | `'card'` |
| maxVisible | `number` | Show the first N, fold the rest into a +N chip | |
| onSourceClick | `(source, index) => void` | Click callback; without it `url` opens in a new tab | |
| showLabel | `boolean` | Show the Sources label | `false` |
| locale | `CitationsLocale` | Overrides for built-in labels | |

### CitationChipProps (`Citations.Chip`)

| property | type | description | default |
|------------|------------------|------------|---------|
| sourceId | `string` | Source id resolved against the nearest `CitationsProvider` | |
| source | `CitationSource` | Explicit source; skips the lookup | |
| index | `number` | 1-based number; defaults to the provider position | |
| onClick | `(source, index) => void` | Click callback | |
| children | `React.ReactNode` | Custom content; the index number by default | |
