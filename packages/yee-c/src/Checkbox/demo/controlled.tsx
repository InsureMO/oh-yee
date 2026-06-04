import React, { useState } from 'react';
import { Checkbox } from '@oh/yee-c';

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
