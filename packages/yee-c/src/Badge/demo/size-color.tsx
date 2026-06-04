import { Badge } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: 40, marginBottom: 20 }}>
        <Badge count={5} size="small">
          <span style={{ width: '40px', height: '40px', background: '#eee' }} />
        </Badge>
        <Badge count={5} size="default">
          <span style={{ width: '40px', height: '40px', background: '#eee' }} />
        </Badge>
      </div>
      <div style={{ display: 'flex', gap: 40 }}>
        <Badge count={5} color="#fa541c">
          <span style={{ width: '40px', height: '40px', background: '#eee' }} />
        </Badge>
        <Badge count={5} color="#722ed1">
          <span style={{ width: '40px', height: '40px', background: '#eee' }} />
        </Badge>
      </div>
    </div>
  );
};