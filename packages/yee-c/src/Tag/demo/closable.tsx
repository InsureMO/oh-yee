import { Space, Tag } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [tags, setTags] = useState([
    { key: '1', label: 'Tag 1' },
    { key: '2', label: 'Tag 2' },
    { key: '3', label: 'Tag 3' },
  ]);

  const handleClose = (key: string) => {
    setTags(tags.filter((tag) => tag.key !== key));
  };

  return (
    <Space>
      {tags.map((tag) => (
        <Tag key={tag.key} closable onClose={() => handleClose(tag.key)}>
          {tag.label}
        </Tag>
      ))}
    </Space>
  );
};
