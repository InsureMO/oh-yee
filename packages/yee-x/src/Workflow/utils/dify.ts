import type { Edge, Node } from '@xyflow/react';
import type {
  WorkflowGraph,
  WorkflowGraphEdge,
  WorkflowGraphNode,
  WorkflowNodeData,
  WorkflowNodeTypeDef,
  WorkflowNodeTypes,
  WorkflowRunState,
  WorkflowVariableSelector,
} from '../interface';

/**
 * Internal node component key registered with `<ReactFlow nodeTypes>`.
 * Dify stores `custom` on every node; that value is preserved on `raw`.
 */
export const FLOW_NODE_TYPE = 'yeeWorkflowNode';

export const DEFAULT_NODE_WIDTH = 244;

/**
 * Payload carried by every xyflow node. The original DSL node is kept intact
 * so unknown fields survive a full edit round-trip.
 */
export interface FlowNodeData extends Record<string, unknown> {
  raw: WorkflowGraphNode;
}

export interface FlowEdgeData extends Record<string, unknown> {
  raw: WorkflowGraphEdge;
}

export type FlowNode = Node<FlowNodeData, typeof FLOW_NODE_TYPE>;
export type FlowEdge = Edge<FlowEdgeData>;

const EMPTY_GRAPH: WorkflowGraph = { nodes: [], edges: [] };

export const normalizeGraph = (graph?: WorkflowGraph | null): WorkflowGraph => {
  if (!graph) return { ...EMPTY_GRAPH };
  return {
    nodes: Array.isArray(graph.nodes) ? graph.nodes : [],
    edges: Array.isArray(graph.edges) ? graph.edges : [],
    viewport: graph.viewport,
  };
};

/**
 * `['1000002', 'text']` -> `{{#1000002.text#}}`
 */
export const selectorToTemplate = (selector: WorkflowVariableSelector) =>
  `{{#${selector.join('.')}#}}`;

/**
 * Resolve the outgoing ports of a node.
 * `if-else` nodes derive them from `data.cases`, everything else gets a single
 * `source` port unless the definition says otherwise.
 */
export const resolveSourceHandles = (
  data: WorkflowNodeData,
  def?: WorkflowNodeTypeDef,
) => {
  if (def?.sourceHandles) return def.sourceHandles(data);
  return [{ id: 'source' }];
};

export const resolveOutputs = (
  data: WorkflowNodeData,
  def?: WorkflowNodeTypeDef,
): string[] => {
  const outputs = def?.outputs;
  if (!outputs) return [];
  return typeof outputs === 'function' ? outputs(data) ?? [] : outputs;
};

/* -------------------------------------------------------------------------- */
/*                              graph <-> xyflow                              */
/* -------------------------------------------------------------------------- */

export const graphToFlowNodes = (
  graph: WorkflowGraph,
  /**
   * Selection is derived from the component state rather than xyflow's internal
   * flag: editing a node's config rebuilds the flow nodes, which would
   * otherwise drop the highlight mid-typing.
   */
  selectedNodeId?: string | null,
): FlowNode[] =>
  graph.nodes.map((node) => ({
    id: node.id,
    type: FLOW_NODE_TYPE,
    position: node.position ?? { x: 0, y: 0 },
    data: { raw: node },
    selected: node.id === selectedNodeId,
    width: typeof node.width === 'number' ? node.width : DEFAULT_NODE_WIDTH,
    // `height` from the DSL is deliberately dropped: it was measured against
    // Dify's own card design and would clip ours. The real height is measured
    // after render and written back on the next commit.
  }));

/**
 * Resolve the label of a specific source handle, e.g. `IF` / `ELIF 1` / `ELSE`
 * on an `if-else` node. Returns `undefined` when the type does not declare
 * labels or the node is unknown, so the edge simply drops its label rather
 * than showing the raw handle id (a case uuid is meaningless to users).
 */
const edgeHandleLabel = (
  graph: WorkflowGraph,
  nodeTypes: WorkflowNodeTypes | undefined,
  sourceId: string,
  handleId: string,
): string | undefined => {
  if (!nodeTypes) return undefined;
  const source = graph.nodes.find((node) => node.id === sourceId);
  if (!source) return undefined;
  const def = nodeTypes[String(source.data?.type)];
  if (!def) return undefined;
  return resolveSourceHandles(source.data, def).find(
    (handle) => handle.id === handleId,
  )?.label;
};

