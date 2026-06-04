import { Divider } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Divider>Center</Divider>
      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <Divider orientation="left">Left</Divider>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      <Divider orientation="right">Right</Divider>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>
    </div>
  );
};
