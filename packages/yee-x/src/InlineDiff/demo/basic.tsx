import { InlineDiff } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';

const original =
  'The insured must submit the claim within 30 days of the incident. Late claims are rejected.';

const modified =
  'The insured must submit the claim within 14 days of the incident. Late claims may be accepted with a written justification.';

export default function Basic() {
  const [resolved, setResolved] = useState(original);

  return (
    <div style={{ width: 520, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InlineDiff original={original} modified={modified} onResolve={setResolved} />
      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
        <strong>Resolved text:</strong> {resolved}
      </div>
    </div>
  );
}
