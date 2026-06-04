---
category: Components
title: Grid
subtitle: 栅格
group:
  title: 布局
  order: 20
toc: 'content'
---

# Grid 栅格 <span class="yee-mobile-badge" />

二维网格布局容器。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Grid的基础用法"></code>
<code src="./demo/cols.tsx" title="列数" description="调整列数"></code>
<code src="./demo/colspan.tsx" title="跨列" description="跨多列的项目"></code>

## API

### GridProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| id | `string` | id | - |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| children | `React.ReactNode[]` | 子元素 | - |
| cols | `number \| ResponsiveCols` | 列数，支持数字或响应式配置 `{ mobile?: number; desktop?: number }` | `4` |
| rows | `number` | 行数 | - |
| gap | `number` | 网格间距 | `16` |
| colGap | `number` | 列间距 | - |
| rowGap | `number` | 行间距 | - |

### GridItemProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| colspan | `number` | 跨几列 | - |
| rowspan | `RowSpan` i.e. `{ start: number; end: number }` | 跨几行 | - |
| children | `React.ReactNode` | 子元素 | - |
| spanStyle | `{ gridColumnStart?: number; gridColumnEnd?: number; gridRowStart?: number; gridRowEnd?: number }` | spanStyle | - |

## 注意事项

- 已适配移动端（`cols` 支持响应式配置 `{ mobile?: number; desktop?: number }`，自动根据屏幕宽度切换列数）