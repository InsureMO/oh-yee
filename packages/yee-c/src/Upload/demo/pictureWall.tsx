import { Upload, type UploadFile, type UploadProps } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const imageUrl =
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image-1.png',
      status: 'success',
      type: 'image/png',
      url: imageUrl,
    },
    {
      uid: '-2',
      name: 'image-2.png',
      status: 'success',
      type: 'image/png',
      url: imageUrl,
    },
    {
      uid: '-3',
      name: 'image-3.png',
      status: 'success',
      type: 'image/png',
      url: imageUrl,
    },
  ]);

  const props: UploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture-wall',
    fileList,
    onChange: ({ fileList: nextFileList }) => setFileList(nextFileList),
  };

  return <Upload {...props} />;
};
