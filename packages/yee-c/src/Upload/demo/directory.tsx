import { Button, Upload } from '@rainbow-oh/yee-c';
import React from 'react';
import type { UploadFile } from '../interface';

export default () => {
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    directory: true,
    onChange({ file, fileList }: { file: UploadFile; fileList: UploadFile[] }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button>Upload Directory</Button>
    </Upload>
  );
};
