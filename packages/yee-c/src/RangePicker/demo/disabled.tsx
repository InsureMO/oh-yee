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
        <div style={{ marginBottom: '8px', color: '#666' }}>Fully disabled</div>
        <RangePicker placeholder={['Start date', 'End date']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          Start date disabled
        </div>
        <RangePicker
          disabled={[true, false]}
          placeholder={['Start date', 'End date']}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          End date disabled
        </div>
        <RangePicker
          disabled={[false, true]}
          placeholder={['Start date', 'End date']}
        />
      </div>
    </div>
  );
};
