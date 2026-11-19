import { ToolCall } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Group() {
  return (
    <div style={{ width: 460 }}>
      <ToolCall.Group
        items={[
          {
            name: 'search_docs',
            status: 'success',
            duration: 0.6,
            args: { query: 'premium table' },
            result: { hits: 2 },
          },
          {
            name: 'read_file',
            status: 'success',
            duration: 0.2,
            args: { path: '/rates/2024.xlsx' },
          },
          {
            name: 'calculate_premium',
            status: 'running',
            args: { base: 1200, rider: 3 },
          },
        ]}
      />
    </div>
  );
}
