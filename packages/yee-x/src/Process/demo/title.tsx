import { Button, Space } from '@rainbow-oh/yee-c';
import { Process } from '@rainbow-oh/yee-x';
import React, { useEffect, useRef, useState } from 'react';

const ms = [
  'Requesting webpage',
  'Reading webpage',
  'Analyzing webpage content',
  'Generating answer',
];

let interval: NodeJS.Timeout | undefined;

export default function Basic() {
  const indexRef = useRef<number>();
  const [index, setIndex] = useState(0);
  indexRef.current = index;
  const msg = ms[index];

  const startInterval = () => {
    interval = setInterval(() => {
      setIndex((i) => i + 1);
    }, 2000);
  };

  const stopInterval = () => {
    console.log('clear: ', interval);
    clearInterval(interval);
  };

  if (index > ms.length) {
    stopInterval();
  }

  useEffect(() => {
    startInterval();
  }, []);

  const click = () => {
    setIndex(0);
    startInterval();
  };

  return (
    <Space direction="vertical">
      <Button type="primary" onClick={click}>
        Restart Loop
      </Button>
      {msg ? <Process title="Processing..." message={msg} /> : <></>}
    </Space>
  );
}
