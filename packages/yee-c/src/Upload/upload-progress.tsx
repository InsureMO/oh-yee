import React from 'react';
import Progress from '../Progress';

interface UploadProgressProps {
    prefixCls?: string;
    file?: any;
    progress?: any;
    showInfo?: boolean;
}

const UploadProgress = React.memo(({ prefixCls, file, progress, showInfo }: UploadProgressProps) => {
    if (file.status === 'uploading' && typeof file.percent !== 'undefined' && progress) {
        const progressProps = { strokeWidth: 4, showInfo: showInfo, ...(progress || {}) };
        return (
            <Progress
                {...progressProps}
                percent={file.percent}
                className={`${prefixCls}-file-progress`}
            />
        );
    }
    return null;
});

UploadProgress.displayName = 'UploadProgress';

export default UploadProgress;
