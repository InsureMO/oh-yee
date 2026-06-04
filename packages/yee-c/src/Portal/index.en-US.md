---
category: Components
title: Portal
subtitle: Portal
group:
  title: Other
  order: 60
toc: 'content'
demo:
  cols: 2
---

# Portal

Render children into a DOM node outside the parent component hierarchy.

## Code Demo

<code src="./demo/basic.tsx" title="Basic Usage" description="Toggle portal open and close"></code>

## API

### PortalProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| children | `React.ReactElement` | Content to render in the portal | - |
| open | `boolean` | Whether the portal is open | - |
| destroyOnClose | `boolean` | Whether to destroy the portal content on close | - |
| prefixCls | `string` | Custom class name prefix | `'yee-portal'` |
| triggerNode | `HTMLElement` | Trigger node reference | - |
| getContainer | `string \| HTMLElement \| (() => HTMLElement)` | Custom container for the portal | `document.body` |
