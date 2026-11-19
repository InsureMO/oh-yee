import { PlanCard, type PlanStep } from '@rainbow-oh/yee-x';
import React, { useEffect, useRef, useState } from 'react';

const steps: Array<PlanStep> = [
  { key: 'fetch', title: 'Fetch claim documents' },
  { key: 'parse', title: 'Parse and validate fields' },
  { key: 'score', title: 'Run risk scoring' },
  { key: 'draft', title: 'Draft the settlement note' },
];

export default function Run() {
  const [current, setCurrent] = useState(1);
  const [failed, setFailed] = useState(false);
  const startedRef = useRef(Date.now());

  useEffect(() => {
    startedRef.current = Date.now();
  }, [current]);

  const withStatus = steps.map((step, i) => ({
    ...step,
    status: i === 2 && failed ? ('error' as const) : undefined,
    duration: i < current ? 1.2 : undefined,
  }));

  const advance = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
  };

  return (
    <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button onClick={advance} type="button" style={{ alignSelf: 'flex-start' }}>
        Advance step
      </button>
      <PlanCard
        mode="run"
        title="Agent run"
        steps={withStatus}
        current={current}
        startedAt={startedRef.current}
        onStepRetry={() => setFailed(false)}
      />
    </div>
  );
}
