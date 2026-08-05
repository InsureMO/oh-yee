import { Button } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import React from 'react';
import CodeBlock from '../CodeBlock';
import { useWorkflowContext } from './context';
import { TextAreaField, TextField } from './fields';
import { collectUpstreamVariables } from './utils/variables';

const stringify = (value: unknown) => {
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

/**
 * Right hand panel: configuration form of the selected node in edit mode, and
 * its execution inputs / outputs whenever a run state is present.
 */
const Inspector = () => {
  const {
    prefixCls,
    mode,
    graph,
    nodeTypes,
    locale,
    classNames,
    styles,
    selectedNodeId,
    runState,
    updateNodeData,
    removeNode,
  } = useWorkflowContext();
  const cls = `${prefixCls}-inspector`;

  const node = React.useMemo(
    () => graph.nodes.find((item) => item.id === selectedNodeId),
    [graph.nodes, selectedNodeId],
  );

  const variables = React.useMemo(
    () =>
      node ? collectUpstreamVariables(node.id, graph, nodeTypes) : [],
    [node, graph, nodeTypes],
  );

  if (!node) {
    return (
      <div className={clsx(cls, classNames?.inspector)} style={styles?.inspector}>
        <div className={`${cls}-header`}>{locale.inspectorTitle}</div>
        <div className={`${cls}-empty`}>{locale.inspectorEmpty}</div>
      </div>
    );
  }

  const type = String(node.data?.type ?? '');
  const def = nodeTypes[type];
  const run = runState?.nodes[node.id];
  const readOnly = mode !== 'edit';

  return (
    <div className={clsx(cls, classNames?.inspector)} style={styles?.inspector}>
      <div className={`${cls}-header`}>
        <span className={`${cls}-header-icon`}>{def?.icon}</span>
        <span className={`${cls}-header-title`}>{def?.title ?? type}</span>
        {!readOnly && (
          <Button
            size="small"
            type="text"
            title={locale.deleteNode}
            aria-label={locale.deleteNode}
            onClick={() => removeNode(node.id)}
          >
            <Trash2 size={14} />
          </Button>
        )}
      </div>

      <div className={`${cls}-body`}>
        <TextField
          label={locale.fieldTitle}
          value={String(node.data?.title ?? '')}
          disabled={readOnly}
          onChange={(title) => updateNodeData(node.id, { title })}
        />
        <TextAreaField
          label={locale.fieldDesc}
          value={String(node.data?.desc ?? '')}
          rows={2}
          disabled={readOnly}
          onChange={(desc) => updateNodeData(node.id, { desc })}
        />

        {def?.renderForm?.({
          node,
          data: node.data,
          variables,
          disabled: readOnly,
          onChange: (patch) => updateNodeData(node.id, patch),
        })}

        {run?.error ? (
          <div className={`${cls}-section`}>
            <div className={`${cls}-section-title`}>{locale.error}</div>
            <div className={`${cls}-error`}>{run.error}</div>
          </div>
        ) : null}

        {run?.inputs !== undefined ? (
          <div className={`${cls}-section`}>
            <div className={`${cls}-section-title`}>{locale.input}</div>
            <CodeBlock language="json" code={stringify(run.inputs)} />
          </div>
        ) : null}

        {run?.outputs !== undefined ? (
          <div className={`${cls}-section`}>
            <div className={`${cls}-section-title`}>{locale.output}</div>
            <CodeBlock language="json" code={stringify(run.outputs)} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Inspector;
