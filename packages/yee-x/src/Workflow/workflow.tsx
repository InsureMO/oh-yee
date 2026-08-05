import { ReactFlowProvider, useReactFlow } from '@xyflow/react';
import clsx from 'clsx';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Canvas from './canvas';
import { DEFAULT_LOCALE, WorkflowContext, type WorkflowContextValue } from './context';
import Inspector from './inspector';
import type {
  WorkflowGraph,
  WorkflowNodeData,
  WorkflowProps,
  WorkflowRef,
} from './interface';
import { builtinNodeTypes } from './nodes';
import Palette from './palette';
import Toolbar from './toolbar';
import {
  createNode,
  DEFAULT_NODE_WIDTH,
  isTypeExhausted,
  normalizeGraph,
} from './utils/dify';
import { autoLayout } from './utils/layout';
import { validateGraph } from './utils/validate';

import './style/index.less';

interface InnerProps extends WorkflowProps {
  innerRef: React.ForwardedRef<WorkflowRef>;
}

const WorkflowInner = (props: InnerProps) => {
  const {
    prefixCls = 'yee-workflow',
    className,
    style,
    classNames,
    styles,
    value,
    defaultValue,
    onChange,
    mode = 'view',
    nodeTypes: customNodeTypes,
    runState,
    selectedNodeId: selectedNodeIdProp,
    onSelectedNodeChange,
    onNodeClick,
    height = 560,
    palette,
    inspector,
    toolbar = true,
    minimap = false,
    background = true,
    fitView = true,
    onValidate,
    locale: localeProp,
    reactFlowProps,
    innerRef,
  } = props;

  const editable = mode === 'edit';
  const showPalette = palette ?? editable;
  const showInspector = inspector ?? editable;

  const locale = useMemo(
    () => ({ ...DEFAULT_LOCALE, ...localeProp }),
    [localeProp],
  );

  const nodeTypes = useMemo(
    () => ({ ...builtinNodeTypes, ...customNodeTypes }),
    [customNodeTypes],
  );

  const [innerGraph, setInnerGraph] = useState<WorkflowGraph>(() =>
    normalizeGraph(value ?? defaultValue),
  );
  const controlled = value !== undefined;
  const graph = useMemo(
    () => (controlled ? normalizeGraph(value) : innerGraph),
    [controlled, value, innerGraph],
  );
  const graphRef = useRef(graph);
  graphRef.current = graph;

  const setGraph = useCallback(
    (next: WorkflowGraph) => {
      if (!controlled) setInnerGraph(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );

  const [innerSelected, setInnerSelected] = useState<string | null>(null);
  const selectedNodeId =
    selectedNodeIdProp !== undefined ? selectedNodeIdProp : innerSelected;

  const selectNode = useCallback(
    (nodeId: string | null) => {
      if (selectedNodeIdProp === undefined) setInnerSelected(nodeId);
      onSelectedNodeChange?.(nodeId);
    },
    [selectedNodeIdProp, onSelectedNodeChange],
  );

  const [invalidNodeIds, setInvalidNodeIds] = useState<string[]>([]);

  const updateNodeData = useCallback(
    (nodeId: string, patch: Partial<WorkflowNodeData>) => {
      const current = graphRef.current;
      setGraph({
        ...current,
        nodes: current.nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...patch } }
            : node,
        ),
      });
    },
    [setGraph],
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      const current = graphRef.current;
      setGraph({
        ...current,
        nodes: current.nodes.filter((node) => node.id !== nodeId),
        edges: current.edges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId,
        ),
      });
      if (selectedNodeId === nodeId) selectNode(null);
    },
    [setGraph, selectNode, selectedNodeId],
  );

  const addNode = useCallback(
    (type: string, position?: { x: number; y: number }) => {
      const current = graphRef.current;
      if (isTypeExhausted(type, nodeTypes, current.nodes)) return;

      // Without an explicit drop point, append to the right of the graph so a
      // click-added node never lands on top of an existing one.
      const fallback = current.nodes.length
        ? {
            x: Math.max(
              ...current.nodes.map(
                (node) =>
                  node.position.x +
                  (typeof node.width === 'number' ? node.width : DEFAULT_NODE_WIDTH),
              ),
            ) + 60,
            y: Math.round(
              current.nodes.reduce((sum, node) => sum + node.position.y, 0) /
                current.nodes.length,
            ),
          }
        : { x: 30, y: 30 };

      const node = createNode(type, nodeTypes[type], position ?? fallback);
      setGraph({ ...current, nodes: [...current.nodes, node] });
      selectNode(node.id);
    },
    [nodeTypes, setGraph, selectNode],
  );

  const validateNow = useCallback(() => {
    const errors = validateGraph(graphRef.current, nodeTypes, locale);
    setInvalidNodeIds(
      Array.from(new Set(errors.flatMap((error) => error.nodeIds ?? []))),
    );
    onValidate?.(errors);
    return errors;
  }, [nodeTypes, onValidate, locale]);

  const runAutoLayout = useCallback(() => {
    setGraph(autoLayout(graphRef.current));
  }, [setGraph]);

  const { fitView: fitViewport } = useReactFlow();

  useImperativeHandle(
    innerRef,
    (): WorkflowRef => ({
      getGraph: () => graphRef.current,
      validate: validateNow,
      autoLayout: runAutoLayout,
      fitView: () => fitViewport({ padding: 0.2 }),
    }),
    [validateNow, runAutoLayout, fitViewport],
  );

  const contextValue = useMemo<WorkflowContextValue>(
    () => ({
      prefixCls,
      mode,
      nodeTypes,
      runState,
      locale,
      graph,
      classNames,
      styles,
      invalidNodeIds,
      selectedNodeId,
      selectNode,
      setGraph,
      updateNodeData,
      removeNode,
      addNode,
      runAutoLayout,
      validateNow,
    }),
    [
      prefixCls,
      mode,
      nodeTypes,
      runState,
      locale,
      graph,
      classNames,
      styles,
      invalidNodeIds,
      selectedNodeId,
      selectNode,
      setGraph,
      updateNodeData,
      removeNode,
      addNode,
      runAutoLayout,
      validateNow,
    ],
  );

  return (
    <WorkflowContext.Provider value={contextValue}>
      <div
        className={clsx(prefixCls, `${prefixCls}-${mode}`, className)}
        style={{ height, ...style }}
      >
        {toolbar ? <Toolbar /> : null}
        <div className={`${prefixCls}-body`}>
          {showPalette ? <Palette /> : null}
          <Canvas
            minimap={minimap}
            background={background}
            fitView={fitView}
            reactFlowProps={reactFlowProps}
            onNodeClick={onNodeClick}
          />
          {showInspector ? <Inspector /> : null}
        </div>
      </div>
    </WorkflowContext.Provider>
  );
};

/**
 * Drag and drop AI workflow canvas, using the Dify `workflow.graph` shape as its
 * data model. Rendering / editing only -- execution happens on your backend and
 * is surfaced through `runState`.
 */
const Workflow = forwardRef<WorkflowRef, WorkflowProps>((props, ref) => (
  <ReactFlowProvider>
    <WorkflowInner {...props} innerRef={ref} />
  </ReactFlowProvider>
));

Workflow.displayName = 'Workflow';

export default Workflow;
