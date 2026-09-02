import clsx from 'clsx';
import {
  CircleCheck,
  CircleX,
  Eye,
  Image,
  Paperclip,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import Button from '../../Button';
import Space from '../../Space';
import Spin from '../../Spin';
import Tooltip from '../../Tooltip';
import type { UploadFile } from '../interface';
import UploadProgress from '../upload-progress';

type FileStatus = UploadFile['status'];

const fileState: Record<FileStatus, React.ReactElement> = {
  uploading: <Spin type="spin" size="small" />,
  error: <CircleX size={14}/>,
  success: <CircleCheck size={14}/>,
  ready: <Paperclip size={14}/>,
};

const fileStatusTitle: Record<FileStatus, string> = {
  ready: 'Upload Ready',
  uploading: 'Uploading',
  error: 'Upload Error',
  success: 'Upload Success',
};

const fileIcon: Record<string, React.ReactNode> = {
  image: <Image size={14} />,
  xlsx: <Paperclip size={14} />,
  docx: <Paperclip size={14} />,
  pdf: <Paperclip size={14} />,
  zip: <Paperclip size={14} />,
  unknown: <Paperclip size={14} />,
};

const getFileType = (type: string) => {
  const lower = type?.toLowerCase() || '';
  const images = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  if (lower.startsWith('image/') || images.includes(lower)) {
    return 'image';
  }
  if (lower === 'xlsx' || lower === 'xls') {
    return 'xlsx';
  }
  if (lower === 'pdf' || lower === 'application/pdf') {
    return 'pdf';
  }
  if (lower === 'docx' || lower === 'doc') {
    return 'docx';
  }
  if (lower === 'zip' || lower.includes('zip')) {
    return 'zip';
  }
  return 'unknown';
};

interface UploadedItemProps {
  prefixCls?: string;
  file: UploadFile;
  fileList: UploadFile[];
  listType?: string;
  progress?: boolean | object;
  showUploadList?:
    | boolean
    | {
        showTooltip?: boolean;
        showRemoveIcon?: boolean;
        showReload?: boolean;
        showPreviewIcon?: boolean;
        removeIcon?: React.ReactNode;
        reloadIcon?: React.ReactNode;
        previewIcon?: React.ReactNode;
      };
  itemRender?: (file: UploadFile, fileList: UploadFile[]) => React.ReactNode;
  onRemove?: (file: UploadFile) => void;
  onReUpload?: (file: UploadFile) => void;
  onPreview?: (file: UploadFile) => void;
  previewable?: boolean;
}

function UploadedItem(props: UploadedItemProps) {
  const {
    prefixCls = 'yee-upload',
    file,
    fileList,
    listType,
    progress,
    showUploadList,
    itemRender,
    onRemove,
    onReUpload,
    onPreview,
    previewable = false,
  } = props;

  const uploadListConfig =
    typeof showUploadList === 'object' ? showUploadList : undefined;
  const showTooltip = uploadListConfig?.showTooltip ?? true;
  const showReload = uploadListConfig?.showReload ?? true;
  const showRemoveIcon = uploadListConfig?.showRemoveIcon ?? true;
  const showPreviewIcon = uploadListConfig?.showPreviewIcon ?? true;
  const reloadIcon = uploadListConfig?.reloadIcon;
  const removeIcon = uploadListConfig?.removeIcon;
  const previewIcon = uploadListConfig?.previewIcon;

  const [objectUrl, setObjectUrl] = useState('');

  useEffect(() => {
    if (file.raw instanceof File) {
      const url = URL.createObjectURL(file.raw);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setObjectUrl('');
    return undefined;
  }, [file.raw]);

  const previewSrc = file.url || objectUrl;
  const inferredType = file.type || file.name.split('.').pop() || '';
  const fileType = getFileType(inferredType);
  const isImage = fileType === 'image';

  const renderReload = () => {
    if (!showReload) {
      return null;
    }
    return (
      <Button
        size="small"
        icon={reloadIcon || <RotateCcw size={18} />}
        variant="text"
        color="danger"
        aria-label={`Retry ${file.name}`}
        title={`Retry ${file.name}`}
        onClick={(event) => {
          event.stopPropagation();
          onReUpload?.(file);
        }}
      />
    );
  };

  const renderTrash = () => {
    if (!showRemoveIcon) {
      return null;
    }
    return (
      <Button
        size="small"
        icon={removeIcon || <Trash2 size={16} />}
        variant="text"
        color="danger"
        aria-label={`Remove ${file.name}`}
        title={`Remove ${file.name}`}
        onClick={(event) => {
          event.stopPropagation();
          onRemove?.(file);
        }}
      />
    );
  };

  const renderPreview = () => {
    if (!showPreviewIcon || !isImage || !previewable) {
      return null;
    }
    return (
      <Button
        size="small"
        icon={previewIcon || <Eye size={16} />}
        variant="text"
        aria-label={`Preview ${file.name}`}
        title={`Preview ${file.name}`}
        onClick={(event) => {
          event.stopPropagation();
          onPreview?.(file);
        }}
      />
    );
  };

  const getShowCase = () => {
    if (file.status === 'error' || !isImage) {
      return fileIcon[fileType] || <Paperclip size={14} />;
    }
    if (previewSrc) {
      return <img src={previewSrc} alt={file.name} />;
    }
    return fileIcon[fileType] || <Paperclip size={14} />;
  };

  if (listType === 'picture-wall') {
    return (
      <div
        className={clsx(`${prefixCls}-picture-wall-item`, {
          [`${prefixCls}-state-${file.status}`]: file.status,
        })}
        aria-label={`${file.name}: ${fileStatusTitle[file.status]}`}
      >
        {file.status === 'uploading' ? (
          <UploadProgress
            prefixCls={prefixCls}
            file={file}
            progress={progress}
          />
        ) : (
          <>
            {file.status === 'error' ? (
              <div className={`${prefixCls}-picture-wall-item-error`}>
                {getShowCase()}
                <span className={`${prefixCls}-picture-wall-name`}>
                  {file.name}
                </span>
              </div>
            ) : (
              <div className={`${prefixCls}-picture-wall-item-content`}>
                {getShowCase()}
                {!isImage && (
                  <span className={`${prefixCls}-picture-wall-name`}>
                    {file.name}
                  </span>
                )}
              </div>
            )}
            <div className={`${prefixCls}-picture-wall-item-operate`}>
              {file.status === 'error' ? (
                renderReload()
              ) : (
                <>
                  {renderPreview()}
                  {renderTrash()}
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  if (listType === 'picture-list') {
    return (
      <div
        className={clsx(`${prefixCls}-picture-list-item`, {
          [`${prefixCls}-state-${file.status}`]: file.status,
        })}
        aria-label={`${file.name}: ${fileStatusTitle[file.status]}`}
      >
        {file.status === 'uploading' ? (
          <div className={`${prefixCls}-uploading`}>
            <Spin className={`${prefixCls}-uploading-spin`} type="spin" />
            <div className={`${prefixCls}-uploading-content`}>
              <div>{file.name || 'Uploading...'}</div>
              <UploadProgress
                prefixCls={prefixCls}
                file={file}
                progress={progress}
              />
            </div>
          </div>
        ) : (
          <>
            <div className={`${prefixCls}-picture-list-item-content`}>
              {file.status === 'error' ? (
                <Image />
              ) : isImage && previewSrc ? (
                <img
                  className={`${prefixCls}-picture-list-header-img`}
                  src={previewSrc}
                  alt={file.name}
                />
              ) : (
                fileIcon[fileType] || <Image size={14} />
              )}
              <span>{file.name}</span>
            </div>
            <div className={`${prefixCls}-picture-list-item-operate`}>
              {file.status === 'error' && renderReload()}
              {renderPreview()}
              {renderTrash()}
            </div>
          </>
        )}
      </div>
    );
  }

  const itemNode = (
    <div
      className={clsx(`${prefixCls}-list-item`, {
        [`${prefixCls}-state-${file.status}`]: file.status,
        [`${prefixCls}-list-item-clickable`]: previewable,
      })}
      role={previewable ? 'button' : undefined}
      tabIndex={previewable ? 0 : undefined}
      aria-label={`${file.name}: ${fileStatusTitle[file.status]}`}
      onClick={() => previewable && onPreview?.(file)}
      onKeyDown={(event) => {
        if (previewable && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onPreview?.(file);
        }
      }}
    >
      <div className={`${prefixCls}-item-label`}>
        <div className={`${prefixCls}-item-icon`} aria-hidden="true">
          {fileState[file.status] || <Paperclip size={14} />}
        </div>
        <span className={`${prefixCls}-item-name-content`}>{file.name}</span>
      </div>
      {file.status !== 'uploading' && (
        <Space
          className={`${prefixCls}-item-operate`}
          gap={8}
          onClick={(event) => event.stopPropagation()}
        >
          {itemRender?.(file, fileList)}
          {file.status === 'error' ? renderReload() : renderPreview()}
          {renderTrash()}
        </Space>
      )}
    </div>
  );

  return (
    <>
      {showTooltip ? (
        <Tooltip title={fileStatusTitle[file.status]}>{itemNode}</Tooltip>
      ) : (
        itemNode
      )}
      {file.status === 'uploading' && (
        <div className={`${prefixCls}-item-progress`} title={file.name}>
          <UploadProgress
            prefixCls={prefixCls}
            file={file}
            progress={progress}
            showInfo
          />
        </div>
      )}
    </>
  );
}

export default UploadedItem;
