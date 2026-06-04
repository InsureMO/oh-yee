import { Checkbox } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <Checkbox checked={checked} onChange={handleChange}>
        Controlled Checkbox
      </Checkbox>
      <br />
      <p>Current state: {checked ? 'Checked' : 'Unchecked'}</p>
    </div>
  );
};
