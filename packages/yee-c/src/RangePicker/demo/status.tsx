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
        <div style={{ marginBottom: '8px', color: '#666' }}>默认状态</div>
        <RangePicker placeholder={['开始日期', '结束日期']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>错误状态</div>
        <RangePicker status="error" placeholder={['开始日期', '结束日期']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>警告状态</div>
        <RangePicker status="warning" placeholder={['开始日期', '结束日期']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>禁用状态</div>
        <RangePicker disabled placeholder={['开始日期', '结束日期']} />
      </div>
    </div>
  );
};