export const graphToFlowEdges = (
  graph: WorkflowGraph,
  runState?: WorkflowRunState,
  nodeTypes?: WorkflowNodeTypes,
): FlowEdge[] =>
  graph.edges.map((edge) => {
    const active = !!runState?.activeEdgeIds?.includes(edge.id);
    const sourceHandle = edge.sourceHandle ?? 'source';
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle,
      targetHandle: edge.targetHandle ?? 'target',
      type: 'smoothstep',
      animated: active && runState?.status === 'running',
      data: { raw: edge },
      className: active ? 'yee-workflow-edge-active' : undefined,
      label:
        sourceHandle !== 'source'
          ? edgeHandleLabel(graph, nodeTypes, edge.source, sourceHandle)
          : undefined,
    };
  });

/**
 * Rebuild the DSL graph out of the live xyflow state, preserving every field
 * the component does not understand.
 */
export const flowToGraph = (
  nodes: FlowNode[],
  edges: FlowEdge[],
  prev: WorkflowGraph,
): WorkflowGraph => ({
  ...prev,
  nodes: nodes.map((node) => {
    const raw = node.data.raw;
    const position = {
      x: Math.round(node.position.x),
      y: Math.round(node.position.y),
    };
    const next: WorkflowGraphNode = {
      ...raw,
      id: node.id,
      position,
      positionAbsolute: position,
    };
    if (typeof node.measured?.width === 'number') next.width = node.measured.width;
    if (typeof node.measured?.height === 'number') next.height = node.measured.height;
    return next;
  }),
  edges: edges.map((edge) => {
    const raw = edge.data?.raw;
    return {
      ...raw,
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle ?? 'source',
      targetHandle: edge.targetHandle ?? 'target',
      type: raw?.type ?? 'custom',
    } as WorkflowGraphEdge;
  }),
});

/* -------------------------------------------------------------------------- */
/*                                  factories                                 */
/* -------------------------------------------------------------------------- */

let idSeed = 0;

/**
 * Dify ids are numeric strings; keep the same shape so exported DSL imports
 * back into Dify without surprises.
 */
export const createNodeId = () => {
  idSeed += 1;
  return `${Date.now()}${String(idSeed).padStart(3, '0')}`;
};

export const createNode = (
  type: string,
  def: WorkflowNodeTypeDef | undefined,
  position: { x: number; y: number },
): WorkflowGraphNode => {
  const defaults =
    typeof def?.defaultData === 'function'
      ? def.defaultData()
      : def?.defaultData ?? {};
  return {
    id: createNodeId(),
    type: 'custom',
    position,
    positionAbsolute: position,
    width: DEFAULT_NODE_WIDTH,
    sourcePosition: 'right',
    targetPosition: 'left',
    data: {
      title: def?.title ?? type,
      ...defaults,
      type,
    } as WorkflowNodeData,
  };
};

export const createEdge = (
  source: string,
  target: string,
  sourceHandle: string | null | undefined,
  targetHandle: string | null | undefined,
  nodes: WorkflowGraphNode[],
): WorkflowGraphEdge => {
  const handle = sourceHandle || 'source';
  const targetHandleId = targetHandle || 'target';
  return {
    id: `${source}-${handle}-${target}-${targetHandleId}`,
    source,
    target,
    sourceHandle: handle,
    targetHandle: targetHandleId,
    type: 'custom',
    zIndex: 0,
    data: {
      isInIteration: false,
      sourceType: nodes.find((n) => n.id === source)?.data?.type,
      targetType: nodes.find((n) => n.id === target)?.data?.type,
    },
  };
};

/**
 * Whether a node type has reached its allowed instance count.
 */
export const isTypeExhausted = (
  type: string,
  nodeTypes: WorkflowNodeTypes,
  nodes: WorkflowGraphNode[],
) => {
  const def = nodeTypes[type];
  if (!def?.unique) return false;
  return nodes.some((node) => node.data?.type === type);
};
