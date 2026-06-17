import { Upload } from '@rainbow-oh/yee-c';
import React, { FC } from 'react';
import { AttachmentsProps } from './interface';

const Attachment: FC<AttachmentsProps> = (props) => {
  //   const { prefixCls = 'yee-attchment', onChange } = props;

  //   const handleChange = ({ file, fileList, event }) => {
  //     onChange?.({ file: file });
  //   };

  return <Upload {...props} action="" />;
};

export default Attachment;
