import { Button, Checkbox, Popconfirm, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Space direction="vertical">
      <Checkbox
        checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      >
        Disable popconfirm
      </Checkbox>

      <Popconfirm
        disabled={disabled}
        title="Are you sure to delete?"
        onConfirm={() => console.log('Confirmed')}
      >
        <Button disabled={disabled} color="danger">
          Delete
        </Button>
      </Popconfirm>
    </Space>
  );
};
