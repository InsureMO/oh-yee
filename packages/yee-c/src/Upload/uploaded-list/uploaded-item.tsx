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
import React, { useEffect, useRef, useState } from 'react';

import Button from '../../Button';
import Dialog from '../../Dialog';
import useEvent from '../../hooks/useEvent';
import Space from '../../Space';
import Spin from '../../Spin';
import Tooltip from '../../Tooltip';
import { UploadFile } from '../interface';
import UploadProgress from '../upload-progress';

type FileStatus = 'uploading' | 'error' | 'success' | 'ready';

const fileState: Record<FileStatus, React.ReactElement> = {
  uploading: <Spin type="spin" size="small" />,
  error: <CircleX />,
  success: <CircleCheck />,
  ready: <Paperclip />,
};

const fileStatusTitle = {
  ready: 'Upload Ready',
  uploading: 'Uploading',
  error: 'Upload Error',
  success: 'Upload Success',
} as const;

const fileIcon: Record<string, React.ReactNode> = {
  image: <Image />,
  xlsx: <Paperclip />,
  docx: <Paperclip />,
  pdf: <Paperclip />,
  zip: <Paperclip />,
  unknown: <Paperclip />,
};

const getFileType = (type: string) => {
  const lower = type?.toLowerCase() || '';
  const images = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  if (images.includes(lower)) {
    return 'image';
  }
  if (lower === 'xlsx' || lower === 'xls') {
    return 'xlsx';
  }
  if (lower === 'pdf') {
    return 'pdf';
  }
  if (lower === 'docx' || lower === 'doc') {
    return 'docx';
  }
  if (lower === 'zip') {
    return 'zip';
  }
  return 'unknown';
};

function UploadedItem(props: {
  prefixCls?: string;
  file: UploadFile;
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
}) {
  const {
    prefixCls,
    file,
    listType,
    progress,
    showUploadList,
    itemRender,
    onRemove,
    onReUpload,
    onPreview,
  } = props;

  const {
    showTooltip = true,
    showReload = true,
    showRemoveIcon = true,
    showPreviewIcon = true,
    reloadIcon,
    removeIcon,
    previewIcon,
  } = typeof showUploadList === 'object' ? showUploadList : ({} as any);

  const [objectUrl, setObjectUrl] = useState<string>('');
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const previewImageSrc = useRef<string>('');

  // Create and clean up object URL to prevent memory leaks
  useEffect(() => {
    if (file.raw && file.raw instanceof File) {
      const url = URL.createObjectURL(file.raw);
      setObjectUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file.raw]);

  const closeDialog = useEvent(() => {
    setImagePreviewOpen(false);
  });

  const showImage = () => {
    if (onPreview) {
      onPreview(file);
    } else if (objectUrl) {
      previewImageSrc.current = objectUrl;
      setImagePreviewOpen(true);
    }
  };

  const renderReload = () => {
    if (!showReload) {
      return null;
    }
    const icon = reloadIcon || <RotateCcw size={18} />;
    return (
      <Button
        size="small"
        icon={icon}
        variant="text"
        color="danger"
        onClick={(e) => {
          e.stopPropagation();
          onReUpload?.(file);
        }}
      />
    );
  };

  const renderTrash = () => {
    if (!showRemoveIcon) {
      return null;
    }
    const icon = removeIcon || <Trash2 size={18} />;
    return (
      <Button
        size="small"
        icon={icon}
        variant="text"
        color="danger"
        onClick={(e) => {
          e.stopPropagation();
          onRemove?.(file);
        }}
      />
    );
  };

  const renderPreview = () => {
    if (!showPreviewIcon) {
      return null;
    }
    const icon = previewIcon || <Eye size={18} />;
    const fileType = getFileType(file.type || '');

    if (fileType === 'image' || file.type?.startsWith('image/')) {
      return (
        <Button
          size="small"
          icon={icon}
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            showImage();
          }}
        />
      );
    }

    return null;
  };

  if (listType === 'picture-wall') {
    const fileType = getFileType(file.type || '');

    const getShowCase = () => {
      if (file.status === 'error' || fileType !== 'image') {
        return fileIcon[fileType] || <Paperclip size={18} />;
      }

      if (fileType === 'image' && objectUrl) {
        return <img src={objectUrl} alt={file.name} />;
      }

      return fileIcon[fileType] || <Paperclip size={18} />;
    };

    return (
      <>
        <div
          className={clsx(`${prefixCls}-picture-wall-item`, {
            [`${prefixCls}-state-` + file.status]: file.status,
          })}
          key={file.uid}
        >
          {file.status === 'uploading' ? (
            <UploadProgress file={file} progress={progress} />
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
                  {fileType !== 'image' && (
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
        <Dialog
          className={`${prefixCls}-picture-dialog`}
          open={imagePreviewOpen}
          onCancel={closeDialog}
          footer={false}
        >
          <img
            src={previewImageSrc.current}
            alt="preview"
            style={{ maxWidth: '100%' }}
          />
        </Dialog>
      </>
    );
  }

  if (listType === 'picture-list') {
    const fileType = getFileType(file.type || '');

    return (
      <>
        <div
          className={clsx(`${prefixCls}-picture-list-item`, {
            [`${prefixCls}-state-` + file.status]: file.status,
          })}
          key={file.uid}
        >
          {file.status === 'uploading' ? (
            <div className={`${prefixCls}-uploading`}>
              <Spin className={`${prefixCls}-uploading-spin`} type="spin" />
              <div className={`${prefixCls}-uploading-content`}>
                <div>{file.name ? file.name : 'Uploading...'}</div>
                <UploadProgress file={file} progress={progress} />
              </div>
            </div>
          ) : (
            <>
              <div className={`${prefixCls}-picture-list-item-content`}>
                {file.status === 'error' ? (
                  <Image />
                ) : (
                  <>
                    {fileType === 'image' && objectUrl ? (
                      <img
                        className={`${prefixCls}-picture-list-header-img`}
                        src={objectUrl}
                        alt={file.name}
                      />
                    ) : (
                      fileIcon[fileType] || <Image />
                    )}
                  </>
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
      </>
    );
  }

  const renderItem = () => {
    const node = (
      <div
        className={clsx(`${prefixCls}-list-item`, {
          [`${prefixCls}-state-` + file.status]: file.status,
          [`${prefixCls}-list-item-clickable`]: !!onPreview,
        })}
        onClick={() => onPreview?.(file)}
        key={file.uid}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={`${prefixCls}-item-icon`}>
            {fileState[file.status as FileStatus] || <Paperclip size={18} />}
          </div>
          <span className={`${prefixCls}-item-name-content`}>{file.name}</span>
        </div>
        {file.status !== 'uploading' && (
          <Space
            className={`${prefixCls}-item-operate`}
            gap={8}
            onClick={(event) => event.stopPropagation()}
          >
            {itemRender?.(file, [])}
            {file.status === 'error' ? renderReload() : renderPreview()}
            {renderTrash()}
          </Space>
        )}
      </div>
    );

    if (showTooltip) {
      return (
        <Tooltip
          title={
            fileStatusTitle[file.status as FileStatus] || fileStatusTitle.ready
          }
        >
          {node}
        </Tooltip>
      );
    }

    return node;
  };

  return (
    <>
      {renderItem()}
      {file.status === 'uploading' && (
        <div className={`${prefixCls}-item-progress`} title={file.name}>
          <UploadProgress file={file} progress={progress} showInfo />
        </div>
      )}
    </>
  );
}

export default UploadedItem;
