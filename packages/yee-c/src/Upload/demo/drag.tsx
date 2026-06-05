import { Upload } from '@rainbow-oh/yee-c';
import React from 'react';
import type { UploadFile } from '../interface';

export default () => {
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    type: 'drag' as const,
    onChange({ file, fileList }: { file: UploadFile; fileList: UploadFile[] }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
  };

  return (
    <Upload.Dragger {...props}>
      {/* <div style={{ padding: '20px', border: '1px dashed #ccc' }}>
        <p>Click or drag file to this area to upload</p>
      </div> */}
    </Upload.Dragger>
  );
};
