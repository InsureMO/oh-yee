import { X } from 'lucide-react';
import React, { FC } from 'react';
import { SenderHeaderProps } from './interface';

const prefixCls = 'yee-sender-header';

const Header: FC<SenderHeaderProps> = (props) => {
  const { children, title, closable = true } = props;

  const renderTitle = () => {
    if (!title && !closable) return null;
    return (
      <div className={`${prefixCls}-title`}>
        {typeof title !== 'undefined' && (
          <div className={`${prefixCls}-title-content`}>{title}</div>
        )}
        {closable && (
          <span className={`${prefixCls}-close`}>
            <X size={16} strokeWidth={1.5} />
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={`${prefixCls}`}>
      {renderTitle()}
      {children && <div className={`${prefixCls}-content`}>{children}</div>}
    </div>
  );
};

export default Header;
