import { Space } from '@rainbow-oh/yee-c';
import { ToolCall } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Basic() {
  return (
    <Space direction="vertical" style={{ width: 460 }}>
      <ToolCall
        name="search_docs"
        status="success"
        duration={0.8}
        args={{ query: 'travel insurance coverage', limit: 5 }}
        result={{ hits: 3, ids: ['doc-12', 'doc-31', 'doc-44'] }}
      />
      <ToolCall
        name="call_underwriting_api"
        status="running"
        startTime={Date.now() - 3000}
        args={{ policyId: 'P-2024-0081' }}
      />
      <ToolCall
        name="send_email"
        status="error"
        duration={1.2}
        args={{ to: 'customer@example.com' }}
        error={{ message: 'SMTP connection refused' }}
        onRetry={() => {}}
      />
    </Space>
  );
}
