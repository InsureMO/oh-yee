import dayjs from 'dayjs';
import { Button, PickerPanel } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(dayjs());

  return (
    <PickerPanel
      value={value}
      footer={
        <div style={{ textAlign: 'center' }}>
          <Button size="small" onClick={() => setValue(dayjs())}>
            Today
          </Button>
        </div>
      }
      onChange={(date) => setValue(date || dayjs())}
    />
  );
};
