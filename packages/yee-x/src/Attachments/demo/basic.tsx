import { Button } from '@rainbow-oh/yee-c';
import { Attachments, Sender } from '@rainbow-oh/yee-x';
import { Upload } from 'lucide-react';
import React, { useState } from 'react';

export default function Index() {
  const [files, setFiles] = useState<any[]>([]);
  const onUpload = ({ file }: any) => {
    console.log(file);
    setFiles((state) => [...state, file]);
  };

  const onClose = (file: any) => {
    setFiles((state) => [...state.filter((item) => item.uid !== file.uid)]);
  };

  const onSend = (message: string) => {
    console.log(message);
  };

  return (
    <Sender
      actions={
        <Attachments beforeUpload={() => false} onChange={onUpload}>
          <Button variant="text" icon={<Upload size={16} strokeWidth={1} />} />
        </Attachments>
      }
      footer={
        files.length ? (
          <Sender.Footer>
            {files.map((file) => (
              <Attachments.FileCard
                {...file}
                onClose={() => onClose(file)}
                key={file.uid}
              />
            ))}
          </Sender.Footer>
        ) : null
      }
      onSend={onSend}
    />
  );
}
