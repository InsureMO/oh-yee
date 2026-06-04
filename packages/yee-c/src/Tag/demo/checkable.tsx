import { Space, Tag } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [checked, setChecked] = useState(false);

  return (
    <Space>
      <Tag
        checkable
        checked={checked}
        onChange={(checked) => setChecked(checked)}
      >
        Checkable Tag
      </Tag>
    </Space>
  );
};
