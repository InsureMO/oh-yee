import { RangePicker } from '@rainbow-oh/yee-c';
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
        <div style={{ marginBottom: '8px', color: '#666' }}>Default</div>
        <RangePicker placeholder={['Start date', 'End date']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>Error</div>
        <RangePicker status="error" placeholder={['Start date', 'End date']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>Warning</div>
        <RangePicker
          status="warning"
          placeholder={['Start date', 'End date']}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>Disabled</div>
        <RangePicker disabled placeholder={['Start date', 'End date']} />
      </div>
    </div>
  );
};
