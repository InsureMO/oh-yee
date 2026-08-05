import { Button } from '@rainbow-oh/yee-c';
import {
  CodeBlock,
  Workflow,
  type WorkflowGraph,
  type WorkflowRef,
  type WorkflowValidationError,
} from '@rainbow-oh/yee-x';
import React from 'react';
import { weatherGraph } from './data';

export default function Edit() {
  const ref = React.useRef<WorkflowRef>(null);
  const [graph, setGraph] = React.useState<WorkflowGraph>(weatherGraph);
  const [errors, setErrors] = React.useState<WorkflowValidationError[]>([]);
  const [showDsl, setShowDsl] = React.useState(false);

  return (
    <>
      <Workflow
        ref={ref}
        mode="edit"
        height={520}
        value={graph}
        onChange={setGraph}
        onValidate={setErrors}
      />

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <Button size="small" onClick={() => ref.current?.autoLayout()}>
          自动布局
        </Button>
        <Button size="small" onClick={() => setErrors(ref.current?.validate() ?? [])}>
          校验
        </Button>
        <Button size="small" onClick={() => setShowDsl((prev) => !prev)}>
          {showDsl ? '隐藏 DSL' : '查看 DSL'}
        </Button>
      </div>

      {errors.length ? (
        <ul style={{ marginTop: 8, color: 'var(--yee-error-color, #f2545b)' }}>
          {errors.map((error) => (
            <li key={`${error.code}-${error.message}`}>{error.message}</li>
          ))}
        </ul>
      ) : null}

      {showDsl ? (
        <div style={{ marginTop: 12 }}>
          <CodeBlock language="json" code={JSON.stringify(graph, null, 2)} />
        </div>
      ) : null}
    </>
  );
}
