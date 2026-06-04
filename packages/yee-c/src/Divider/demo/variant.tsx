import { Divider } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Divider variant="solid" />
      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <Divider variant="dashed">Dashed</Divider>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      <Divider variant="dotted">Dotted</Divider>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>
    </div>
  );
};
