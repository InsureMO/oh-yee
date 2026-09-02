import React from 'react';
import type { UploadFile } from '../interface';
import UploadedItem from './uploaded-item';

interface UploadListProps {
  prefixCls?: string;
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
  isPreviewable?: (file: UploadFile) => boolean;
  renderUploadTrigger?: () => React.ReactNode;
}

const UploadList = (props: UploadListProps) => {
  const { prefixCls, fileList, isPreviewable, renderUploadTrigger, ...rest } =
    props;

  if (!Array.isArray(fileList) || fileList.length === 0) {
    return renderUploadTrigger?.();
  }

  return (
    <div className={`${prefixCls}-list`} aria-live="polite">
      {fileList.map((file, index) => {
        return (
          <UploadedItem
            {...rest}
            prefixCls={prefixCls}
            file={file}
            fileList={fileList}
            previewable={isPreviewable?.(file) ?? false}
            key={file.uid || `${file.name}-${index}`}
          />
        );
      })}
      {renderUploadTrigger?.()}
    </div>
  );
};

export default UploadList;
