import { Switch } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [checked, setChecked] = useState(false);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setChecked(checked);
  };

  return <Switch checked={checked} onChange={onChange} />;
};
