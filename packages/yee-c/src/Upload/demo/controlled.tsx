import { Button, Upload } from '@rainbow-oh/yee-c';
import type { UploadFile } from '../interface';
import React, { useState } from 'react';

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    fileList,
    onChange({ file, fileList }: { file: UploadFile; fileList: UploadFile[] }) {
      setFileList(fileList);
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    onRemove(file: UploadFile) {
      setFileList(fileList.filter((item) => item.uid !== file.uid));
      return true;
    },
  };

  return (
    <Upload {...props}>
      <Button>Controlled Upload</Button>
    </Upload>
  );
};
