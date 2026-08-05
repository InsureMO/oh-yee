import type {
  WorkflowGraph,
  WorkflowNodeRunState,
  WorkflowRunState,
  WorkflowRunStatus,
  WorkflowSSEEvent,
} from '../interface';

export const createEmptyRunState = (): WorkflowRunState => ({
  status: 'idle',
  nodes: {},
  order: [],
  activeEdgeIds: [],
});

/**
 * Incremental SSE frame parser.
 *
 * Chunks from `ReadableStream` split at arbitrary byte boundaries, so a frame
 * can straddle two chunks. This keeps a buffer and only emits complete frames
 * (`\n\n` terminated), which the naive "split the whole text" approach gets
 * wrong on slow connections.
 */
export const createSSEParser = () => {
  let buffer = '';

  return (chunk: string): WorkflowSSEEvent[] => {
    buffer += chunk.replace(/\r\n/g, '\n');
    const frames = buffer.split('\n\n');
    // The trailing piece may be incomplete; keep it for the next chunk.
    buffer = frames.pop() ?? '';

    const events: WorkflowSSEEvent[] = [];
    frames.forEach((frame) => {
      frame
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('data:'))
        .forEach((line) => {
          const payload = line.slice('data:'.length).trim();
          // Keep-alive frames arrive as a bare `event: ping` with no data.
          if (!payload || payload === '[DONE]') return;
          try {
            events.push(JSON.parse(payload));
          } catch {
            /* ignore malformed frames rather than killing the run */
          }
        });
    });
    return events;
  };
};

const RUN_STATUS: Record<string, WorkflowRunStatus> = {
  running: 'running',
  succeeded: 'succeeded',
  failed: 'failed',
  stopped: 'stopped',
  paused: 'paused',
  'partial-succeeded': 'partial-succeeded',
};

const toNumber = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

/**
 * Fold one Dify SSE frame into the run state.
 *
 * Unknown `event` values are returned unchanged, so iteration / loop / agent
 * log events from newer Dify versions degrade to "no visual update" instead of
 * throwing.
 */
export const reduceRunEvent = (
  state: WorkflowRunState,
  event: WorkflowSSEEvent,
  graph?: WorkflowGraph,
): WorkflowRunState => {
  const data = event.data ?? {};
  const taskId = event.task_id ?? state.taskId;
  const workflowRunId = event.workflow_run_id ?? state.workflowRunId;

  switch (event.event) {
    case 'workflow_started':
      return {
        ...createEmptyRunState(),
        status: 'running',
        taskId,
        workflowRunId,
      };

    case 'node_started': {
      const nodeId = String(data.node_id ?? '');
      if (!nodeId) return state;
      const node: WorkflowNodeRunState = {
        ...state.nodes[nodeId],
        nodeId,
        status: 'running',
        nodeType: data.node_type ? String(data.node_type) : undefined,
        title: data.title ? String(data.title) : undefined,
        index: toNumber(data.index),
        createdAt: toNumber(data.created_at),
        inputs: data.inputs,
      };
      // Light up the edges coming from nodes that already ran.
      const incoming = (graph?.edges ?? [])
        .filter(
          (edge) =>
            edge.target === nodeId &&
            !!state.nodes[edge.source] &&
            state.nodes[edge.source].status === 'succeeded',
        )
        .map((edge) => edge.id);
      return {
        ...state,
        status: 'running',
        taskId,
        workflowRunId,
        nodes: { ...state.nodes, [nodeId]: node },
        order: state.order.includes(nodeId)
          ? state.order
          : [...state.order, nodeId],
        activeEdgeIds: Array.from(
          new Set([...state.activeEdgeIds, ...incoming]),
        ),
      };
    }

    case 'node_finished': {
      const nodeId = String(data.node_id ?? '');
      if (!nodeId) return state;
      const failed = data.status === 'failed' || data.status === 'exception';
      const metadata = (data.execution_metadata ?? {}) as Record<string, any>;
      const node: WorkflowNodeRunState = {
        ...state.nodes[nodeId],
        nodeId,
        status:
          data.status === 'skipped'
            ? 'skipped'
            : failed
            ? 'failed'
            : 'succeeded',
        nodeType: data.node_type ? String(data.node_type) : state.nodes[nodeId]?.nodeType,
        title: data.title ? String(data.title) : state.nodes[nodeId]?.title,
        index: toNumber(data.index) ?? state.nodes[nodeId]?.index,
        elapsedTime: toNumber(data.elapsed_time),
        totalTokens: toNumber(metadata.total_tokens),
        inputs: data.inputs ?? state.nodes[nodeId]?.inputs,
        outputs: data.outputs,
        error: data.error ? String(data.error) : undefined,
      };
      return {
        ...state,
        taskId,
        workflowRunId,
        nodes: { ...state.nodes, [nodeId]: node },
      };
    }

    case 'text_chunk': {
      const text = data.text ? String(data.text) : '';
      if (!text) return state;
      return { ...state, text: `${state.text ?? ''}${text}` };
    }

    case 'workflow_finished': {
      return {
        ...state,
        taskId,
        workflowRunId,
        status: RUN_STATUS[String(data.status)] ?? 'succeeded',
        outputs: (data.outputs ?? undefined) as Record<string, unknown> | undefined,
        elapsedTime: toNumber(data.elapsed_time),
        totalTokens: toNumber(data.total_tokens),
        error: data.error ? String(data.error) : undefined,
      };
    }

    case 'error':
      return {
        ...state,
        status: 'failed',
        error: event.message ?? String(data.message ?? '未知错误'),
      };

    default:
      return state;
  }
};

/**
 * Replay a whole event list, useful for rendering a finished run from a log.
 */
export const replayRunEvents = (
  events: WorkflowSSEEvent[],
  graph?: WorkflowGraph,
): WorkflowRunState =>
  events.reduce(
    (state, event) => reduceRunEvent(state, event, graph),
    createEmptyRunState(),
  );
