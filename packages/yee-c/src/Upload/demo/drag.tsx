import { Upload, type UploadProps } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const props: UploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    type: 'drag',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
  };

  return <Upload.Dragger {...props} />;
};
