---
category: Components
title: ArtifactCard
subtitle: 产出文档卡
group:
  title: 输入
  order: 3
toc: 'content'
---

# ArtifactCard 产出文档卡

AI 产出的文档卡片：展示文档名称、文件名与生成时间，提供 View / Download 操作；`ArtifactCard.Group` 将多份文件聚合在同一结果区域并显示数量徽标。

## 代码演示
<code src="./demo/basic.tsx" title="基础使用" description="文档卡与分组"></code>

## API

### ArtifactCardProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 文档名称 | `React.ReactNode` | - |
| fileName | 文件名，标题右侧弱化展示 | `React.ReactNode` | - |
| description | 次行元信息（如 Generate time） | `React.ReactNode` | - |
| icon | 左侧图标；缺省按扩展名着色的文档图形 | `React.ReactNode` | - |
| actions | 覆盖默认操作区（View / Download） | `React.ReactNode` | - |
| onPreview | 点击 View 回调 | `() => void` | - |
| onDownload | 点击 Download 回调 | `() => void` | - |
| onClick | 点击卡片主体回调（如打开侧栏预览） | `() => void` | - |
| locale | 内置操作文案覆盖 | `{ preview?: string; download?: string }` | - |
| prefixCls | 类名前缀 | `string` | `yee-artifact-card` |

### ArtifactCardGroupProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 区域标题 | `React.ReactNode` | - |
| count | 数量徽标；缺省取 items.length | `number` | - |
| items | 文档卡集合 | `Array<ArtifactCardProps & { key?: React.Key }>` | - |
