import clsx from 'clsx';
import { CircleAlert, CircleCheckBig, CircleX, Info, X } from 'lucide-react';
import React, { useContext } from 'react';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import { AlertProps } from './interface';
import './style/index.less';

const ICON_STROKE_WIDTH = 1.5; // Icon stroke width

const iconMap = {
  info: { small: <Info />, large: <Info /> },
  success: { small: <CircleCheckBig />, large: <CircleCheckBig /> },
  warning: { small: <CircleAlert />, large: <CircleAlert /> },
  error: { small: <CircleX />, large: <CircleX /> },
};

const Alert: React.FC<AlertProps> = (baseprops) => {
  const { alert } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, alert);
  const {
    prefixCls = 'yee-alert',
    status = 'info',
    icon,
    closable,
    title,
    showIcon = true,
    description,
    banner,
    style,
    className,
    styles,
    classNames,
    onClose,
    ...rest
  } = props;

  const sizeType = title && description ? 'large' : 'small';

  const mergedState = Object.keys(iconMap).includes(status) ? status : 'info';

  const iconNode = showIcon && (
    <div
      className={clsx(
        `${prefixCls}-icon`,
        [`${prefixCls}-icon-${sizeType}`],
        classNames?.icon,
      )}
      style={styles?.icon}
    >
      {icon ? icon : iconMap[mergedState][sizeType]}
    </div>
  );

  // title
  const renderTitle = () => {
    return title ? (
      <div
        className={clsx(`${prefixCls}-title`, classNames?.title)}
        style={styles?.title}
      >
        {title}
      </div>
    ) : null;
  };

  // Description
  const renderDescription = () => {
    return description ? (
      <div
        className={clsx(`${prefixCls}-description`, classNames?.description)}
        style={styles?.description}
        aria-description="alert description"
      >
        {description}
      </div>
    ) : null;
  };

  return (
    <div
      {...rest}
      className={clsx(
        prefixCls,
        [`${prefixCls}-${mergedState}`],
        [`${prefixCls}-${sizeType}`],
        {
          [`${prefixCls}-banner`]: banner,
        },
        className,
      )}
      style={style}
    >
      {closable && (
        <Button
          type="text"
          size="small"
          icon={<X size={16} strokeWidth={ICON_STROKE_WIDTH} />}
          className={clsx(`${prefixCls}-close`, classNames?.close)}
          style={styles?.close}
          aria-label="close"
          onClick={onClose}
        />
      )}
      {iconNode}
      <div
        className={clsx(`${prefixCls}-content`, classNames?.content)}
        style={styles?.content}
      >
        {renderTitle()}
        {renderDescription()}
      </div>
    </div>
  );
};

export default Alert;
