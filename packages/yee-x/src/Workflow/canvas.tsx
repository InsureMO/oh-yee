import {
  Background,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type IsValidConnection,
} from '@xyflow/react';
import clsx from 'clsx';
import React from 'react';
import { useWorkflowContext } from './context';
import type { WorkflowProps } from './interface';
import WorkflowNodeCard from './node-card';
import { NODE_DRAG_TYPE } from './palette';
import {
  createEdge,
  flowToGraph,
  graphToFlowEdges,
  graphToFlowNodes,
  FLOW_NODE_TYPE,
  type FlowEdge,
  type FlowNode,
} from './utils/dify';

import '@xyflow/react/dist/style.css';

const nodeComponents = { [FLOW_NODE_TYPE]: WorkflowNodeCard };

export type CanvasProps = Pick<
  WorkflowProps,
  'minimap' | 'background' | 'fitView' | 'reactFlowProps' | 'onNodeClick'
>;

/**
 * The xyflow surface. Keeps its own node/edge state so dragging stays smooth,
 * and commits back to the DSL graph on meaningful events (drag stop, connect,
 * delete) rather than on every frame.
 */
const Canvas = ({
  minimap = false,
  background = true,
  fitView = true,
  reactFlowProps,
  onNodeClick,
}: CanvasProps) => {
  const {
    prefixCls,
    mode,
    graph,
    setGraph,
    runState,
    nodeTypes,
    classNames,
    styles,
    selectNode,
    selectedNodeId,
    addNode,
  } = useWorkflowContext();
  const cls = `${prefixCls}-canvas`;
  const editable = mode === 'edit';

  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>(
    graphToFlowNodes(graph, selectedNodeId),
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>(
    graphToFlowEdges(graph, runState, nodeTypes),
  );

  const nodesRef = React.useRef(nodes);
  const edgesRef = React.useRef(edges);
  nodesRef.current = nodes;
  edgesRef.current = edges;

  /**
   * The graph object this canvas last produced. Used to tell our own commits
   * apart from an external `value` update, so echoing the graph back does not
   * blow away the live xyflow state.
   */
  const committed = React.useRef(graph);

  React.useEffect(() => {
    if (graph === committed.current) return;
    committed.current = graph;
    setNodes(graphToFlowNodes(graph, selectedNodeId));
    setEdges(graphToFlowEdges(graph, runState));
    // runState and selectedNodeId are intentionally excluded: they are handled
    // by the two effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, setNodes, setEdges]);

  React.useEffect(() => {
    setEdges(graphToFlowEdges(committed.current, runState, nodeTypes));
  }, [runState, setEdges]);

  // Keeps the highlight in sync with programmatic / inspector driven selection.
  React.useEffect(() => {
    setNodes((current) =>
      current.map((node) => {
        const selected = node.id === selectedNodeId;
        return node.selected === selected ? node : { ...node, selected };
      }),
    );
  }, [selectedNodeId, setNodes]);

  const commit = React.useCallback(() => {
    const next = flowToGraph(nodesRef.current, edgesRef.current, committed.current);
    committed.current = next;
    setGraph(next);
  }, [setGraph]);

  /**
   * xyflow applies changes through `onNodesChange` first; wait a frame so the
   * refs hold the post-change state before serialising.
   */
  const commitLater = React.useCallback(() => {
    window.requestAnimationFrame(commit);
  }, [commit]);

  const isValidConnection = React.useCallback<IsValidConnection>(
    (connection) => {
      if (!connection.source || !connection.target) return false;
      if (connection.source === connection.target) return false;
      return !edgesRef.current.some(
        (edge) =>
          edge.source === connection.source &&
          edge.target === connection.target &&
          (edge.sourceHandle ?? 'source') === (connection.sourceHandle ?? 'source'),
      );
    },
    [],
  );

  const onConnect = React.useCallback(
    (connection: Connection) => {
      if (!editable) return;
      const next = createEdge(
        connection.source,
        connection.target,
        connection.sourceHandle,
        connection.targetHandle,
        graph.nodes,
      );
      if (edgesRef.current.some((edge) => edge.id === next.id)) return;
      const nextGraph = flowToGraph(nodesRef.current, edgesRef.current, committed.current);
      nextGraph.edges = [...nextGraph.edges, next];
      committed.current = nextGraph;
      setEdges(graphToFlowEdges(nextGraph, runState, nodeTypes));
      setGraph(nextGraph);
    },
    [editable, graph.nodes, runState, setEdges, setGraph],
  );

  const onDrop = React.useCallback(
    (event: React.DragEvent) => {
      if (!editable) return;
      const type = event.dataTransfer.getData(NODE_DRAG_TYPE);
      if (!type) return;
      event.preventDefault();
      addNode(
        type,
        screenToFlowPosition({ x: event.clientX, y: event.clientY }),
      );
    },
    [editable, addNode, screenToFlowPosition],
  );

  return (
    <div className={clsx(cls, classNames?.canvas)} style={styles?.canvas}>
      <ReactFlow<FlowNode, FlowEdge>
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeComponents}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={commitLater}
        onNodesDelete={commitLater}
        onEdgesDelete={commitLater}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onNodeClick={(_, node) => {
          onNodeClick?.(node.data.raw);
          selectNode(node.id);
        }}
        onPaneClick={() => selectNode(null)}
        onDragOver={(event) => {
          if (!editable) return;
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
        }}
        onDrop={onDrop}
        nodesDraggable={editable}
        nodesConnectable={editable}
        elementsSelectable
        deleteKeyCode={editable ? ['Backspace', 'Delete'] : null}
        defaultViewport={graph.viewport}
        fitView={fitView}
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={2}
        {...reactFlowProps}
      >
        {background ? <Background gap={16} size={1} /> : null}
        {minimap ? <MiniMap pannable zoomable /> : null}
      </ReactFlow>
    </div>
  );
};

export default Canvas;
