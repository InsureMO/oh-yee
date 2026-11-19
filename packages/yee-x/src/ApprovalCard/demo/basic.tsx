import { ApprovalCard } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Basic() {
  return (
    <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ApprovalCard
        agent="Claims agent"
        title="Delete 3 rows from the claims table"
        description="The duplicate rows were created by a retried import."
        preview={'ids: ["C-1042", "C-1043", "C-1044"]\nsource: import_batch#87'}
        risk="high"
        scopes={['once', 'session', 'always']}
        onDecide={() => {}}
      />
      <ApprovalCard
        agent="Email agent"
        title="Send the renewal reminder to 128 customers"
        risk="low"
        countdown={300}
        onDecide={() => {}}
      />
    </div>
  );
}
