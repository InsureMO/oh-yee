import clsx from 'clsx';
import React, { useContext } from 'react';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import useEsc from '../hooks/useEsc';
import useMergedState from '../hooks/useMergedState';
import { useLocale } from '../locale';
import Space from '../Space';
import Trigger from '../Trigger';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { PopconfirmProps } from './interface';
import './style/index.less';

const Popconfirm: React.FC<PopconfirmProps> = (baseprops) => {
  const { popconfirm } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, popconfirm);
  const { locale } = useLocale();
  const { popconfirm: popconfirmLocale } = locale;

  const {
    prefixCls = 'yee-popconfirm',
    children,
    style,
    className,
    icon,
    open,
    defaultOpen,
    title,
    description,
    arrow = { className: `${prefixCls}-arrow` },
    placement = 'top',
    confirmText = popconfirmLocale.okText,
    cancelText = popconfirmLocale.cancelText,
    classNames,
    styles,
    onConfirm,
    onCancel,
    onOpenChange,
    ...rest
  } = props;

  const [mergedOpen, setMergedOpen] = useMergedState(false, {
    value: open,
    defaultValue: defaultOpen,
  });

  const handleOpenChange = (visible: boolean) => {
    setMergedOpen(visible);
    onOpenChange?.(visible);
  };

  // Click to leave the pop-up window
  const cancel = () => {
    handleOpenChange(false);
    onCancel?.();
  };

  // click confirm on the pop-up dialog box
  const confirm = () => {
    handleOpenChange(false);
    onConfirm?.();
  };

  useEsc({
    enabled: mergedOpen,
    onEsc: cancel,
  });

  const popup = (
    <div
      className={clsx(prefixCls, className)}
      style={style}
      role="alertdialog"
      ref={(node) => {
        if (node) {
          const btn = node.querySelector<HTMLButtonElement>('[data-confirm]');
          if (btn) btn.focus();
        }
      }}
    >
      <div
        className={clsx(`${prefixCls}-header`, classNames?.header)}
        style={styles?.header}
      >
        {icon}
        {title ? (
          <h5
            className={clsx(`${prefixCls}-title`, classNames?.title)}
            style={styles?.title}
          >
            {typeof title === 'function' ? title() : title}
          </h5>
        ) : null}
      </div>
      {description ? (
        <div
          className={clsx(`${prefixCls}-description`, classNames?.description)}
          style={styles?.description}
        >
          {typeof description === 'function' ? description() : description}
        </div>
      ) : null}

      <div
        className={clsx(`${prefixCls}-footer`, classNames?.footer)}
        style={styles?.footer}
      >
        <Space block style={{ justifyContent: 'flex-end' }}>
          <Button size="small" onClick={cancel}>
            {cancelText}
          </Button>
          <Button size="small" type="primary" onClick={confirm} data-confirm>
            {confirmText}
          </Button>
        </Space>
      </div>
    </div>
  );

  return (
    <Trigger
      {...rest}
      arrow={arrow}
      trigger="click"
      placement={placement}
      popup={popup}
      open={mergedOpen}
      onOpenChange={handleOpenChange}
    >
      <div className={`${prefixCls}-trigger`}>{children}</div>
    </Trigger>
  );
};

Popconfirm.displayName = 'Popconfirm';

export default Popconfirm;
