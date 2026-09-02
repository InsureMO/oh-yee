import { Button, Upload, type UploadProps } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const props: UploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    directory: true,
    onChange({ file, fileList }) {
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
