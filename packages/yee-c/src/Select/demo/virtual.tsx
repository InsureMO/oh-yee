import { Select } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

// Build a large option set (5000 items) to demonstrate virtual scrolling.
// Even with this many options, the DOM only holds the visible window.
const options = Array.from({ length: 5000 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: i,
}));

export default () => {
  const [value, setValue] = useState<number>(100);

  return (
    <Select
      virtual
      searchable
      value={value}
      onChange={(val) => setValue(val as number)}
      options={options}
      style={{ width: 200 }}
      placeholder="Please select"
    />
  );
};
