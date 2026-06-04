import { Checkbox } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Checkbox>Checkbox</Checkbox>
      <br />
      <Checkbox defaultChecked>Checked by default</Checkbox>
      <br />
      <Checkbox disabled>Disabled</Checkbox>
      <br />
      <Checkbox disabled checked>
        Disabled and checked
      </Checkbox>
    </div>
  );
};
