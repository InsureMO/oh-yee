import { Button, Upload } from '@oh/yee-c';
import React from 'react';

export default () => {
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }: any) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        raw: {} as any,
        size: 123,
        percent: 0,
        type: 'image/png',
      },
      {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        raw: {} as any,
        size: 123,
        percent: 0,
        type: 'image/png',
      },
    ],
  };

  return (
    // @ts-ignore
    <Upload {...props}>
      <Button>Upload</Button>
    </Upload>
  );
};
