import { Button, Upload } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [fileList, setFileList] = useState<any[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const handleChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture-wall' as const,
    fileList,
    onChange: handleChange,
  };

  return (
    <Upload {...props} />
  );
};
