import { Button, Space } from '@rainbow-oh/yee-c';
import { Process } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';

const ms = [
  'Requesting webpage',
  'Reading webpage',
  'Analyzing webpage content',
  'Generating answer',
];

let index = 0;

export default function Basic() {
  const [msg, setMsg] = useState(ms[index]);

  const handleClick = () => {
    index++;
    setMsg(ms[index]);
  };

  return (
    <Space direction="vertical">
      <Button onClick={handleClick}>Switch Message</Button>
      <Process message={msg} />
    </Space>
  );
}
