import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value1, setValue1] = useState<[string, string]>();
  const [value2, setValue2] = useState<[string, string]>();
  const [value3, setValue3] = useState<[string, string]>();

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
        <div style={{ marginBottom: '8px', color: '#666' }}>
          默认格式 (YYYY/MM/DD)
        </div>
        <RangePicker
          value={value1}
          onChange={(dates) => {
            console.log('格式化值:', dates);
            setValue1(dates as [string, string]);
          }}
          placeholder={['开始日期', '结束日期']}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          自定义格式 (YYYY-MM-DD)
        </div>
        <RangePicker
          value={value2}
          format="YYYY-MM-DD"
          saveFormat="YYYY-MM-DD"
          onChange={(dates) => {
            console.log('格式化值:', dates);
            setValue2(dates as [string, string]);
          }}
          placeholder={['开始日期', '结束日期']}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          中文格式 (YYYY年MM月DD日)
        </div>
        <RangePicker
          value={value3}
          format="YYYY年MM月DD日"
          saveFormat="YYYY-MM-DD"
          onChange={(dates) => {
            console.log('格式化值:', dates);
            setValue3(dates as [string, string]);
          }}
          placeholder={['开始日期', '结束日期']}
        />
      </div>
    </div>
  );
};
