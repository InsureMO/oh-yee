import { DatePicker } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <DatePicker
        placeholder="Disable hours"
        format="YYYY-MM-DD HH:mm:ss"
        disabledTime={() => ({
          disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23],
        })}
      />
      <DatePicker
        placeholder="Cascade minutes"
        format="YYYY-MM-DD HH:mm:ss"
        showTime={{ defaultValue: '14:00:00' }}
        disabledTime={() => ({
          disabledHours: () => [12],
          disabledMinutes: (hour) =>
            hour === 13 ? [0, 10, 20, 30, 40, 50] : [],
        })}
      />
    </div>
  );
};
