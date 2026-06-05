import { JsonViewer } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const data = {
    users: [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        profile: {
          age: 25,
          isActive: true,
          settings: {
            theme: 'dark',
            notifications: true,
            language: 'en',
          },
        },
        posts: [
          {
            id: 101,
            title: 'My first post',
            content: 'Hello world!',
            tags: ['introduction', 'personal'],
            published: true,
          },
          {
            id: 102,
            title: 'Another post',
            content: 'This is my second post.',
            tags: ['random'],
            published: false,
          },
        ],
      },
      {
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        profile: {
          age: 30,
          isActive: false,
          settings: {
            theme: 'light',
            notifications: false,
            language: 'zh',
          },
        },
        posts: [],
      },
    ],
    metadata: {
      totalUsers: 2,
      totalPosts: 2,
      lastUpdated: '2023-01-01T00:00:00Z',
    },
  };

  return <JsonViewer data={data} />;
};
