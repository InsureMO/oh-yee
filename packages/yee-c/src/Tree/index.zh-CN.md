---
category: Components
title: Tree
subtitle: 树形控件
group:
  title: 数据展示
  order: 47
toc: 'content'
---

# Tree 树形控件

层次数据展示组件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Tree的基础用法"></code>
<code src="./demo/selectable.tsx" title="可选择" description="可选择的树"></code>
<code src="./demo/checkable.tsx" title="可勾选" description="可勾选的树"></code>
<code src="./demo/icon.tsx" title="自定义图标" description="带自定义图标的树"></code>
<code src="./demo/line.tsx" title="连接线" description="带连接线的树"></code>
<code src="./demo/expanded.tsx" title="受控展开" description="受控展开的树"></code>
<code src="./demo/draggable.tsx" title="拖拽排序" description="拖拽节点进行排序"></code>

## API

### TreeProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| checkable | `boolean` | 节点前添加 Checkbox 复选框 | - |
| defaultExpandAll | `boolean` | 默认展开所有树节点 | - |
| defaultExpandedKeys | `string[]` | 默认展开指定的树节点 | - |
| expandedKeys | `string[]` | 受控展开的树节点 | - |
| disabled | `boolean` | 禁用 | - |
| draggable | `boolean` | 是否允许拖拽 | - |
| allowDrop | `(info: { dragNode: T; dropNode: T; position: 'before' \| 'after' \| 'inside' }) => boolean` | 是否允许在指定位置放置，返回 false 则禁止（显示禁止符） | - |
| onDrop | `(info: { dragNode: T; dropNode: T; dragKey: string \| number; dropKey: string \| number; position: 'before' \| 'after' \| 'inside'; dropToGap: boolean }) => void` | 拖拽完成回调。受控模式需自行重排 `dataSource`，可配合导出的 `moveTreeNode` 工具。当 `expandedKeys` 受控且以 `inside` 方式放置时，需自行把 `dropKey` 加入展开集合 | - |
| showLine | `boolean` | 是否显示连接线 | - |
| showIcon | `boolean` | 是否显示节点图标 | `true` |
| icon | `React.ReactNode \| ((props: TreeProps<T>) => React.ReactNode)` | 标题前的图标，需设置showIcon为true | - |
| switcherIcon | `[React.ReactNode, React.ReactNode]` | 展开收起按钮图标 | - |
| multiple | `boolean` | 树节点数据是否支持多选 | `false` |
| fieldNames | `{ key?: keyof T; label?: keyof T; children?: keyof T; extra?: keyof T }` | 自定义节点key, label, children, extra字段 | - |
| labelRender | `(node: TreeNode<T>) => React.ReactNode` | 自定义节点标签渲染函数。提供后将完全接管 label 区域的渲染，此时节点的 `extra` 不会自动追加（可通过 `node.extra` 自行渲染） | - |
| loadData | `() => void` | 异步加载数据 | - |
| dataSource | `Array<T> \| T` | 数据源 | - |
| checkedKeys | `Array<string \| number>` | 选中复选框的树节点，受控 | - |
| defaultCheckedKeys | `Array<string \| number>` | 选中复选框的树节点，非受控 | - |
| selectedKeys | `Array<string \| number>` | 设置选中的树节点，多选需设置 multiple 为 true | - |
| defaultSelectedKeys | `Array<string \| number>` | 设置默认选中的树节点，多选需设置 multiple 为 true | - |
| onCheck | `(checkedKeys: Array<string \| number>, params: { checked: boolean; checkedNodes: T[]; node: T }) => void` | 复选框选中的回调 | - |
| onSelect | `(selectedKeys: Array<string \| number>, params: { selected: boolean; selectedNodes: T[]; node: T }) => void` | 点击树节点的回调 | - |
| onExpand | `(expandedKeys: Array<string \| number>, params: { expanded: boolean; expandedNodes: T[]; node: T[] }) => void` | 展开收起的回调 | - |

### 数据节点字段

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| key | `string \| number` | 节点唯一标识 |
| label | `string` | 节点显示文本 |
| children | `Array<T>` | 子节点 |
| extra | `React.ReactNode \| ((node: T) => React.ReactNode)` | 节点标签后的附加内容（如标签、徽标、操作按钮）。当 `labelRender` 存在时不会自动渲染，需在 `labelRender` 中通过 `node.extra` 自行处理 |
| disabled | `boolean` | 是否禁用 |
| icon | `React.ReactNode \| (() => React.ReactNode)` | 自定义图标 |

### extra 与 labelRender 的关系

- **仅使用 `extra`**：在默认 label 文本后自动追加 extra 内容，适合简单的标签、徽标等场景
- **仅使用 `labelRender`**：完全自定义节点标签区域的渲染
- **同时存在时**：`labelRender` 优先级更高，extra 不会自动追加。如需在自定义渲染中使用 extra，可通过回调参数 `node.extra` 取得原始值自行渲染