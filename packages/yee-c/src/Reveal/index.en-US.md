---
category: Components
title: Reveal
subtitle: Reveal
group:
  title: Other
  order: 50
toc: 'content'
---

# Reveal

Wraps multiple children with two rendering modes to reduce initial render cost.

## Code Demo

<code src="./demo/basic.tsx" title="Scroll" description="scroll mode, renders each child when scrolled into view"></code>
<code src="./demo/stagger.tsx" title="Stagger" description="stagger mode, progressively renders all children frame by frame with auto-tuning"></code>

## API

### RevealProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| children | `React.ReactNode` | Child elements to progressively reveal | - |
| mode | `'scroll' \| 'stagger'` | Rendering mode: scroll renders on viewport entry; stagger renders all progressively frame by frame | `'scroll'` |
| offset | `string` | Trigger distance before entering viewport, scroll mode only (e.g. `'100px'`) | `'0px'` |
| scrollContainer | `Element \| null` | Scroll container, scroll mode only, defaults to viewport | `null` |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |
