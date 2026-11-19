import { Button, Space } from '@rainbow-oh/yee-c';
import { PlanCard, type PlanStep } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';

const initialSteps: Array<PlanStep> = [
  { title: 'Read the policy document', description: 'PDF, 24 pages' },
  { title: 'Extract coverage limits' },
  { title: 'Compare with the quote' },
];

export default function Review() {
  const [steps, setSteps] = useState(initialSteps);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <Space direction="vertical" style={{ width: 440 }}>
      {confirmed ? (
        <Button onClick={() => setConfirmed(false)}>Reset</Button>
      ) : (
        <PlanCard
          title="Proposed plan"
          steps={steps}
          onStepsChange={setSteps}
          onConfirm={(next) => {
            setSteps(next);
            setConfirmed(true);
          }}
        />
      )}
    </Space>
  );
}
