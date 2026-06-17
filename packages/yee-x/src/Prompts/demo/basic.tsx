import { Prompts } from '@rainbow-oh/yee-x';
import { Blend } from 'lucide-react';
import React from 'react';

const items = [
  {
    key: 1,
    icon: <Blend color="yellow" size={14} />,
    label: 'Generate Question',
    description: 'Randomly generate a question',
  },
  { key: 2, label: 'Tell a Joke', description: 'Randomly generate a joke' },
];

export default function Index() {
  return (
    <Prompts
      title="This is a demo for the prompts collection"
      items={items}
      onItemClick={(item) => {
        console.log('item: ', item);
      }}
    />
  );
}
