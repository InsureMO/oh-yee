import { ApprovalCard } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';

export default function Resolved() {
  const [decision, setDecision] = useState<'approved' | 'denied'>('approved');

  return (
    <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ApprovalCard
        title="Archive 40 stale policies"
        decision={decision}
        onUndo={() => setDecision('denied')}
      />
      <button type="button" onClick={() => setDecision(decision === 'approved' ? 'denied' : 'approved')}>
        Toggle decision
      </button>
    </div>
  );
}
