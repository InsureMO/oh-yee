import {
  Button,
  Upload,
  type UploadFile,
  type UploadInstance,
} from '@rainbow-oh/yee-c';
import React, { useRef, useState } from 'react';

export default () => {
  const uploadRef = useRef<UploadInstance>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const readyCount = fileList.filter((file) => file.status === 'ready').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Upload
        ref={uploadRef}
        autoUpload={false}
        multiple
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        fileList={fileList}
        onChange={({ fileList: nextFileList }) => setFileList(nextFileList)}
      />
      <div>
        <Button
          type="primary"
          disabled={readyCount === 0}
          onClick={() => uploadRef.current?.upload()}
        >
          Start upload ({readyCount})
        </Button>
      </div>
    </div>
  );
};
