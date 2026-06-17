import { Spin } from '@rainbow-oh/yee-c';
import { CircleX } from 'lucide-react';
import React, { FC } from 'react';
import { FileCardProps } from './interface';

import './style/file-card.less';

const getFileSize = (size: number | string) => {
  if (typeof size === 'string') {
    return size;
  }
  const step = ['B', 'KB', 'MB', 'GB', 'TB'];
  let _size = size;
  let index = 0;
  while (_size > 1024) {
    _size /= 1024;
    index++;
  }
  return _size.toFixed(2) + step[index];
};

const FileCard: FC<FileCardProps> = (props) => {
  const {
    prefixCls = 'yee-file-card',
    name,
    size,
    description,
    status,
    closable = true,
    onClose,
  } = props;

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose?.();
  };

  const renderFileIcon = ({
    name,
    status,
  }: {
    name: string;
    status?: string;
  }) => {
    if (status === 'uploading') {
      return <Spin size="small" />;
    }
    const ext = name.toLowerCase().split('.').pop();
    switch (ext) {
      case 'pdf':
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z"
              fill="#E53E3E"
              opacity="0.1"
            />
            <path
              d="M14 2l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8z"
              stroke="#E53E3E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v6h6"
              stroke="#E53E3E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="12"
              y="17"
              textAnchor="middle"
              fontSize="5"
              fontWeight="bold"
              fill="#E53E3E"
            >
              PDF
            </text>
          </svg>
        );
      case 'docx':
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z"
              fill="#2B6CB0"
              opacity="0.1"
            />
            <path
              d="M14 2l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8z"
              stroke="#2B6CB0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v6h6"
              stroke="#2B6CB0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="12"
              y="17"
              textAnchor="middle"
              fontSize="4"
              fontWeight="bold"
              fill="#2B6CB0"
            >
              DOC
            </text>
          </svg>
        );
      case 'xlsx':
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z"
              fill="#2F855A"
              opacity="0.1"
            />
            <path
              d="M14 2l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8z"
              stroke="#2F855A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v6h6"
              stroke="#2F855A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="12"
              y="17"
              textAnchor="middle"
              fontSize="4"
              fontWeight="bold"
              fill="#2F855A"
            >
              XLS
            </text>
          </svg>
        );
      case 'pptx':
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z"
              fill="#C05621"
              opacity="0.1"
            />
            <path
              d="M14 2l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8z"
              stroke="#C05621"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v6h6"
              stroke="#C05621"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="12"
              y="17"
              textAnchor="middle"
              fontSize="4"
              fontWeight="bold"
              fill="#C05621"
            >
              PPT
            </text>
          </svg>
        );
    }
  };

  const renderClose = () => {
    if (closable) {
      return (
        <span className={`${prefixCls}-close`} onClick={handleClose}>
          <CircleX size={20} strokeWidth={1.5} />
        </span>
      );
    }
  };

  return (
    <div className={`${prefixCls}`}>
      {renderClose()}
      {renderFileIcon({ name, status })}
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-name`}>{name}</div>
        {size && <div className={`${prefixCls}-size`}>{getFileSize(size)}</div>}
        {description && (
          <div className={`${prefixCls}-desc`}>{description}</div>
        )}
      </div>
    </div>
  );
};

export default FileCard;
