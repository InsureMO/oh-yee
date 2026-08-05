import type { WorkflowGraph, WorkflowGraphNode } from '../interface';
import { DEFAULT_NODE_WIDTH } from './dify';

export interface AutoLayoutOptions {
  /**
   * Horizontal gap between two layers
   * @default 60
   */
  columnGap?: number;
  /**
   * Vertical gap between two nodes of the same layer
   * @default 40
   */
  rowGap?: number;
  /**
   * Fallback node height when the DSL does not carry one
   * @default 100
   */
  nodeHeight?: number;
  startX?: number;
  startY?: number;
}

/**
 * Layer the DAG left to right by longest path depth.
 *
 * Deliberately dependency-free: a workflow built by hand rarely exceeds a few
 * dozen nodes, so a simple layered pass is enough and keeps `dagre` out of the
 * bundle. Cycles are tolerated -- a node already being visited is skipped
 * instead of recursing forever.
 */
export const autoLayout = (
  graph: WorkflowGraph,
  options: AutoLayoutOptions = {},
): WorkflowGraph => {
  const {
    columnGap = 60,
    rowGap = 40,
    nodeHeight = 100,
    startX = 30,
    startY = 30,
  } = options;

  const { nodes, edges } = graph;
  if (!nodes.length) return graph;

  const incoming = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();
  nodes.forEach((node) => {
    incoming.set(node.id, []);
    outgoing.set(node.id, []);
  });
  edges.forEach((edge) => {
    if (!incoming.has(edge.target) || !outgoing.has(edge.source)) return;
    incoming.get(edge.target)!.push(edge.source);
    outgoing.get(edge.source)!.push(edge.target);
  });

  const depths = new Map<string, number>();
  const visiting = new Set<string>();

  const depthOf = (id: string): number => {
    const cached = depths.get(id);
    if (cached !== undefined) return cached;
    if (visiting.has(id)) return 0;
    visiting.add(id);
    const parents = incoming.get(id) ?? [];
    const depth = parents.length
      ? Math.max(...parents.map((parent) => depthOf(parent) + 1))
      : 0;
    visiting.delete(id);
    depths.set(id, depth);
    return depth;
  };

  nodes.forEach((node) => depthOf(node.id));

  const layers = new Map<number, WorkflowGraphNode[]>();
  nodes.forEach((node) => {
    const depth = depths.get(node.id) ?? 0;
    const layer = layers.get(depth) ?? [];
    layer.push(node);
    layers.set(depth, layer);
  });

  const heightOf = (node: WorkflowGraphNode) =>
    typeof node.height === 'number' && node.height > 0 ? node.height : nodeHeight;
  const widthOf = (node: WorkflowGraphNode) =>
    typeof node.width === 'number' && node.width > 0 ? node.width : DEFAULT_NODE_WIDTH;

  const tallestLayer = Math.max(
    ...Array.from(layers.values()).map(
      (layer) =>
        layer.reduce((sum, node) => sum + heightOf(node) + rowGap, 0) - rowGap,
    ),
  );

  const positions = new Map<string, { x: number; y: number }>();
  let x = startX;
  Array.from(layers.keys())
    .sort((a, b) => a - b)
    .forEach((depth) => {
      const layer = layers.get(depth)!;
      const layerHeight =
        layer.reduce((sum, node) => sum + heightOf(node) + rowGap, 0) - rowGap;
      let y = startY + (tallestLayer - layerHeight) / 2;
      layer.forEach((node) => {
        positions.set(node.id, { x, y: Math.round(y) });
        y += heightOf(node) + rowGap;
      });
      x += Math.max(...layer.map(widthOf)) + columnGap;
    });

  return {
    ...graph,
    nodes: nodes.map((node) => {
      const position = positions.get(node.id) ?? node.position;
      return { ...node, position, positionAbsolute: position };
    }),
  };
};
