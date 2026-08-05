import { Handle, Position, type NodeProps } from '@xyflow/react';
import clsx from 'clsx';
import { CheckCircle2, LoaderCircle, MinusCircle, XCircle } from 'lucide-react';
import React from 'react';
import { useWorkflowContext } from './context';
import type { WorkflowNodeStatus } from './interface';
import { resolveSourceHandles, type FlowNode } from './utils/dify';

const STATUS_ICON: Record<WorkflowNodeStatus, React.ReactNode> = {
  idle: null,
  running: <LoaderCircle size={14} className="yee-workflow-node-spin" />,
  succeeded: <CheckCircle2 size={14} />,
  failed: <XCircle size={14} />,
  skipped: <MinusCircle size={14} />,
};

const formatElapsed = (seconds?: number) => {
  if (typeof seconds !== 'number') return undefined;
  return seconds < 1 ? `${Math.round(seconds * 1000)}ms` : `${seconds.toFixed(2)}s`;
};

/**
 * The single node component registered with xyflow. Type-specific rendering is
 * delegated to `nodeTypes[type].renderSummary`, so a custom node type never has
 * to reimplement ports, status overlay or selection.
 */
const WorkflowNodeCard = ({ id, data, selected }: NodeProps<FlowNode>) => {
  const {
    prefixCls,
    nodeTypes,
    runState,
    locale,
    classNames,
    styles,
    invalidNodeIds,
    mode,
  } = useWorkflowContext();

  const raw = data.raw;
  const nodeData = raw.data;
  const type = String(nodeData?.type ?? '');
  const def = nodeTypes[type];
  const run = runState?.nodes[id];
  const status: WorkflowNodeStatus = run?.status ?? 'idle';
  const invalid = invalidNodeIds.includes(id);
  const handles = resolveSourceHandles(nodeData, def);
  const cls = `${prefixCls}-node`;

  const statusText = {
    idle: '',
    running: locale.running,
    succeeded: locale.succeeded,
    failed: locale.failed,
    skipped: locale.skipped,
  }[status];

  return (
    <div
      className={clsx(
        cls,
        `${cls}-${type.replace(/[^a-z0-9-]/gi, '-')}`,
        selected && `${cls}-selected`,
        invalid && `${cls}-invalid`,
        status !== 'idle' && `${cls}-${status}`,
        classNames?.node,
      )}
      style={{
        ...(def?.color
          ? ({ ['--yee-workflow-node-accent' as any]: def.color } as React.CSSProperties)
          : null),
        ...styles?.node,
      }}
      data-node-type={type}
      data-status={status}
    >
      {def?.target !== false && (
        <Handle
          type="target"
          id="target"
          position={Position.Left}
          isConnectable={mode === 'edit'}
        />
      )}

      <div className={`${cls}-header`}>
        {def?.icon ? <span className={`${cls}-icon`}>{def.icon}</span> : null}
        <span className={`${cls}-title`} title={String(nodeData?.title ?? '')}>
          {String(nodeData?.title ?? def?.title ?? type)}
        </span>
        {status !== 'idle' && (
          <span className={`${cls}-status`} title={statusText}>
            {STATUS_ICON[status]}
          </span>
        )}
      </div>

      {def?.renderSummary ? (
        <div className={`${cls}-body`}>
          {def.renderSummary({ node: raw, data: nodeData, status, run })}
        </div>
      ) : null}

      {nodeData?.desc ? (
        <div className={`${cls}-desc`}>{String(nodeData.desc)}</div>
      ) : null}

      {run?.error ? (
        <div className={`${cls}-error`} title={run.error}>
          {run.error}
        </div>
      ) : null}

      {run && (run.elapsedTime !== undefined || run.totalTokens !== undefined) ? (
        <div className={`${cls}-meta`}>
          {run.elapsedTime !== undefined ? (
            <span>{formatElapsed(run.elapsedTime)}</span>
          ) : null}
          {run.totalTokens !== undefined ? (
            <span>
              {run.totalTokens} {locale.tokens}
            </span>
          ) : null}
        </div>
      ) : null}

      {handles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="source"
          id={handle.id}
          position={Position.Right}
          isConnectable={mode === 'edit'}
          style={
            handles.length > 1
              ? { top: `${((index + 1) / (handles.length + 1)) * 100}%` }
              : undefined
          }
        >
          {handles.length > 1 && handle.label ? (
            <span className={`${cls}-handle-label`}>{handle.label}</span>
          ) : null}
        </Handle>
      ))}
    </div>
  );
};

export default WorkflowNodeCard;
