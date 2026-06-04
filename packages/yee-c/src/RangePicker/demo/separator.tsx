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
        <div style={{ marginBottom: '8px', color: '#666' }}>默认分隔符 (~)</div>
        <RangePicker placeholder={['开始日期', '结束日期']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          自定义分隔符 (至)
        </div>
        <RangePicker separator="至" placeholder={['开始日期', '结束日期']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          自定义分隔符 (→)
        </div>
        <RangePicker separator="→" placeholder={['开始日期', '结束日期']} />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          自定义 JSX 分隔符
        </div>
        <RangePicker
          separator={
            <span
              style={{ color: '#1890ff', fontWeight: 'bold', fontSize: '16px' }}
            >
              ⇄
            </span>
          }
          placeholder={['开始日期', '结束日期']}
        />
      </div>
    </div>
  );
};
