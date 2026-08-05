---
category: Components
title: Workflow
subtitle: 工作流画布
group:
  title: 编排
  order: 6
toc: 'content'
---

# Workflow 工作流画布

用于展示与编排 AI 工作流，数据模型采用 Dify 的 `workflow.graph` 结构，可与 Dify DSL 互相导入导出。

组件负责**展示、编排、运行态可视化**三件事，**不负责执行**。执行需要密钥管理、并发与重试，应当放在服务端；后端把 SSE 事件推给前端，组件消费 `runState` 即可把节点点亮。

画布交互基于 [React Flow](https://reactflow.dev)（`@xyflow/react`，MIT 许可）。

### 代码演示

<code src="./demo/view.tsx" title="只读展示" description="展示已配置好的流程，支持缩略图。多出口的<i>if-else</i>节点会自动渲染 IF / ELSE 端口。"></code>
<code src="./demo/edit.tsx" title="拖拉拽编排" description="左侧拖拽或点击添加节点，右侧配置参数，支持自动布局与结构校验，可导出 DSL。"></code>
<code src="./demo/run.tsx" title="运行态可视化" description="用<i>useWorkflowRun</i>消费 Dify SSE 事件流，节点上叠加运行状态、耗时与 Token。示例用本地 mock 代替后端。"></code>

### 数据模型

`value` / `onChange` 传递的就是 Dify DSL 里的 `workflow.graph` 片段：

```ts
{
  nodes: [
    {
      id: '1000001',
      type: 'custom',                       // Dify 恒为 custom，原样保留
      position: { x: 30, y: 120 },
      data: { title: '开始', type: 'start', variables: [] },
    },
  ],
  edges: [
    {
      id: '1000001-source-1000002-target',
      source: '1000001',
      target: '1000002',
      sourceHandle: 'source',               // if-else 节点为 case_id / 'false'
      targetHandle: 'target',
      type: 'custom',
    },
  ],
}
```

`data` 中除 `title` / `type` / `desc` 外的字段组件不解释，由对应的节点类型定义负责渲染与校验。组件不认识的字段在编辑过程中**原样保留**，因此从 Dify 导出的 DSL 编辑后仍能导回。

变量引用沿用 Dify 的两种写法：模板占位 `{{#1000001.city#}}`（提示词、URL 里用），以及 `value_selector: ['1000001', 'city']`（结构化字段里用）。

### 内置节点类型

| type | 名称 | 输出字段 | 可创建 |
|------|------|---------|-------|
| `start` | 开始 | 用户声明的输入变量 | 是（唯一） |
| `end` | 结束 | - | 是 |
| `answer` | 直接回复 | - | 是 |
| `llm` | LLM | `text` `usage` | 是 |
| `if-else` | 条件分支 | - | 是 |
| `http-request` | HTTP 请求 | `body` `status_code` `headers` `files` | 是 |
| `code` | 代码执行 | 由 `outputs` 决定 | 是 |
| `template-transform` | 模板转换 | `output` | 是 |
| `tool` | 工具 | `text` `files` `json` | 否，仅展示 |
| `agent` | Agent | `text` `files` `json` | 否，仅展示 |
| `variable-aggregator` | 变量聚合 | `output` | 否，仅展示 |

`tool` / `agent` / `variable-aggregator` 的参数结构与 Dify 插件强绑定，在这里新建会得到一个不可用的节点，因此只做渲染，配置以只读 JSON 展示。未注册的节点类型也不会报错，只渲染标题并在校验时提示。

### 自定义节点类型

通过 `nodeTypes` 注册或覆盖，`data` 的结构完全由你决定：

```
<Workflow
  mode="edit"
  nodeTypes={{
    'my-approval': {
      title: '人工审批',
      category: '业务',
      color: '#f58220',
      defaultData: { approver: '' },
      outputs: ['approved', 'comment'],
      renderSummary: ({ data }) => <div>{data.approver || '未指定审批人'}</div>,
      renderForm: ({ data, onChange, variables }) => (
        <input
          value={data.approver}
          onChange={(e) => onChange({ approver: e.target.value })}
        />
      ),
      validate: (data) => (data.approver ? [] : ['未指定审批人']),
    },
  }}
/>
```

`renderForm` 的 `variables` 是从上游节点收集到的可引用变量（只到直接字段一层，不做深层路径推导），配合 `VariablePicker` 或 `SelectorField` 使用。

### 运行态

`useWorkflowRun` 把 Dify 的 SSE 事件流归约成 `runState`：

```
const { runState, running, run, stop } = useWorkflowRun({
  url: '/api/workflows/run',   // 你自己的后端代理
  graph,
});

<Workflow mode="view" value={graph} runState={runState} />
```

识别 `workflow_started`、`node_started`、`node_finished`、`text_chunk`、`workflow_finished`、`error` 六类事件，其余事件（iteration / loop / agent_log 等）忽略而不报错。跨 chunk 拆分的帧会被正确缓冲。

:::warning
不要把 Dify 的 API Key 放进浏览器。`url` 应指向你自己的后端代理，由后端持有密钥并转发 SSE。
:::

已经跑完的流程可以用 `replayRunEvents(events, graph)` 从日志重建 `runState` 做回放。

### 校验

`ref.validate()` 或工具栏的校验按钮会返回结构化问题，并把出错节点标红：

缺少开始 / 结束节点、多个开始节点、孤立节点、从开始节点不可达、非终止节点没有后续连线、存在环、未注册的节点类型，以及各节点类型自己的 `validate` 结果。

当前只支持有向无环图，循环与迭代节点不在范围内。

### API

### WorkflowProps

| 属性名 | 类型 | 描述 | 默认值 |
|-------|------|------|-------|
| prefixCls | `string` | 自定义类名前缀 | `'yee-workflow'` |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<CompositionDOM, string>>` | 结构化类名 | - |
| styles | `Partial<Record<CompositionDOM, React.CSSProperties>>` | 结构化样式 | - |
| value | `WorkflowGraph` | 受控的图数据 | - |
| defaultValue | `WorkflowGraph` | 非受控的初始图数据 | - |
| onChange | `(graph: WorkflowGraph) => void` | 图数据变化回调 | - |
| mode | `'edit' \| 'view'` | 编辑模式 / 只读模式 | `'view'` |
| nodeTypes | `WorkflowNodeTypes` | 注册或覆盖节点类型 | - |
| runState | `WorkflowRunState` | 运行态，叠加在节点上 | - |
| selectedNodeId | `string \| null` | 受控的选中节点 | - |
| onSelectedNodeChange | `(nodeId: string \| null) => void` | 选中节点变化回调 | - |
| onNodeClick | `(node: WorkflowGraphNode) => void` | 节点点击回调 | - |
| height | `number \| string` | 根元素高度 | `560` |
| palette | `boolean` | 是否显示左侧节点面板 | 编辑模式下 `true` |
| inspector | `boolean` | 是否显示右侧配置面板 | 编辑模式下 `true` |
| toolbar | `boolean` | 是否显示顶部工具栏 | `true` |
| minimap | `boolean` | 是否显示缩略图 | `false` |
| background | `boolean` | 是否显示点阵背景 | `true` |
| fitView | `boolean` | 挂载时是否自适应视口 | `true` |
| onValidate | `(errors: WorkflowValidationError[]) => void` | 校验结果回调 | - |
| locale | `Partial<WorkflowLocale>` | 文案覆盖 | - |
| reactFlowProps | `Partial<ReactFlowProps>` | 透传给底层 `<ReactFlow>` | - |

### CompositionDOM

| 类型 |
|------|
| `'toolbar' \| 'palette' \| 'canvas' \| 'inspector' \| 'node'` |

### WorkflowRef

| 方法 | 类型 | 描述 |
|-----|------|------|
| getGraph | `() => WorkflowGraph` | 获取当前图数据 |
| validate | `() => WorkflowValidationError[]` | 执行校验并标记出错节点 |
| autoLayout | `() => void` | 从左到右重新布局 |
| fitView | `() => void` | 自适应视口 |

### WorkflowNodeTypeDef

| 属性名 | 类型 | 描述 | 默认值 |
|-------|------|------|-------|
| title | `string` | 节点名称 | - |
| icon | `React.ReactNode` | 图标 | - |
| color | `string` | 主色 | - |
| category | `string` | 面板分组 | `locale.defaultCategory` |
| creatable | `boolean` | 是否出现在节点面板 | `true` |
| unique | `boolean` | 是否只允许一个实例 | `false` |
| defaultData | `Partial<D> \| (() => Partial<D>)` | 新建节点的默认 `data` | - |
| target | `boolean` | 是否有入口端口 | `true` |
| sourceHandles | `(data: D) => WorkflowHandle[]` | 出口端口，返回 `[]` 表示终止节点 | 单个 `source` |
| outputs | `string[] \| ((data: D) => string[])` | 对下游暴露的字段 | - |
| renderSummary | `(ctx: WorkflowSummaryContext<D>) => ReactNode` | 卡片内容 | - |
| renderForm | `(ctx: WorkflowFormContext<D>) => ReactNode` | 配置表单 | - |
| validate | `(data: D, node) => string[] \| void` | 字段校验 | - |

### WorkflowLocale

`<Workflow locale={...}>` 覆盖的文案，未传字段使用内置中文默认值。带 `{count}` / `{names}` / `{type}` / `{title}` / `{problem}` 占位符的字段会在渲染时替换。

| 字段 | 默认值 |
|-----|------|
| paletteTitle | 节点 |
| paletteHint | 拖拽到画布，或点击添加 |
| inspectorTitle | 节点配置 |
| inspectorEmpty | 选中一个节点进行配置 |
| fieldTitle | 节点名称 |
| fieldDesc | 描述 |
| insertVariable | 插入变量 |
| noVariable | 没有可引用的上游变量 |
| selectUpstreamVariable | 选择上游变量 |
| input | 输入 |
| output | 输出 |
| error | 错误 |
| elapsed | 耗时 |
| tokens | Tokens |
| running | 运行中 |
| succeeded | 成功 |
| failed | 失败 |
| skipped | 已跳过 |
| validate | 校验 |
| validatePassed | 校验通过 |
| moreErrors | 等 {count} 项 |
| autoLayout | 自动布局 |
| fitView | 适应画布 |
| zoomIn | 放大 |
| zoomOut | 缩小 |
| deleteNode | 删除节点 |
| defaultCategory | 其他 |
| listAdd | 添加 |
| listEmpty | 暂无配置 |
| validationNoStart | 缺少开始节点 |
| validationMultipleStart | 存在多个开始节点 |
| validationNoEnd | 缺少结束节点 |
| validationIsolated | 存在未连线的节点：{names} |
| validationUnreachable | 以下节点无法从开始节点到达：{names} |
| validationDeadEnd | 以下节点没有后续连线：{names} |
| validationCycle | 流程中存在环，当前仅支持有向无环图 |
| validationUnknownType | 未注册的节点类型：{type} |
| validationNodeInvalid | {title}：{problem} |

### UseWorkflowRunOptions

| 属性名 | 类型 | 描述 | 默认值 |
|-------|------|------|-------|
| url | `string` | 启动执行并返回 SSE 的接口 | - |
| headers | `Record<string, string>` | 附加请求头 | - |
| body | `Record<string, unknown>` | 合并进请求体 | - |
| user | `string` | 终端用户标识 | - |
| graph | `WorkflowGraph` | 当前执行的图，用于高亮连线 | - |
| onEvent | `(event: WorkflowSSEEvent) => void` | 每一帧事件回调 | - |
| onFinish | `(state: WorkflowRunState) => void` | 流结束回调 | - |
| onError | `(error: unknown) => void` | 错误回调 | - |
| fetcher | `(init) => Promise<Response>` | 替换默认 `fetch` | - |

### 子组件与工具函数

`WorkflowPalette`、`WorkflowCanvas`、`WorkflowInspector`、`WorkflowToolbar` 均从 context 取数据，可在 `<Workflow>` 内自由组合成自定义布局。

工具函数：`validateGraph`、`autoLayout`、`collectUpstreamVariables`、`createNode`、`createEdge`、`selectorToTemplate`、`normalizeGraph`、`createSSEParser`、`reduceRunEvent`、`replayRunEvents`、`createEmptyRunState`。

### 已知边界

- 只支持有向无环图，不支持循环 / 迭代 / 嵌套子流程。
- 变量引用只到直接字段一层，不做深层路径与类型推导。
- 未针对触屏优化，拖拽依赖鼠标事件。
- 节点数量在数十级别时体验最好，上千节点未做虚拟化。
