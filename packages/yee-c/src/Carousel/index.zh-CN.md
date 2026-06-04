---
category: Components
title: Carousel
subtitle: 走马灯
group:
  title: 数据展示
  order: 8
toc: 'content'
---

# Carousel 走马灯 <span class="yee-mobile-badge" />

走马灯组件。适用于大量数据的展示，支持多种显示效果。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Carousel的基础用法"></code>
<code src="./demo/autoplay.tsx" title="自动播放" description="带自动播放的Carousel"></code>
<code src="./demo/position.tsx" title="指示器位置" description="不同指示器位置的Carousel"></code>
<code src="./demo/arrows.tsx" title="箭头" description="带导航箭头的Carousel"></code>
<code src="./demo/effect.tsx" title="切换效果" description="带淡入淡出效果的Carousel"></code>

## API

### CarouselProps

CarouselProps 继承自 React.HTMLAttributes<`HTMLDivElement`>

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 结构化元素类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 结构化元素样式 | - |
| children | `React.ReactNode` | 子元素 | - |
| autoplay | `boolean` | 自动切换 | - |
| autoplaySpeed | `number` | 自动切换时间间隔，单位为毫秒 | `500` |
| pauseOnHover | `boolean` | 鼠标移入时暂停自动切换, autoPlay=true时有效 | `true` |
| arrows | `boolean \| 'always' \| 'hover'` | 是否显示箭头 | `false` |
| dots | `boolean` | 是否显示指示圆点 | - |
| dotPosition | `'top' \| 'bottom' \| 'left' \| 'right'` | 指示圆点位置 | - |
| dotShape | `'line' \| 'dot'` | 圆点形状 | - |
| trigger | `'click' \| 'hover'` | 圆点触发的方式 | - |
| infinite | `boolean` | 是否无限滚动 | - |
| effect | `'fade' \| 'scrollx'` | 切换动画效果 | - |
| beforeChange | `(current: number, next: number) => void` | 切换前的回调函数 | - |
| afterChange | `(current: number) => void` | 切换后的回调函数 | - |
| animationDuration | `number` | 切换动画时长（毫秒） | `500` |

### SemanticDOM

| 类型 |
| --- |
| `'dot' \| 'prev' \| 'next'` |

## 注意事项

- 已适配移动端（箭头按钮加大至 44px） |