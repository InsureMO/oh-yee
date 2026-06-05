import { Button, Trigger } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Trigger
      trigger={['hover']}
      placement="top"
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.2}
      popup={
        <div
          style={{
            background: '#fff',
            padding: 12,
            borderRadius: 6,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          Hover popup content
        </div>
      }
    >
      <Button>Hover Me</Button>
    </Trigger>
  );
};
