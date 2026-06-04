import dayjs from 'dayjs';
import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(['2024/01/01', '2024/12/31']);

  const handleReset = () => {
    setValue([]);
  };

  const handleSetToday = () => {
    const today = dayjs().format('YYYY/MM/DD');
    setValue([today, today]);
  };

  const handleSetThisMonth = () => {
    const start = dayjs().startOf('month').format('YYYY/MM/DD');
    const end = dayjs().endOf('month').format('YYYY/MM/DD');
    setValue([start, end]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <button onClick={handleSetToday}>设置为今天</button>
        <button onClick={handleSetThisMonth}>设置为本月</button>
        <button onClick={handleReset}>重置</button>
      </div>

      <RangePicker
        value={value}
        onChange={(dates) => {
          console.log('新值:', dates);
          setValue(dates);
        }}
        placeholder={['开始日期', '结束日期']}
      />

      <div
        style={{
          marginTop: '16px',
          padding: '12px',
          background: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>当前值：</div>
        <pre style={{ margin: 0, fontSize: '12px' }}>
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    </div>
  );
};
