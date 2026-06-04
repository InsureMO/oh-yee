import { Badge } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: 40 }}>
        <Badge dot>
          <span style={{ width: '40px', height: '40px', background: '#eee' }} />
        </Badge>
        <Badge dot status="success">
          <span style={{ width: '40px', height: '40px', background: '#eee' }} />
        </Badge>
        <Badge dot status="warning">
          <span style={{ width: '40px', height: '40px', background: '#eee' }} />
        </Badge>
      </div>
      <br />
      <Badge dot>Notification</Badge>
    </div>
  );
};
