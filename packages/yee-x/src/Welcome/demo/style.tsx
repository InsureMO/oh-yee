import { Welcome } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Index() {
  return (
    <Welcome
      title="Welcome to Yee X"
      description="This is local llm chat ui"
      styles={{
        title: { borderBottom: '1px solid #eee', color: '#1677ff' },
      }}
    />
  );
}
