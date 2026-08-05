---
category: Components
title: Workflow
subtitle: Workflow canvas
group:
  title: Orchestration
  order: 6
toc: 'content'
---

# Workflow

A canvas for viewing and editing AI workflows. The data model is Dify's
`workflow.graph` shape, so graphs round-trip with a Dify DSL export.

The component covers **rendering, editing and run-state visualisation**. It does
**not execute** anything: execution needs credentials, concurrency and retries
and belongs on your server. Feed the SSE events your backend emits into
`runState` and the canvas lights up.

Canvas interaction is built on [React Flow](https://reactflow.dev)
(`@xyflow/react`, MIT licensed).

### Examples

<code src="./demo/view.tsx" title="Read-only" description="Render a configured workflow. Multi-port <i>if-else</i> nodes get IF / ELSE handles automatically."></code>
<code src="./demo/edit.tsx" title="Editing" description="Drag or click to add nodes, configure them on the right, auto layout and validate, then export the DSL."></code>
<code src="./demo/run.tsx" title="Run state" description="<i>useWorkflowRun</i> reduces a Dify SSE stream into node status, elapsed time and token counts. The example mocks the backend locally."></code>

### Data model

`value` / `onChange` carry the `workflow.graph` fragment of a Dify DSL file:

```ts
{
  nodes: [
    {
      id: '1000001',
      type: 'custom',                       // always `custom` in Dify, preserved as is
      position: { x: 30, y: 120 },
      data: { title: 'Start', type: 'start', variables: [] },
    },
  ],
  edges: [
    {
      id: '1000001-source-1000002-target',
      source: '1000001',
      target: '1000002',
      sourceHandle: 'source',               // case_id / 'false' for if-else nodes
      targetHandle: 'target',
      type: 'custom',
    },
  ],
}
```

Apart from `title` / `type` / `desc`, the component never interprets `data` --
the matching node type definition renders and validates it. Unknown fields
survive editing untouched, so a Dify export can be edited here and imported
back.

Variable references follow Dify: template placeholders `{{#1000001.city#}}` for
prompts and URLs, and `value_selector: ['1000001', 'city']` for structured
fields.

### Built-in node types

| type | Title | Outputs | Creatable |
|------|-------|---------|-----------|
| `start` | Start | user declared input variables | yes (unique) |
| `end` | End | - | yes |
| `answer` | Answer | - | yes |
| `llm` | LLM | `text` `usage` | yes |
| `if-else` | Condition | - | yes |
| `http-request` | HTTP request | `body` `status_code` `headers` `files` | yes |
| `code` | Code | from `outputs` | yes |
| `template-transform` | Template | `output` | yes |
| `tool` | Tool | `text` `files` `json` | render only |
| `agent` | Agent | `text` `files` `json` | render only |
| `variable-aggregator` | Variable aggregator | `output` | render only |

The last three have provider-specific parameter schemas that only Dify can
supply, so they render and round-trip but cannot be created here. Unregistered
types do not crash the canvas either: the card shows the title and validation
reports the unknown type.

### Custom node types

Register or override through `nodeTypes`; the `data` shape is entirely yours:

```tsx
<Workflow
  mode="edit"
  nodeTypes={{
    'my-approval': {
      title: 'Approval',
      category: 'Business',
      color: '#f58220',
      defaultData: { approver: '' },
      outputs: ['approved', 'comment'],
      renderSummary: ({ data }) => <div>{data.approver || 'No approver'}</div>,
      renderForm: ({ data, onChange }) => (
        <input
          value={data.approver}
          onChange={(e) => onChange({ approver: e.target.value })}
        />
      ),
      validate: (data) => (data.approver ? [] : ['Approver is required']),
    },
  }}
/>
```

`renderForm` receives `variables`, the fields exposed by upstream nodes (one
level deep, no nested path inference), for use with `VariablePicker` or
`SelectorField`.

### Run state

`useWorkflowRun` reduces a Dify SSE stream into `runState`:

```tsx
const { runState, running, run, stop } = useWorkflowRun({
  url: '/api/workflows/run',   // your own backend proxy
  graph,
});

<Workflow mode="view" value={graph} runState={runState} />
```

It handles `workflow_started`, `node_started`, `node_finished`, `text_chunk`,
`workflow_finished` and `error`; anything else (iteration, loop, agent logs) is
ignored rather than throwing. Frames split across chunks are buffered correctly.

:::warning
Never ship a Dify API key to the browser. Point `url` at your own backend, keep
the key there and proxy the SSE stream.
:::

Use `replayRunEvents(events, graph)` to rebuild a `runState` from a stored log.

### Validation

`ref.validate()` and the toolbar button return structured problems and mark the
offending nodes red: missing start / end node, multiple start nodes, isolated
nodes, nodes unreachable from start, non-terminal nodes without an outgoing
edge, cycles, unregistered node types, plus whatever each node type's own
`validate` reports.

Only directed acyclic graphs are supported; loops and iteration nodes are out of
scope.

### API

### WorkflowProps

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| prefixCls | `string` | Class name prefix | `'yee-workflow'` |
| className | `string` | Root class name | - |
| style | `React.CSSProperties` | Root inline style | - |
| classNames | `Partial<Record<CompositionDOM, string>>` | Semantic class names | - |
| styles | `Partial<Record<CompositionDOM, React.CSSProperties>>` | Semantic styles | - |
| value | `WorkflowGraph` | Controlled graph | - |
| defaultValue | `WorkflowGraph` | Uncontrolled initial graph | - |
| onChange | `(graph: WorkflowGraph) => void` | Graph change callback | - |
| mode | `'edit' \| 'view'` | Editable or read-only | `'view'` |
| nodeTypes | `WorkflowNodeTypes` | Register or override node types | - |
| runState | `WorkflowRunState` | Execution overlay | - |
| selectedNodeId | `string \| null` | Controlled selection | - |
| onSelectedNodeChange | `(nodeId: string \| null) => void` | Selection change callback | - |
| onNodeClick | `(node: WorkflowGraphNode) => void` | Node click callback | - |
| height | `number \| string` | Root height | `560` |
| palette | `boolean` | Show the node palette | `true` in edit mode |
| inspector | `boolean` | Show the inspector | `true` in edit mode |
| toolbar | `boolean` | Show the toolbar | `true` |
| minimap | `boolean` | Show the minimap | `false` |
| background | `boolean` | Show the dotted background | `true` |
| fitView | `boolean` | Fit the graph on mount | `true` |
| onValidate | `(errors: WorkflowValidationError[]) => void` | Validation callback | - |
| locale | `Partial<WorkflowLocale>` | Text overrides | - |
| reactFlowProps | `Partial<ReactFlowProps>` | Forwarded to `<ReactFlow>` | - |

### CompositionDOM

| Type |
|------|
| `'toolbar' \| 'palette' \| 'canvas' \| 'inspector' \| 'node'` |

### WorkflowRef

| Method | Type | Description |
|--------|------|-------------|
| getGraph | `() => WorkflowGraph` | Current graph |
| validate | `() => WorkflowValidationError[]` | Validate and mark nodes |
| autoLayout | `() => void` | Re-layout left to right |
| fitView | `() => void` | Fit the viewport |

### WorkflowNodeTypeDef

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| title | `string` | Display name | - |
| icon | `React.ReactNode` | Icon | - |
| color | `string` | Accent color | - |
| category | `string` | Palette group | `locale.defaultCategory` |
| creatable | `boolean` | Appears in the palette | `true` |
| unique | `boolean` | Only one instance allowed | `false` |
| defaultData | `Partial<D> \| (() => Partial<D>)` | Default `data` for new nodes | - |
| target | `boolean` | Has an incoming port | `true` |
| sourceHandles | `(data: D) => WorkflowHandle[]` | Outgoing ports, `[]` for terminal nodes | single `source` |
| outputs | `string[] \| ((data: D) => string[])` | Fields exposed downstream | - |
| renderSummary | `(ctx: WorkflowSummaryContext<D>) => ReactNode` | Card body | - |
| renderForm | `(ctx: WorkflowFormContext<D>) => ReactNode` | Inspector form | - |
| validate | `(data: D, node) => string[] \| void` | Field validation | - |

### WorkflowLocale

Text overrides via `<Workflow locale={...}>`. Built-in defaults are Simplified Chinese. Fields carrying `{count}` / `{names}` / `{type}` / `{title}` / `{problem}` placeholders are filled at render time.

| Field | Default |
|-------|---------|
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

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| url | `string` | Endpoint that starts the run and streams SSE | - |
| headers | `Record<string, string>` | Extra headers | - |
| body | `Record<string, unknown>` | Merged into the request body | - |
| user | `string` | End user identifier | - |
| graph | `WorkflowGraph` | Graph being executed, for edge highlighting | - |
| onEvent | `(event: WorkflowSSEEvent) => void` | Per-frame callback | - |
| onFinish | `(state: WorkflowRunState) => void` | Stream finished callback | - |
| onError | `(error: unknown) => void` | Error callback | - |
| fetcher | `(init) => Promise<Response>` | Replaces the default `fetch` | - |

### Subcomponents and helpers

`WorkflowPalette`, `WorkflowCanvas`, `WorkflowInspector` and `WorkflowToolbar`
all read from context, so they can be composed into a custom layout inside
`<Workflow>`.

Helpers: `validateGraph`, `autoLayout`, `collectUpstreamVariables`,
`createNode`, `createEdge`, `selectorToTemplate`, `normalizeGraph`,
`createSSEParser`, `reduceRunEvent`, `replayRunEvents`, `createEmptyRunState`.

### Known limits

- DAGs only: no loops, iteration or nested sub-workflows.
- Variable references are one level deep, with no type inference.
- Not optimised for touch; dragging relies on mouse events.
- Comfortable up to a few dozen nodes; there is no virtualisation for thousands.
