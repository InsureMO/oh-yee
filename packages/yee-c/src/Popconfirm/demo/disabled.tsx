import { Button, Checkbox, Popconfirm, Space } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Space direction="vertical">
      <Checkbox
        checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      >
        禁用确认框
      </Checkbox>

      <Popconfirm
        disabled={disabled}
        title="确认删除吗？"
        onConfirm={() => console.log('Confirmed')}
      >
        <Button disabled={disabled} color="danger">
          删除
        </Button>
      </Popconfirm>
    </Space>
  );
};
