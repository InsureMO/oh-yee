---
category: Components
title: Card
subtitle: Card
group:
  title: Data Display
  order: 7
toc: 'content'
---

# Card <span class="yee-mobile-badge" />

Card is a container for displaying information in a structured and concise way.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Card"></code>
<code src="./demo/collapsible.tsx" title="Collapsible" description="Collapsible card"></code>
<code src="./demo/extra.tsx" title="Extra Content" description="Card with extra content in header"></code>
<code src="./demo/expandIcon.tsx" title="Custom Expand Icon" description="Card with custom expand icon"></code>

## API

### CardProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic structure class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic structure styles | - |
| title | `React.ReactNode` | Card title | - |
| children | `React.ReactNode` | Child elements | - |
| defaultExpanded | `boolean` | Default expanded state | - |
| expanded | `boolean` | Controlled expanded state | - |
| showHeader | `boolean` | Whether to show header area | `true` |
| extra | `React.ReactNode \| ((params: { expanded: boolean }) => React.ReactNode)` | Custom content on the right side of header | - |
| headerClickable | `boolean` | Whether the entire header can be clicked to control expand/collapse | `true` |
| iconPosition | `'left' \| 'right'` | Set expand icon position | `'right'` |
| expandIcon | `(expanded: boolean) => React.ReactNode \| null` | Custom expand icon | - |
| bordered | `boolean` | Whether to show border | - |
| onExpand | `(expanded: boolean) => void` | Callback when expanding/collapsing | - |
| animationDuration | `number` | Expand/collapse animation duration (seconds) | `0.15` |

### CardGroupProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Root node class name | - |
| style | `React.CSSProperties` | Root node style | - |
| children | `React.ReactNode` | Card child nodes | - |
| inner | `boolean` | Whether in another card-group | - |

### SemanticDOM

| Type |
| --- |
| `'expandIcon' \| 'header' \| 'content' \| 'title' \| 'actions'` |