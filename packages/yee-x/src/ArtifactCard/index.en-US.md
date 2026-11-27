---
category: Components
title: ArtifactCard
subtitle: ArtifactCard
group:
  title: Input
  order: 3
toc: 'content'
---

# ArtifactCard

Card for AI-generated documents: shows the document name, file name and generate time with View / Download actions. `ArtifactCard.Group` collects multiple files in one result area with a count badge.

## Code Demo
<code src="./demo/basic.tsx" title="Basic Usage" description="Artifact card and group"></code>

## API

### ArtifactCardProps

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Document name | `React.ReactNode` | - |
| fileName | File name, muted next to the title | `React.ReactNode` | - |
| description | Muted meta line below (e.g. generate time) | `React.ReactNode` | - |
| icon | Leading icon; defaults to an extension-tinted document glyph | `React.ReactNode` | - |
| actions | Replace the default actions (View / Download) | `React.ReactNode` | - |
| onPreview | Called when View is clicked | `() => void` | - |
| onDownload | Called when Download is clicked | `() => void` | - |
| onClick | Called when the card body is clicked (e.g. open a side preview) | `() => void` | - |
| locale | Overrides for built-in action texts | `{ preview?: string; download?: string }` | - |
| prefixCls | Class name prefix | `string` | `yee-artifact-card` |

### ArtifactCardGroupProps

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Section title | `React.ReactNode` | - |
| count | Count badge; defaults to `items.length` | `number` | - |
| items | Artifact cards to render | `Array<ArtifactCardProps & { key?: React.Key }>` | - |
