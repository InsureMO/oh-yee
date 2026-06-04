---
category: Components
title: Skeleton
subtitle: Skeleton
group:
  title: Feedback
  order: 35
toc: 'content'
---

# Skeleton <span class="yee-mobile-badge" />

Provide a placeholder while you wait for content to load or visualize content that doesn't exist yet.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Skeleton"></code>
<code src="./demo/complex.tsx" title="Complex" description="Complex Skeleton with avatar, title and paragraph"></code>
<code src="./demo/active.tsx" title="Active" description="Active animation for loading state"></code>
<code src="./demo/custom.tsx" title="Custom" description="Customize avatar, title and paragraph"></code>
<code src="./demo/avatar.tsx" title="Avatar" description="Only show avatar placeholder"></code>
<code src="./demo/title.tsx" title="Title" description="Only show title placeholder"></code>
<code src="./demo/paragraph.tsx" title="Paragraph" description="Only show paragraph placeholder"></code>

## API

### SkeletonProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| active | `boolean` | Active animation | - |
| avatar | `boolean \| AvatarProps` | Show avatar placeholder | - |
| title | `boolean \| TitleProps` | Show title placeholder | `true` |
| paragraph | `boolean \| ParagraphProps` | Show paragraph placeholder | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### AvatarProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| shape | `'circle' \| 'square'` | Set avatar shape | `circle` |

### TitleProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| width | `number \| string` | Set title width | - |

### ParagraphProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| rows | `number` | Set paragraph rows | - |
| width | `number \| string \| Array<string \| number>` | Paragraph width | - |