import { Sender } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';

export default function Index() {
  const [messages, setMessages] = useState<string[]>([]);
  const [value, setValue] = useState('Hello world');

  const before = async (msg) => {
    return new Promise((resolve) => {
      setMessages([...messages, msg]);
      resolve({});
    });
  };

  const handleSend = async (msg: string) => {
    console.log(msg, messages);
    await before(msg);
    setValue('');
  };
  return (
    <div>
      <Sender
        value={value}
        onChange={(v: string) => setValue(v)}
        onSend={handleSend}
      />
    </div>
  );
}
