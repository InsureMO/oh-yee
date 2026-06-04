import { Button, Popconfirm, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Popconfirm
          placement="top"
          title="Top placement"
          onConfirm={() => console.log('Top confirmed')}
        >
          <Button>Top</Button>
        </Popconfirm>

        <Popconfirm
          placement="bottom"
          title="Bottom placement"
          onConfirm={() => console.log('Bottom confirmed')}
        >
          <Button>Bottom</Button>
        </Popconfirm>
      </Space>

      <Space>
        <Popconfirm
          placement="left"
          title="Left placement"
          onConfirm={() => console.log('Left confirmed')}
        >
          <Button>Left</Button>
        </Popconfirm>

        <Popconfirm
          placement="right"
          title="Right placement"
          onConfirm={() => console.log('Right confirmed')}
        >
          <Button>Right</Button>
        </Popconfirm>
      </Space>
    </Space>
  );
};
