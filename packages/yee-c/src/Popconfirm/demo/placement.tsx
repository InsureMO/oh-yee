import { Button, Popconfirm, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Popconfirm
          placement="top"
          title="顶部提示"
          onConfirm={() => console.log('Top confirmed')}
        >
          <Button>Top</Button>
        </Popconfirm>

        <Popconfirm
          placement="bottom"
          title="底部提示"
          onConfirm={() => console.log('Bottom confirmed')}
        >
          <Button>Bottom</Button>
        </Popconfirm>
      </Space>

      <Space>
        <Popconfirm
          placement="left"
          title="左侧提示"
          onConfirm={() => console.log('Left confirmed')}
        >
          <Button>Left</Button>
        </Popconfirm>

        <Popconfirm
          placement="right"
          title="右侧提示"
          onConfirm={() => console.log('Right confirmed')}
        >
          <Button>Right</Button>
        </Popconfirm>
      </Space>
    </Space>
  );
};
