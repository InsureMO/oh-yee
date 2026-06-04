---
category: Components
title: Avatar
subtitle: Avatar
group:
  title: Data Display
  order: 2
toc: 'content'
---

# Avatar <span class="yee-mobile-badge" />

Avatars can be used to represent people or objects. It supports images, icons, or letters.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Avatar"></code>
<code src="./demo/image.tsx" title="Image" description="Image avatar with fallback text"></code>
<code src="./demo/size.tsx" title="Size" description="Custom size avatar"></code>
<code src="./demo/icon.tsx" title="Icon" description="Icon avatar with different shapes"></code>

## API

### AvatarProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| classNames | `Partial<Record<AvatarSemanticDOM, string>>` | Semantic class names | - |
| styles | `Partial<Record<AvatarSemanticDOM, React.CSSProperties>>` | Semantic styles | - |
| icon | `React.ReactNode \| (() => React.ReactNode)` | Custom icon | - |
| shape | `'circle' \| 'square'` | Avatar shape | `'circle'` |
| size | `'small' \| 'default' \| 'large' \| number` | Avatar size | `'default'` |
| src | `string` | Image source for image avatar | - |
| alt | `string` | Alternative text for image avatar | - |
| children | `React.ReactNode` | Text avatar content | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### AvatarSemanticDOM