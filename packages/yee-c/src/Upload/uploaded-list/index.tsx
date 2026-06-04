import React from 'react';
import UploadedItem from './uploaded-item';
import { UploadFile } from '../interface';

interface UploadListProps {
    prefixCls?: string;
    fileList: UploadFile[];
    listType?: string;
    progress?: boolean | object;
    showUploadList?: boolean | {
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
    renderUploadTrigger?: () => React.ReactNode;
}

const UploadList = (props: UploadListProps) => {
    const { prefixCls, fileList, renderUploadTrigger, ...rest } = props;

    if (!Array.isArray(fileList) || fileList.length === 0) {
        return renderUploadTrigger?.();
    }

    return (
        <div className={`${prefixCls}-list`}>
            {
                fileList.map((file) => {
                    return <UploadedItem {...rest} prefixCls={prefixCls} file={file} key={file.uid} />;
                })
            }
            {renderUploadTrigger?.()}
        </div>
    );
};

export default UploadList;
