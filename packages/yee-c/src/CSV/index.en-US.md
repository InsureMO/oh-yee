---
category: Components
title: CSV
subtitle: CSV Download
group:
  title: Data Display
  order: 31
toc: 'content'
demo:
  cols: 2
---

# CSV

Download data as CSV file.

## Code Demo

<code src="./demo/basic.tsx" title="Basic Usage" description="Download CSV file with headers and data"></code>

## API

### CSVDownloaderProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| type | `ButtonType` | Button type | `'link'` |
| filename | `string` | Download filename | Timestamp |
| data | `Array<Record<string, any>> \| (() => Array<Record<string, any>>)` | CSV data | - |
| headers | `Array<{ key: string; label: string }>` | Header definitions | - |
| separator | `string` | Column separator | `','` |
| enclosingCharacter | `string` | Enclosing character for strings | `'"'` |
| uFEFF | `boolean` | Whether to add BOM to indicate file encoding | - |
| children | `React.ReactNode` | Child elements | - |
| onClick | `(event: React.MouseEvent<HTMLElement>) => boolean \| void` | Click callback, return `false` to prevent download | - |
| asyncOnClick | `(event: React.MouseEvent<HTMLElement>, callback: (next: boolean) => void) => void` | Async click callback, call `callback(false)` to prevent download | - |
