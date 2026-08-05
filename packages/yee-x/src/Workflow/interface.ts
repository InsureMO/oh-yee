import type { ReactFlowProps } from '@xyflow/react';
import type React from 'react';

/* -------------------------------------------------------------------------- */
/*                             Graph (Dify DSL)                               */
/* -------------------------------------------------------------------------- */

/**
 * Built-in node type keys, aligned with Dify's `graph.nodes[].data.type`.
 * Any other string is allowed and resolved through the `nodeTypes` registry.
 */
export type WorkflowBuiltinNodeType =
  | 'start'
  | 'end'
  | 'answer'
  | 'llm'
  | 'if-else'
  | 'http-request'
  | 'code'
  | 'template-transform'
  | 'tool'
  | 'agent';

/**
 * A Dify variable reference, e.g. `['1000001', 'chinese_text']`.
 * The first item is the upstream node id (or `sys` / `conversation`),
 * the rest form the field path.
 */
export type WorkflowVariableSelector = string[];

/**
 * Shared shape of `node.data` in the Dify DSL. Type-specific fields are kept
 * open on purpose: the component never interprets them, the matching
 * {@link WorkflowNodeTypeDef} does.
 */
export interface WorkflowNodeData {
  /**
   * Node title shown on the card
   */
  title: string;
  /**
   * Node type key, resolved through the `nodeTypes` registry
   */
  type: WorkflowBuiltinNodeType | (string & NonNullable<unknown>);
  /**
   * Node description
   */
  desc?: string;
  [key: string]: unknown;
}

/**
 * A node in the Dify DSL `workflow.graph.nodes`.
 */
export interface WorkflowGraphNode<D extends WorkflowNodeData = WorkflowNodeData> {
  id: string;
  data: D;
  position: { x: number; y: number };
  /**
   * Kept for round-trip fidelity with Dify exports (always `custom` there)
   */
  type?: string;
  positionAbsolute?: { x: number; y: number };
  width?: number;
  height?: number;
  sourcePosition?: string;
  targetPosition?: string;
  zIndex?: number;
  [key: string]: unknown;
}

/**
 * An edge in the Dify DSL `workflow.graph.edges`.
 */
