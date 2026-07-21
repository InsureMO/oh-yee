import { Select } from '@rainbow-oh/yee-c';
import React from 'react';

const options = Array.from({ length: 24 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `opt-${i + 1}`,
}));

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p>3 columns:</p>
        <Select
          columns={3}
          popupWidth={360}
          options={options}
          placeholder="Select an option"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <p>4 columns with multiple selection:</p>
        <Select
          columns={4}
          popupWidth={480}
          mode="multiple"
          options={options}
          placeholder="Select options"
          style={{ width: 300 }}
        />
      </div>
    </div>
  );
};
