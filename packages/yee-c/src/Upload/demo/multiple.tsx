import { Button, Upload } from '@oh/yee-c';
import type { UploadFile } from '../interface';
import React from 'react';

export default () => {
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    multiple: true,
    onChange({ file, fileList }: { file: UploadFile; fileList: UploadFile[] }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button>Select Multiple Files</Button>
    </Upload>
  );
};
