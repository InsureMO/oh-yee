import { Button, Space, Tooltip } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <Space>
      <Tooltip
        title="Controlled tooltip"
        open={visible}
        onOpenChange={setVisible}
      >
        <Button>Controlled Tooltip</Button>
      </Tooltip>

      <Button onClick={() => setVisible(!visible)}>Toggle Tooltip</Button>
    </Space>
  );
};
