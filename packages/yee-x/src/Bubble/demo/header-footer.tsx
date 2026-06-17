import { Button, Space } from '@rainbow-oh/yee-c';
import { Bubble } from '@rainbow-oh/yee-x';
import { Copy, RefreshCw } from 'lucide-react';
import React from 'react';

export default function Index() {
  return (
    <Bubble
      header="yee-x"
      content="hello world!"
      avatar={{
        icon: <span>X</span>,
        style: { backgroundColor: 'red', color: 'white' },
      }}
      footer={
        <Space gap={0}>
          <Button
            type="text"
            size="small"
            icon={<RefreshCw size={14} strokeWidth={1.5} />}
          />
          <Button
            type="text"
            size="small"
            icon={<Copy size={14} strokeWidth={1.5} />}
          />
        </Space>
      }
    />
  );
}