export interface WorkflowGraphEdge {
  id: string;
  source: string;
  target: string;
  /**
   * Outgoing port id. `source` for single-output nodes, the case id
   * (`true` / `false` / a case uuid) for `if-else` nodes.
   */
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
  zIndex?: number;
  data?: {
    sourceType?: string;
    targetType?: string;
    isInIteration?: boolean;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * The `workflow.graph` fragment of a Dify DSL file.
 */
export interface WorkflowGraph {
  nodes: WorkflowGraphNode[];
  edges: WorkflowGraphEdge[];
  viewport?: { x: number; y: number; zoom: number };
}

/* -------------------------------------------------------------------------- */
/*                                 Run state                                  */
/* -------------------------------------------------------------------------- */

export type WorkflowNodeStatus =
  | 'idle'
  | 'running'
  | 'succeeded'
  | 'failed'
  | 'skipped';

export type WorkflowRunStatus =
  | 'idle'
  | 'running'
  | 'succeeded'
  | 'failed'
  | 'stopped'
  | 'paused'
  | 'partial-succeeded';

/**
 * Per-node execution state, reduced from the SSE stream.
 */
export interface WorkflowNodeRunState {
  nodeId: string;
  status: WorkflowNodeStatus;
  nodeType?: string;
  title?: string;
  /**
   * Execution order index reported by the backend
   */
  index?: number;
  /**
   * Unix timestamp (seconds) reported by `node_started`
   */
  createdAt?: number;
  /**
   * Seconds, as reported by `node_finished`
   */
  elapsedTime?: number;
  totalTokens?: number;
  inputs?: unknown;
  outputs?: unknown;
  error?: string;
}

/**
 * Aggregated run state. Decoupled from {@link WorkflowGraph} so a read-only
 * replay never has to mutate the graph itself.
 */
export interface WorkflowRunState {
  status: WorkflowRunStatus;
  taskId?: string;
  workflowRunId?: string;
  /**
   * Keyed by node id
   */
  nodes: Record<string, WorkflowNodeRunState>;
  /**
   * Node ids in the order they started, for the log panel
   */
  order: string[];
  /**
   * Edges traversed so far, used for highlighting
   */
  activeEdgeIds: string[];
  /**
   * Final outputs of the run
   */
  outputs?: Record<string, unknown>;
  /**
   * Concatenated `text_chunk` payloads
   */
  text?: string;
  error?: string;
  elapsedTime?: number;
  totalTokens?: number;
}

/* -------------------------------------------------------------------------- */
/*                              SSE event shapes                              */
/* -------------------------------------------------------------------------- */

/**
 * A single Dify SSE frame. Unknown `event` values are ignored by the reducer,
 * so newer Dify versions do not break the stream.
 */
export interface WorkflowSSEEvent {
  event: string;
  task_id?: string;
  workflow_run_id?: string;
  message_id?: string;
  data?: Record<string, any>;
  /**
   * Present on `error` frames
   */
  code?: string;
  message?: string;
  status?: number | string;
}

/* -------------------------------------------------------------------------- */
/*                             Node type registry                             */
/* -------------------------------------------------------------------------- */

/**
 * An outgoing port of a node.
 */
export interface WorkflowHandle {
  id: string;
  label?: string;
}

/**
 * A variable exposed by an upstream node, offered by the variable picker.
 */
export interface WorkflowUpstreamVariable {
  nodeId: string;
  nodeTitle: string;
  nodeType: string;
  /**
   * Field name on that node, e.g. `text` for an llm node
   */
  field: string;
  /**
   * `['1000002', 'text']`
   */
  selector: WorkflowVariableSelector;
  /**
   * Dify template placeholder, e.g. `{{#1000002.text#}}`
   */
  template: string;
  label?: string;
}

export interface WorkflowFormContext<D extends WorkflowNodeData = WorkflowNodeData> {
  node: WorkflowGraphNode<D>;
  data: D;
  /**
   * Patch the node data. Shallow merged.
   */
  onChange: (patch: Partial<D>) => void;
  /**
   * Variables reachable from upstream nodes
   */
  variables: WorkflowUpstreamVariable[];
  disabled?: boolean;
}

export interface WorkflowSummaryContext<D extends WorkflowNodeData = WorkflowNodeData> {
  node: WorkflowGraphNode<D>;
  data: D;
  status?: WorkflowNodeStatus;
  run?: WorkflowNodeRunState;
}

/**
 * Describes how a node type looks, what it can be configured with, and how it
 * is validated. Consumers can register their own or override built-ins.
 */
export interface WorkflowNodeTypeDef<D extends WorkflowNodeData = any> {
  /**
   * Display name in the palette and on the card
   */
  title: string;
  icon?: React.ReactNode;
  /**
   * Accent color of the card header
   */
  color?: string;
  /**
   * Palette group
   */
  category?: string;
  /**
   * Whether the type shows up in the palette
   * @default true
   */
  creatable?: boolean;
  /**
   * Whether only one instance is allowed in a graph (start / end)
   * @default false
   */
  unique?: boolean;
  /**
   * Default `data` for a newly created node
   */
  defaultData?: Partial<D> | (() => Partial<D>);
  /**
   * Whether the node accepts an incoming connection
   * @default true
   */
  target?: boolean;
  /**
   * Outgoing ports. Defaults to a single `source` port.
   * Return `[]` for terminal nodes such as `end` / `answer`.
   */
  sourceHandles?: (data: D) => WorkflowHandle[];
  /**
   * Field names this node exposes to downstream nodes
   */
  outputs?: string[] | ((data: D) => string[]);
  /**
   * Extra content rendered inside the card body
   */
  renderSummary?: (ctx: WorkflowSummaryContext<D>) => React.ReactNode;
  /**
   * Configuration form rendered in the inspector
   */
  renderForm?: (ctx: WorkflowFormContext<D>) => React.ReactNode;
  /**
   * Returns human readable problems with the node configuration
   */
  validate?: (data: D, node: WorkflowGraphNode<D>) => string[] | void;
}

export type WorkflowNodeTypes = Record<string, WorkflowNodeTypeDef>;

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

export type WorkflowValidationCode =
  | 'no-start'
  | 'no-end'
  | 'multiple-start'
  | 'isolated-node'
  | 'unreachable-node'
  | 'dead-end-node'
  | 'cycle'
  | 'unknown-node-type'
  | 'node-invalid';

export interface WorkflowValidationError {
  code: WorkflowValidationCode;
  message: string;
  /**
   * Related node ids
   */
  nodeIds?: string[];
}

/* -------------------------------------------------------------------------- */
/*                                   Locale                                   */
/* -------------------------------------------------------------------------- */

export interface WorkflowLocale {
  paletteTitle: string;
  paletteHint: string;
  inspectorTitle: string;
  inspectorEmpty: string;
  fieldTitle: string;
  fieldDesc: string;
  /**
   * Variable picker trigger label
   */
  insertVariable: string;
  noVariable: string;
  /**
   * Placeholder of the upstream variable selector
   */
  selectUpstreamVariable: string;
  /**
   * Inspector section title for a node's run inputs
   */
  input: string;
  output: string;
  error: string;
  elapsed: string;
  tokens: string;
  running: string;
  succeeded: string;
  failed: string;
  skipped: string;
  validate: string;
  validatePassed: string;
  /**
   * Toolbar summary when more than one validation error is found.
   * `{count}` is replaced with the total.
   */
  moreErrors: string;
  autoLayout: string;
  fitView: string;
  zoomIn: string;
  zoomOut: string;
  deleteNode: string;
  /**
   * Palette group for node types that do not declare a `category`
   */
  defaultCategory: string;
  /**
   * Default label / empty hint of the repeatable row editor
   */
  listAdd: string;
  listEmpty: string;
  /**
   * Structural validation messages. `{names}`, `{type}`, `{title}` and
   * `{problem}` are replaced with the relevant values.
   */
  validationNoStart: string;
  validationMultipleStart: string;
  validationNoEnd: string;
  validationIsolated: string;
  validationUnreachable: string;
  validationDeadEnd: string;
  validationCycle: string;
  validationUnknownType: string;
  validationNodeInvalid: string;
}

/* -------------------------------------------------------------------------- */
/*                                    Props                                   */
/* -------------------------------------------------------------------------- */

export type CompositionDOM =
  | 'toolbar'
  | 'palette'
  | 'canvas'
  | 'inspector'
  | 'node';

export interface WorkflowRef {
  /**
   * Current graph
   */
  getGraph: () => WorkflowGraph;
  /**
   * Run the validators and return the problems found
   */
  validate: () => WorkflowValidationError[];
  /**
   * Re-layout the graph left to right
   */
  autoLayout: () => void;
  /**
   * Fit the whole graph into the viewport
   */
  fitView: () => void;
}

export interface WorkflowProps {
  /**
   * Custom class name prefix
   * @default yee-workflow
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root inline style
   */
  style?: React.CSSProperties;
  /**
   * Semantic structure class names
   */
  classNames?: Partial<Record<CompositionDOM, string>>;
  /**
   * Semantic structure inline styles
   */
  styles?: Partial<Record<CompositionDOM, React.CSSProperties>>;
  /**
   * Controlled graph, in Dify `workflow.graph` shape
   */
  value?: WorkflowGraph;
  /**
   * Uncontrolled initial graph
   */
  defaultValue?: WorkflowGraph;
  /**
   * Fired whenever the graph changes (drag, connect, delete, config edit)
   */
  onChange?: (graph: WorkflowGraph) => void;
  /**
   * `view` renders a read-only canvas, `edit` enables drag / connect / config
   * @default view
   */
  mode?: 'edit' | 'view';
  /**
   * Extra or overriding node type definitions, merged over the built-ins
   */
  nodeTypes?: WorkflowNodeTypes;
  /**
   * Execution state overlay, typically produced by `useWorkflowRun`
   */
  runState?: WorkflowRunState;
  /**
   * Controlled selected node id
   */
  selectedNodeId?: string | null;
  /**
   * Fired when the selected node changes
   */
  onSelectedNodeChange?: (nodeId: string | null) => void;
  /**
   * Fired on node click, before selection is applied
   */
  onNodeClick?: (node: WorkflowGraphNode) => void;
  /**
   * Root height
   * @default 560
   */
  height?: number | string;
  /**
   * Show the left node palette. Defaults to `true` in edit mode.
   */
  palette?: boolean;
  /**
   * Show the right inspector panel. Defaults to `true` in edit mode.
   */
  inspector?: boolean;
  /**
   * Show the top toolbar
   * @default true
   */
  toolbar?: boolean;
  /**
   * Show the minimap
   * @default false
   */
  minimap?: boolean;
  /**
   * Show the dotted background
   * @default true
   */
  background?: boolean;
  /**
   * Fit the graph into the viewport on mount
   * @default true
   */
  fitView?: boolean;
  /**
   * Fired after validation runs (toolbar button or `ref.validate()`)
   */
  onValidate?: (errors: WorkflowValidationError[]) => void;
  /**
   * Text overrides
   */
  locale?: Partial<WorkflowLocale>;
  /**
   * Escape hatch, forwarded to the underlying `<ReactFlow>`.
   *
   * The props that wire the canvas to the DSL graph (`nodes`, `edges`,
   * `nodeTypes` and the change handlers) are owned by the component and cannot
   * be overridden.
   */
  reactFlowProps?: Omit<
    // `any` generics on purpose: the node/edge shape is owned by the component,
    // and pinning it here would make every forwarded handler invariant.
    Partial<ReactFlowProps<any, any>>,
    | 'nodes'
    | 'edges'
    | 'defaultNodes'
    | 'defaultEdges'
    | 'nodeTypes'
    | 'onNodesChange'
    | 'onEdgesChange'
    | 'onConnect'
  >;
}
