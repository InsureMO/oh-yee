import { Flow, Prompts } from '@rainbow-oh/yee-x';
import React from 'react';

const items = [
  {
    key: 1,
    label: 'Test Prompt 1',
    description: 'Description for test prompt 1',
  },
  { key: 2, label: 'Prompt 2', description: 'Description for prompt 2' },
  { key: 3, label: 'Prompt 3333', description: 'Description for prompt 33333' },
  {
    key: 4,
    label: 'xx Prompt 444',
    description: 'Description for xxxxxx prompt 4444444',
  },
  {
    key: 5,
    label: 'xx Prompt 555',
    description: 'Description for xxxxxx prompt 555555555555555',
  },
  {
    key: 6,
    label: 'aa Prompt 666',
    description: 'Description for xxxxxx prompt 66',
  },
  {
    key: 7,
    label: 'ee Prompt 777',
    description: 'Description for xxxxxx prompt 77',
  },
  {
    key: 8,
    label: 'mm Prompt 888',
    description: 'Description for xxxxxx prompt 88',
  },
  {
    key: 9,
    label: 'cc Prompt 999',
    description: 'Description for xxxxxx prompt 999',
  },
  {
    key: 10,
    label: 'lk Prompt 10',
    description: 'Description for xxxxxx prompt 10',
  },
];

export default function Index() {
  return (
    <Flow
      interval={50}
      distance={1}
      style={{ width: '390px' }}
      styles={{ inner: { width: '150%' } }}
    >
      <Prompts items={items} wrap />
    </Flow>
  );
}
