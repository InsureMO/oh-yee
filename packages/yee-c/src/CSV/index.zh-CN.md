---
category: Components
title: CSV
subtitle: CSV 下载
group:
  title: 数据展示
  order: 31
toc: 'content'
demo:
  cols: 2
---

# CSV CSV 下载

将数据下载为 CSV 文件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="带表头和数据下载 CSV 文件"></code>

## API

### CSVDownloaderProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| type | `ButtonType` | 按钮类型 | `'link'` |
| filename | `string` | 下载文件名 | 时间戳 |
| data | `Array<Record<string, any>> \| (() => Array<Record<string, any>>)` | CSV 数据 | - |
| headers | `Array<{ key: string; label: string }>` | 表头定义 | - |
| separator | `string` | 列分隔符 | `','` |
| enclosingCharacter | `string` | 字符串包围符 | `'"'` |
| uFEFF | `boolean` | 是否添加 BOM 标识文件编码 | - |
| children | `React.ReactNode` | 子节点 | - |
| onClick | `(event: React.MouseEvent<HTMLElement>) => boolean \| void` | 点击回调，返回 `false` 可阻止下载 | - |
| asyncOnClick | `(event: React.MouseEvent<HTMLElement>, callback: (next: boolean) => void) => void` | 异步点击回调，调用 `callback(false)` 可阻止下载 | - |
