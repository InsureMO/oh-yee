import { Button, Popover } from '@oh/yee-c';
import React from 'react';

export default () => {
  const content = (
    <div>
      <p>这是自定义内容</p>
      <div>
        <Button size="small" style={{ marginRight: 8 }}>
          确定
        </Button>
        <Button size="small" type="primary">
          取消
        </Button>
      </div>
    </div>
  );

  return (
    <Popover title="自定义内容" content={content}>
      <Button>Custom Content</Button>
    </Popover>
  );
};
