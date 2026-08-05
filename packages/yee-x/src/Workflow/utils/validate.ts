import { DEFAULT_LOCALE } from '../context';
import type {
  WorkflowGraph,
  WorkflowLocale,
  WorkflowNodeTypes,
  WorkflowValidationError,
} from '../interface';

const TERMINAL_TYPES = ['end', 'answer'];

const fill = (template: string, vars: Record<string, string>) =>
  Object.keys(vars).reduce(
    (text, key) => text.replace(`{${key}}`, vars[key]),
    template,
  );

/**
 * Structural + per-node validation of a graph.
 *
 * Structural rules are intentionally the ones a business user can actually hit:
 * missing entry point, dangling nodes, cycles. Field level rules are delegated
 * to each node type's own `validate`, so custom node types validate themselves.
 *
 * Messages are rendered from `locale` (defaults to the built-in Chinese), so a
 * consumer that passes its own `locale` to `<Workflow>` gets localised error
 * strings on `onValidate` and `ref.validate()` too.
 */
export const validateGraph = (
  graph: WorkflowGraph,
  nodeTypes: WorkflowNodeTypes,
  locale: WorkflowLocale = DEFAULT_LOCALE,
): WorkflowValidationError[] => {
  const errors: WorkflowValidationError[] = [];
  const { nodes, edges } = graph;

  if (!nodes.length) return errors;

  const starts = nodes.filter((node) => node.data?.type === 'start');
  if (!starts.length) {
    errors.push({ code: 'no-start', message: locale.validationNoStart });
  } else if (starts.length > 1) {
    errors.push({
      code: 'multiple-start',
      message: locale.validationMultipleStart,
      nodeIds: starts.map((node) => node.id),
    });
  }

  const ends = nodes.filter((node) =>
    TERMINAL_TYPES.includes(String(node.data?.type)),
  );
  if (!ends.length) {
    errors.push({ code: 'no-end', message: locale.validationNoEnd });
  }

  const outgoing = new Map<string, string[]>();
  const incoming = new Map<string, string[]>();
  nodes.forEach((node) => {
    outgoing.set(node.id, []);
    incoming.set(node.id, []);
  });
  edges.forEach((edge) => {
    outgoing.get(edge.source)?.push(edge.target);
    incoming.get(edge.target)?.push(edge.source);
  });

  // Isolated nodes: neither in nor out.
  const isolated = nodes.filter(
    (node) =>
      !incoming.get(node.id)?.length &&
      !outgoing.get(node.id)?.length &&
      node.data?.type !== 'start',
  );
  if (isolated.length) {
    errors.push({
      code: 'isolated-node',
      message: fill(locale.validationIsolated, {
        names: isolated.map((node) => node.data?.title || node.id).join('、'),
      }),
      nodeIds: isolated.map((node) => node.id),
    });
  }

  // Unreachable from any start node.
  if (starts.length) {
    const reachable = new Set<string>();
    const queue = starts.map((node) => node.id);
    while (queue.length) {
      const id = queue.shift()!;
      if (reachable.has(id)) continue;
      reachable.add(id);
      (outgoing.get(id) ?? []).forEach((next) => queue.push(next));
    }
    const unreachable = nodes.filter(
      (node) =>
        !reachable.has(node.id) &&
        !isolated.some((isolatedNode) => isolatedNode.id === node.id),
    );
    if (unreachable.length) {
      errors.push({
        code: 'unreachable-node',
        message: fill(locale.validationUnreachable, {
          names: unreachable.map((node) => node.data?.title || node.id).join('、'),
        }),
        nodeIds: unreachable.map((node) => node.id),
      });
    }
  }

  // Non-terminal nodes without an outgoing edge.
  const deadEnds = nodes.filter(
    (node) =>
      !TERMINAL_TYPES.includes(String(node.data?.type)) &&
      !outgoing.get(node.id)?.length &&
      !isolated.some((isolatedNode) => isolatedNode.id === node.id),
  );
  if (deadEnds.length) {
    errors.push({
      code: 'dead-end-node',
      message: fill(locale.validationDeadEnd, {
        names: deadEnds.map((node) => node.data?.title || node.id).join('、'),
      }),
      nodeIds: deadEnds.map((node) => node.id),
    });
  }

  // Cycle detection (white / grey / black DFS).
  const state = new Map<string, 0 | 1 | 2>();
  const cycleNodes = new Set<string>();
  const walk = (id: string) => {
    state.set(id, 1);
    (outgoing.get(id) ?? []).forEach((next) => {
      const nextState = state.get(next) ?? 0;
      if (nextState === 1) {
        cycleNodes.add(id);
        cycleNodes.add(next);
      } else if (nextState === 0) {
        walk(next);
      }
    });
    state.set(id, 2);
  };
  nodes.forEach((node) => {
    if ((state.get(node.id) ?? 0) === 0) walk(node.id);
  });
  if (cycleNodes.size) {
    errors.push({
      code: 'cycle',
      message: locale.validationCycle,
      nodeIds: Array.from(cycleNodes),
    });
  }

  // Per node validation.
  nodes.forEach((node) => {
    const type = String(node.data?.type);
    const def = nodeTypes[type];
    if (!def) {
      errors.push({
        code: 'unknown-node-type',
        message: fill(locale.validationUnknownType, { type }),
        nodeIds: [node.id],
      });
      return;
    }
    const problems = def.validate?.(node.data, node) || [];
    problems.forEach((problem) => {
      errors.push({
        code: 'node-invalid',
        message: fill(locale.validationNodeInvalid, {
          title: String(node.data?.title || node.id),
          problem,
        }),
        nodeIds: [node.id],
      });
    });
  });

  return errors;
};
