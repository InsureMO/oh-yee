import React from 'react';
import clsx from 'clsx';
import {Upload as UploadIcon } from 'lucide-react';
import { useLocale } from '../locale';
import Upload from './upload';


const Dragger = React.forwardRef((props: any, ref) => {
    const { prefixCls='yee-upload-dragger', children, disabled, hint, ...rest } = props;
    const { t } = useLocale();


    const renderChildren = () => {
        return children ?? (
            <>
                <span className={`${prefixCls}-icon`}><UploadIcon size={22} /></span>
                <span className={`${prefixCls}-hint`}>{hint ?? t("upload.draggerHint")}</span>
            </>
        );
    };

    return (
        <Upload {...props} type='drag' ref={ref}>
            <div
                className={clsx(`${prefixCls}`, {
                    [`${prefixCls}-disabled`]: disabled
                })}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={function (e) {
                    if (e.key === 'Enter') {
                        (e.target as HTMLDivElement).click();
                    }
                }}
            >
                {renderChildren()}
            </div>
        </Upload>
    );
});

Dragger.displayName = 'Dragger';

export default Dragger;
