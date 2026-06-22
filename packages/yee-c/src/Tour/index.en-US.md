---
category: Components
title: Tour
subtitle: Tour
group:
  title: Feedback
  order: 29
toc: 'content'
---

# Tour

Step-by-step guided tour: full-screen mask + highlighted target element + attached explanation card, with multi-step navigation, progress indicators, and automatic scroll-into-view. Commonly used for feature walkthroughs and new-user onboarding.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Multi-step tour, controlled open, with previous/next/finish/skip"></code>
<code src="./demo/placement.tsx" title="Placement" description="Card placement relative to the target; auto-flips near viewport edges"></code>
<code src="./demo/indicators.tsx" title="Custom Indicators" description="Customize step indicators via indicatorsRender"></code>
<code src="./demo/scroll.tsx" title="Scroll & Fallback" description="Auto scroll-into-view on step change; centered card when target is missing"></code>

## API

### TourProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| open | `boolean` | Whether the tour is visible (controlled) | - |
| steps | `TourStep[]` | Tour steps | - |
| current | `number` | Controlled current step index | - |
| defaultCurrent | `number` | Default current step index | `0` |
| onClose | `() => void` | Callback when closed / skipped | - |
| onFinish | `() => void` | Callback when all steps are finished | - |
| onChange | `(current: number) => void` | Callback when current step changes | - |
| placement | `Placement` | Default card placement | `'bottom'` |
| arrow | `boolean` | Whether to show the card arrow | - |
| mask | `boolean` | Whether to show the mask (highlight cutout + click lock) | `true` |
| closable | `boolean` | Whether the top-right close button is shown | `true` |
| closeIcon | `React.ReactNode` | Custom close icon | - |
| maskClosable | `boolean` | Whether clicking the mask closes the tour | `false` |
| indicatorsRender | `(current: number, total: number) => React.ReactNode` | Custom step indicators | default `current+1 / total` |
| scrollIntoViewOptions | `boolean \| ScrollIntoViewOptions` | Options for target.scrollIntoView on each step | `true` |
| className / style | | Custom root class/style | - |
| classNames / styles | `Partial<Record<'highlight' \| 'content' \| 'header' \| 'body' \| 'footer', …>>` | Semantic structure class/style | - |

> `Placement` = `'top' \| 'right' \| 'bottom' \| 'left' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'`, same as `Trigger`.

### TourStep

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| target | `(() => HTMLElement \| null) \| string \| HTMLElement` | Highlight target (finder function / CSS selector / element) | - |
| title | `React.ReactNode` | Card title | - |
| description | `React.ReactNode` | Card description | - |
| placement | `Placement` | Card placement for this step, overrides TourProps.placement | - |
| arrow | `boolean` | Whether to show the arrow for this step | - |
| className | `string` | Custom card class name for this step | - |

### Built-in text

Button labels (previous/next/finish/skip) come from `locale.tour` (`previous`/`next`/`finish`/`skip`) and follow the `ConfigProvider` locale; override via the language pack or `ConfigProvider.value.tour`.
