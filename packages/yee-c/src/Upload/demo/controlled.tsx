import {
  Button,
  Upload,
  type UploadFile,
  type UploadProps,
} from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    fileList,
    onChange({ file, fileList: nextFileList }) {
      setFileList(nextFileList);
      if (file.status !== 'uploading') {
        console.log(file, nextFileList);
      }
    },
    onRemove(file) {
      setFileList((current) => current.filter((item) => item.uid !== file.uid));
      return true;
    },
  };

  return (
    <Upload {...props}>
      <Button>Controlled Upload</Button>
    </Upload>
  );
};
