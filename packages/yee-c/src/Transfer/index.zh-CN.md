---
category: Components
title: Transfer
subtitle: 穿梭框
group:
  title: 数据录入
  order: 4
toc: 'content'
---

# Transfer 穿梭框

双栏穿梭选择组件，常用于将多个项目从左侧列表移动到右侧列表。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="基础的穿梭框用法"></code>
<code src="./demo/oneWay.tsx" title="单向模式" description="单向穿梭模式，只能从左侧移动到右侧"></code>
<code src="./demo/disabled.tsx" title="禁用选项" description="禁用某些选项"></code>
<code src="./demo/search.tsx" title="可搜索" description="带搜索功能的穿梭框"></code>
<code src="./demo/pagination.tsx" title="分页" description="带分页功能的穿梭框"></code>
<code src="./demo/draggable.tsx" title="可拖拽" description="支持拖拽排序的穿梭框"></code>
<code src="./demo/customFields.tsx" title="自定义字段" description="自定义数据字段名"></code>

## API

### TransferProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 类名前缀 | - |
| className | `string` | 类名 | - |
| style | `React.CSSProperties` | 样式 | - |
| dataSource | `DataSource[]` | 数据源，其中每项必须包含 `key` 和 `label` 字段（可通过 `rowKey` 和 `rowLabel` 自定义） | `[]` |
| titles | `[string, string]` | 标题集合，顺序从左至右 | `['UnSelected', 'Selected']` |
| targetKeys | `Array<string \| number>` | 显示在右侧框数据的 key 集合 | - |
| defaultTargetKeys | `Array<string \| number>` | 默认显示在右侧框数据的 key 集合 | - |
| selectedKeys | `Array<string \| number>` | 设置哪些项应该被选中 | - |
| defaultSelectedKeys | `Array<string \| number>` | 默认选中项的 key 集合 | - |
| searchable | `boolean` | 是否显示搜索框 | `true` |
| disabled | `boolean` | 是否禁用 | - |
| oneWay | `boolean` | 是否为单向模式，单向模式下只能从左侧移动到右侧 | - |
| operations | `[React.ReactNode, React.ReactNode]` | 操作按钮集合，顺序从上至下 | - |
| pagination | `PaginationProps` | 分页配置，参考 Pagination 组件 | - |
| searchIconPosition | `'left' \| 'right'` | 搜索图标的位置 | `'left'` |
| draggable | `boolean` | 是否支持拖拽排序 | - |
| rowKey | `string \| ((option: DataSource) => string)` | 指定每项的 key，默认为 'key' | `'key'` |
| rowLabel | `string \| ((option: DataSource) => string)` | 指定每项显示的文本，默认为 'label' | `'label'` |
| onChange | `(targetKeys, direction, moveKeys) => void` | 选项在两栏之间转移时的回调函数 | - |
| onSelectChange | `(sourceSelectedKeys, targetSelectedKeys) => void` | 选中项发生改变时的回调函数 | - |
| onDrop | `(dropObj, dataSource) => void` | 拖拽完成时的回调函数 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### DataSource

```typescript
interface DataSource {
  key: string | number;
  label: string;
  title?: string;
  disabled?: boolean;
  [key: string]: any;
}
```

## 注意事项

- `dataSource` 中的每一项必须包含唯一标识字段（默认为 `key`）
- 当设置 `oneWay` 时，右侧框中的项目不能移回左侧
- `draggable` 属性仅在单向模式下生效
- 移动端不推荐使用穿梭框，建议使用 Checkbox List 或 Picker 替代
