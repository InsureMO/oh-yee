import { Button, Space } from '@rainbow-oh/yee-c';
import { Thinking } from '@rainbow-oh/yee-x';
import React, { useEffect, useState } from 'react';

const steps = [
  { key: 'search', title: 'Searching the knowledge base' },
  { key: 'read', title: 'Reading 3 documents' },
  { key: 'reason', title: 'Comparing policy clauses' },
];

export default function Basic() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev + 1 >= steps.length) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 800);
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [done]);

  const restart = () => {
    setCount(0);
    setDone(false);
  };

  return (
    <Space direction="vertical" style={{ width: 420 }}>
      <Button onClick={restart}>Replay</Button>
      <Thinking
        status={done ? 'success' : 'thinking'}
        steps={steps.slice(0, count)}
        content="The user asked about coverage. Clause 3.2 of Plan A applies…"
      />
    </Space>
  );
}
