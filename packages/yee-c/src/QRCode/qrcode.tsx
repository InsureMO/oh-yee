import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { RefreshCw } from 'lucide-react';
import Spin from '../Spin';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import { useLocale } from '../locale';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { QRCodeProps } from './interface';

import './style/index.less';

const QRCODE_PADDING = 16;

interface ImageSettings {
  src: string;
  height: number | undefined;
  width: number | undefined;
  excavate: boolean;
}

interface QRCodePropsType {
  value: string;
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
  bgColor: string;
  fgColor: string;
  imageSettings?: ImageSettings;
}

const QRCode = React.forwardRef<HTMLDivElement, QRCodeProps>((baseprops, ref) => {
  const { qrcode } = useContext(GlobalContext);
  const { locale } = useLocale();
  const { qrcode: qrcodeLocale } = locale;
  const props = mergeContextToProps(baseprops, qrcode);
  const {
    prefixCls = 'yee-qrcode',
    value,
    type = 'canvas',
    icon,
    size = 160,
    iconSize,
    color,
    bgColor = 'transparent',
    errorLevel = 'M',
    className,
    style,
    bordered = true,
    status,
    message,
    onRefresh,
    statusRender,
    ...rest
  } = props;

  const [fontColor, setFontColor] = useState(color);

  useEffect(() => {
    if (!color) {
      const computedStyle = getComputedStyle(document.documentElement);
      const canvasColor = computedStyle.getPropertyValue('--yee-qrcode-fill-color').trim() || '#333';
      setFontColor(canvasColor);
    } else {
      setFontColor(color);
    }
  }, [color]);

  if (!value) {
    return null;
  }

  const imageSettings: ImageSettings | undefined = icon
    ? {
        src: icon,
        height: iconSize,
        width: iconSize,
        excavate: true,
      }
    : undefined;

  const qrcodeProps: QRCodePropsType = {
    value,
    size: size - QRCODE_PADDING,
    level: errorLevel,
    bgColor,
    fgColor: fontColor || '',
    imageSettings,
  };

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-withborder`]: bordered,
    },
    className
  );

  const mergedStyle = {
    ...style,
    width: size,
    height: size,
  };

  const renderStatus = () => {
    if (!status && !statusRender) {
      return null;
    }

    if (statusRender) {
      return statusRender({ status: status || 'active', onRefresh });
    }

    switch (status) {
      case 'loading':
        return <Spin type="spinningBubbles" />;
      case 'expired':
        return (
          <>
            <p>{message || qrcodeLocale.expired}</p>
            {onRefresh && (
              <Button
                variant="link"
                size="small"
                icon={<RefreshCw size={16} />}
                onClick={onRefresh}
              >
                {qrcodeLocale.refresh}
              </Button>
            )}
          </>
        );
      case 'scanned':
        return <p>{message || qrcodeLocale.scanned}</p>;
      default:
        return null;
    }
  };

  const statusContent = renderStatus();

  return (
    <div
      {...rest}
      className={cls}
      style={mergedStyle}
      ref={ref}
      role="img"
      aria-label={`QR Code: ${value}`}
    >
      {statusContent && <div className={`${prefixCls}-mask`}>{statusContent}</div>}
      {type === 'canvas' ? (
        // @ts-ignore
        <QRCodeCanvas {...qrcodeProps} fgColor={fontColor} />
      ) : (
        // @ts-ignore
        <QRCodeSVG {...qrcodeProps} />
      )}
    </div>
  );
});

QRCode.displayName = 'QRCode';

export default QRCode;
