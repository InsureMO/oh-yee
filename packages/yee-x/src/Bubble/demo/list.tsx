import { Bubble } from '@rainbow-oh/yee-x';
import React from 'react';

const items = [
  { role: 'assistant', content: 'Hello everyone!' },
  { role: 'assistant', content: 'Great job today!' },
  { role: 'user', content: 'Thank you, happy to help!' },
];

const roles: any = {
  assistant: {
    avatar: {
      icon: <span>A</span>,
      style: { backgroundColor: 'red', color: 'white' },
    },
    placement: 'start',
  },
  user: {
    avatar: {
      icon: <span>U</span>,
      style: { backgroundColor: 'blue', color: 'white' },
    },
    placement: 'end',
  },
};

export default function Index() {
  return <Bubble.List items={items} roles={roles} />;
}
