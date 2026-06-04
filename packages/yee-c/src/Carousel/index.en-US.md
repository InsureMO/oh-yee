---
category: Components
title: Carousel
subtitle: Carousel
group:
  title: Data Display
  order: 8
toc: 'content'
---

# Carousel <span class="yee-mobile-badge" />

A carousel component. Scales well with large datasets and supports various display effects.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Carousel"></code>
<code src="./demo/autoplay.tsx" title="Autoplay" description="Carousel with autoplay"></code>
<code src="./demo/position.tsx" title="Dot Position" description="Carousel with different dot positions"></code>
<code src="./demo/arrows.tsx" title="Arrows" description="Carousel with navigation arrows"></code>
<code src="./demo/effect.tsx" title="Effect" description="Carousel with fade effect"></code>

## API

### CarouselProps

CarouselProps extends React.HTMLAttributes<HTMLDivElement>

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Structured element class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Structured element styles | - |
| children | `React.ReactNode` | Child elements | - |
| autoplay | `boolean` | Auto switch | - |
| autoplaySpeed | `number` | Autoplay time gap, unit is ms | `500` |
| pauseOnHover | `boolean` | Pause autoplay on hover, valid when autoplay=true | `true` |
| arrows | `boolean \| 'always' \| 'hover'` | Whether to show arrows | `false` |
| dots | `boolean` | Whether to show indicator dots | - |
| dotPosition | `'top' \| 'bottom' \| 'left' \| 'right'` | Indicator dot position | - |
| dotShape | `'line' \| 'dot'` | Dot shape | - |
| trigger | `'click' \| 'hover'` | Dot trigger method | - |
| infinite | `boolean` | Whether to loop infinitely | - |
| effect | `'fade' \| 'scrollx'` | Switch animate effect | - |
| beforeChange | `(current: number, next: number) => void` | Switch before change event | - |
| afterChange | `(current: number) => void` | Switch after change event | - |
| animationDuration | `number` | Transition animation duration (ms) | `500` |

### SemanticDOM

| Type |
| --- |
| `'dot' \| 'prev' \| 'next'` |

## Notes

- Adapted for mobile (arrow buttons enlarged to 44px) |