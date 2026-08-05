import { createContext, useContext } from 'react';
import type {
  CompositionDOM,
  WorkflowGraph,
  WorkflowLocale,
  WorkflowNodeData,
  WorkflowNodeTypes,
  WorkflowRunState,
  WorkflowValidationError,
} from './interface';

export const DEFAULT_LOCALE: WorkflowLocale = {
  paletteTitle: '节点',
  paletteHint: '拖拽到画布，或点击添加',
  inspectorTitle: '节点配置',
  inspectorEmpty: '选中一个节点进行配置',
  fieldTitle: '节点名称',
  fieldDesc: '描述',
  insertVariable: '插入变量',
  noVariable: '没有可引用的上游变量',
  selectUpstreamVariable: '选择上游变量',
  input: '输入',
  output: '输出',
  error: '错误',
  elapsed: '耗时',
  tokens: 'Tokens',
  running: '运行中',
  succeeded: '成功',
  failed: '失败',
  skipped: '已跳过',
  validate: '校验',
  validatePassed: '校验通过',
  moreErrors: '等 {count} 项',
  autoLayout: '自动布局',
  fitView: '适应画布',
  zoomIn: '放大',
  zoomOut: '缩小',
  deleteNode: '删除节点',
  defaultCategory: '其他',
  listAdd: '添加',
  listEmpty: '暂无配置',
  validationNoStart: '缺少开始节点',
  validationMultipleStart: '存在多个开始节点',
  validationNoEnd: '缺少结束节点',
  validationIsolated: '存在未连线的节点：{names}',
  validationUnreachable: '以下节点无法从开始节点到达：{names}',
  validationDeadEnd: '以下节点没有后续连线：{names}',
  validationCycle: '流程中存在环，当前仅支持有向无环图',
  validationUnknownType: '未注册的节点类型：{type}',
  validationNodeInvalid: '{title}：{problem}',
};

export interface WorkflowContextValue {
  prefixCls: string;
  mode: 'edit' | 'view';
  nodeTypes: WorkflowNodeTypes;
  runState?: WorkflowRunState;
  locale: WorkflowLocale;
  graph: WorkflowGraph;
  classNames?: Partial<Record<CompositionDOM, string>>;
  styles?: Partial<Record<CompositionDOM, React.CSSProperties>>;
  /**
   * Node ids flagged by the last validation run
   */
  invalidNodeIds: string[];
  selectedNodeId: string | null;
  selectNode: (nodeId: string | null) => void;
  /**
   * Replace the whole graph (controlled or uncontrolled) and notify `onChange`
   */
  setGraph: (graph: WorkflowGraph) => void;
  updateNodeData: (nodeId: string, patch: Partial<WorkflowNodeData>) => void;
  removeNode: (nodeId: string) => void;
  /**
   * Append a node of the given type. Falls back to the viewport center.
   */
  addNode: (type: string, position?: { x: number; y: number }) => void;
  /**
   * Re-layout the graph left to right
   */
  runAutoLayout: () => void;
  /**
   * Run the validators, store the offending node ids and fire `onValidate`
   */
  validateNow: () => WorkflowValidationError[];
}

export const WorkflowContext = createContext<WorkflowContextValue | null>(null);

export const useWorkflowContext = () => {
  const ctx = useContext(WorkflowContext);
  if (!ctx) {
    throw new Error(
      '[yee-x] Workflow subcomponents must be rendered inside <Workflow>.',
    );
  }
  return ctx;
};
