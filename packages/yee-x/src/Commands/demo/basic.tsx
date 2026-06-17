import { Tag } from '@rainbow-oh/yee-c';
import type { CommandItem } from '@rainbow-oh/yee-x';
import { Commands, Sender } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';

const items = {
  '@': [
    {
      label: 'Coding Assistant',
      key: 'code',
      children: [
        { label: 'Python', key: 'python' },
        { label: 'Java', key: 'java' },
        { label: 'javascript', key: 'javascript' },
      ],
    },
    {
      label: 'Translation Assistant',
      key: 'translate',
      children: [
        { label: 'Chinese to English', key: 'zh2en' },
        { label: 'English to Chinese', key: 'en2zh' },
      ],
    },
  ],
};

export default function Index() {
  const [value, setValue] = useState('');
  const [agent, setAgent] = useState<CommandItem>();

  return (
    <Commands
      items={items}
      onSelect={({ item }) => {
        console.log('item: ', item);
        setAgent(item);
        setValue('');
      }}
    >
      {({ onTrigger, onKeyDown }) => (
        <Sender
          placeholder="Type @ to get suggestions"
          header={
            agent && (
              <Sender.Header closable={false}>
                <Tag closable onClose={() => setAgent(undefined)}>
                  {agent.label}
                </Tag>
              </Sender.Header>
            )
          }
          value={value}
          onChange={(val: string) => {
            if (val.startsWith('@')) {
              onTrigger(val);
            } else {
              onTrigger();
            }
          }}
          onKeyDown={onKeyDown}
        />
      )}
    </Commands>
  );
}
