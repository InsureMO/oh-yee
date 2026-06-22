import { Segmented } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => (
  <>
    <Segmented
      options={[
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b', disabled: true },
        { label: 'C', value: 'c' },
      ]}
      defaultValue="a"
    />
    <br />
    <br />
    <Segmented disabled options={['A', 'B', 'C']} defaultValue="A" />
  </>
);
