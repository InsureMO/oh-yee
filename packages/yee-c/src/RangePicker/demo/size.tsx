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
        <div style={{ marginBottom: '8px', color: '#666' }}>小尺寸</div>
        <RangePicker size="small" placeholder={['开始日期', '结束日期']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          中等尺寸（默认）
        </div>
        <RangePicker size="middle" placeholder={['开始日期', '结束日期']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>大尺寸</div>
        <RangePicker size="large" placeholder={['开始日期', '结束日期']} />
      </div>
    </div>
  );
};
