import { Button } from '@rainbow-oh/yee-c';
import { useReactFlow } from '@xyflow/react';
import clsx from 'clsx';
import {
  CheckCircle2,
  LayoutGrid,
  Maximize2,
  TriangleAlert,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import React from 'react';
import { useWorkflowContext } from './context';
import type { WorkflowValidationError } from './interface';

/**
 * Top bar: zoom, fit, auto layout and validation. Must render inside
 * `<ReactFlowProvider>` because it drives the viewport.
 */
const Toolbar = () => {
  const { prefixCls, mode, locale, classNames, styles, runAutoLayout, validateNow } =
    useWorkflowContext();
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const cls = `${prefixCls}-toolbar`;

  const [result, setResult] = React.useState<WorkflowValidationError[] | null>(null);

  return (
    <div className={clsx(cls, classNames?.toolbar)} style={styles?.toolbar}>
      <div className={`${cls}-actions`}>
        <Button size="small" type="text" title={locale.zoomOut} onClick={() => zoomOut()}>
          <ZoomOut size={14} />
        </Button>
        <Button size="small" type="text" title={locale.zoomIn} onClick={() => zoomIn()}>
          <ZoomIn size={14} />
        </Button>
        <Button
          size="small"
          type="text"
          title={locale.fitView}
          onClick={() => fitView({ padding: 0.2 })}
        >
          <Maximize2 size={14} />
        </Button>
        {mode === 'edit' && (
          <>
            <Button
              size="small"
              type="text"
              title={locale.autoLayout}
              onClick={() => {
                runAutoLayout();
                // Wait for the new positions to be applied before refitting.
                window.requestAnimationFrame(() => fitView({ padding: 0.2 }));
              }}
            >
              <LayoutGrid size={14} />
            </Button>
            <Button
              size="small"
              type="text"
              onClick={() => setResult(validateNow())}
            >
              {locale.validate}
            </Button>
          </>
        )}
      </div>

      {result ? (
        <div
          className={clsx(
            `${cls}-result`,
            result.length ? `${cls}-result-error` : `${cls}-result-ok`,
          )}
          role="status"
        >
          {result.length ? (
            <>
              <TriangleAlert size={13} />
              <span title={result.map((error) => error.message).join('\n')}>
                {result[0].message}
                {result.length > 1
                  ? ` ${locale.moreErrors.replace('{count}', String(result.length))}`
                  : ''}
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 size={13} />
              <span>{locale.validatePassed}</span>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Toolbar;
