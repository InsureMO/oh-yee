import { Button, Upload, type UploadProps } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const props: UploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'success',
        size: 123,
        percent: 100,
        type: 'image/png',
      },
      {
        uid: '2',
        name: 'yyy.png',
        status: 'success',
        size: 123,
        percent: 100,
        type: 'image/png',
      },
    ],
  };

  return (
    <Upload {...props}>
      <Button>Upload</Button>
    </Upload>
  );
};
