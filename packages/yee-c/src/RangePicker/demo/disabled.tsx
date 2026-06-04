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
        <div style={{ marginBottom: '8px', color: '#666' }}>全部禁用</div>
        <RangePicker placeholder={['开始日期', '结束日期']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>禁用开始日期</div>
        <RangePicker
          disabled={[true, false]}
          placeholder={['开始日期', '结束日期']}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>禁用结束日期</div>
        <RangePicker
          disabled={[false, true]}
          placeholder={['开始日期', '结束日期']}
        />
      </div>
    </div>
  );
};
