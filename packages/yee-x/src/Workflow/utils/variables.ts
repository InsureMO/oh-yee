import type {
  WorkflowGraph,
  WorkflowNodeTypes,
  WorkflowUpstreamVariable,
} from '../interface';
import { resolveOutputs, selectorToTemplate } from './dify';

/**
 * System variables available to every node in a Dify workflow.
 */
export const SYS_VARIABLES: WorkflowUpstreamVariable[] = [
  {
    nodeId: 'sys',
    nodeTitle: '系统',
    nodeType: 'sys',
    field: 'query',
    selector: ['sys', 'query'],
    template: '{{#sys.query#}}',
    label: '用户输入',
  },
  {
    nodeId: 'sys',
    nodeTitle: '系统',
    nodeType: 'sys',
    field: 'user_id',
    selector: ['sys', 'user_id'],
    template: '{{#sys.user_id#}}',
    label: '用户 ID',
  },
  {
    nodeId: 'sys',
    nodeTitle: '系统',
    nodeType: 'sys',
    field: 'files',
    selector: ['sys', 'files'],
    template: '{{#sys.files#}}',
    label: '上传文件',
  },
];

/**
 * Collect the variables a node can reference: every field exposed by any
 * ancestor node, plus the system variables.
 *
 * Only direct field names are offered -- no nested path drilling and no type
 * inference. That covers the common cases without pulling in Dify's full
 * variable resolution machinery.
 */
export const collectUpstreamVariables = (
  nodeId: string,
  graph: WorkflowGraph,
  nodeTypes: WorkflowNodeTypes,
  options: { includeSys?: boolean } = {},
): WorkflowUpstreamVariable[] => {
  const { includeSys = true } = options;

  const parents = new Map<string, string[]>();
  graph.edges.forEach((edge) => {
    const list = parents.get(edge.target) ?? [];
    list.push(edge.source);
    parents.set(edge.target, list);
  });

  const ancestors: string[] = [];
  const seen = new Set<string>([nodeId]);
  const queue = [...(parents.get(nodeId) ?? [])];
  while (queue.length) {
    const id = queue.shift()!;
    if (seen.has(id)) continue;
    seen.add(id);
    ancestors.push(id);
    (parents.get(id) ?? []).forEach((parent) => queue.push(parent));
  }

  const variables: WorkflowUpstreamVariable[] = [];

  ancestors.forEach((id) => {
    const node = graph.nodes.find((item) => item.id === id);
    if (!node) return;
    const type = String(node.data?.type);
    const def = nodeTypes[type];

    // The start node exposes the input variables the user declared on it.
    if (type === 'start') {
      const declared = (node.data?.variables as any[]) || [];
      declared.forEach((variable) => {
        const field = String(variable?.variable ?? '');
        if (!field) return;
        const selector = [id, field];
        variables.push({
          nodeId: id,
          nodeTitle: String(node.data?.title ?? id),
          nodeType: type,
          field,
          selector,
          template: selectorToTemplate(selector),
          label: variable?.label ? String(variable.label) : field,
        });
      });
      return;
    }

    resolveOutputs(node.data, def).forEach((field) => {
      const selector = [id, field];
      variables.push({
        nodeId: id,
        nodeTitle: String(node.data?.title ?? id),
        nodeType: type,
        field,
        selector,
        template: selectorToTemplate(selector),
        label: field,
      });
    });
  });

  return includeSys ? [...variables, ...SYS_VARIABLES] : variables;
};
