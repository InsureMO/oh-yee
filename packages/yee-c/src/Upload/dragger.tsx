import clsx from 'clsx';
import { Upload as UploadIcon } from 'lucide-react';
import React from 'react';
import { useLocale } from '../locale';
import type { UploadDraggerProps, UploadInstance } from './interface';
import Upload from './upload';

const Dragger = React.forwardRef<UploadInstance, UploadDraggerProps>(
  (props, ref) => {
    const {
      prefixCls = 'yee-upload-dragger',
      children,
      disabled,
      hint,
    } = props;
    const { t } = useLocale();

    const renderChildren = () => {
      return (
        children ?? (
          <>
            <span className={`${prefixCls}-icon`} aria-hidden="true">
              <UploadIcon size={22} />
            </span>
            <span className={`${prefixCls}-hint`}>
              {hint ?? t('upload.draggerHint')}
            </span>
          </>
        )
      );
    };

    return (
      <Upload {...props} type="drag" ref={ref}>
        <div
          className={clsx(prefixCls, {
            [`${prefixCls}-disabled`]: disabled,
          })}
          role="button"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              event.currentTarget.parentElement
                ?.querySelector<HTMLInputElement>('input[type="file"]')
                ?.click();
            }
          }}
        >
          {renderChildren()}
        </div>
      </Upload>
    );
  },
);

Dragger.displayName = 'Dragger';

export default Dragger;
