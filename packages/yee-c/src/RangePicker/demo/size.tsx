import { RangePicker } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>Small</div>
        <RangePicker size="small" placeholder={['Start date', 'End date']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          Middle (default)
        </div>
        <RangePicker size="middle" placeholder={['Start date', 'End date']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>Large</div>
        <RangePicker size="large" placeholder={['Start date', 'End date']} />
      </div>
    </div>
  );
};
