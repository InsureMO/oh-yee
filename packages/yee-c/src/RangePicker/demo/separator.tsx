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
        <div style={{ marginBottom: '8px', color: '#666' }}>Default separator (~)</div>
        <RangePicker placeholder={['Start date', 'End date']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          Custom separator (to)
        </div>
        <RangePicker separator="to" placeholder={['Start date', 'End date']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          Custom separator (→)
        </div>
        <RangePicker separator="→" placeholder={['Start date', 'End date']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          Custom JSX separator
        </div>
        <RangePicker
          separator={
            <span
              style={{ color: '#1890ff', fontWeight: 'bold', fontSize: '16px' }}
            >
              ⇄
            </span>
          }
          placeholder={['Start date', 'End date']}
        />
      </div>
    </div>
  );
};
