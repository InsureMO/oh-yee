import clsx from 'clsx';
import {
  FlipHorizontal,
  FlipVertical,
  RotateCcw,
  RotateCw,
  Maximize,
  ZoomIn,
  ZoomOut,
  Download,
} from 'lucide-react';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Space from '../Space';
import Button from '../Button';
import Divider from '../Divider';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import useMove from './hooks/useMove';
import { PopupCtx } from './popup';
import type { ImageViewerProps } from './interface';

import './style/index.less';

const ICON_SIZE = 18;
const ICON_STROKE_WIDTH = 1.5;

const ImageViewer: React.FC<ImageViewerProps> = (baseprops) => {
  const { imageviewer } = useContext(GlobalContext);
  const props = mergeContextToProps<ImageViewerProps>(baseprops, imageviewer);

  const {
    prefixCls = 'yee-image-viewer',
    className,
    style,
    classNames,
    styles,
    position = 'bottom',
    src,
    alt,
    name,
    min = 0.5,
    max = 3,
    ...rest
  } = props;

  const { open, onClose, popup } = useContext(PopupCtx);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const nWidth = useRef(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initRatio = useRef(0);

  const { onMove, onTouchStart, moveX, moveY, reset } = useMove(imgRef, { moveable: true });

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const clientWidth = img.clientWidth;
      nWidth.current = naturalWidth;
      const ratio = Number((clientWidth / naturalWidth).toFixed(2));
      initRatio.current = ratio;
      setScale(ratio);
    };
  }, [src]);

  useEffect(() => {
    if (scale <= initRatio.current) {
      reset();
    }
  }, [scale, reset]);

  const handleMinus = useCallback(() => {
    const temp = Number(scale.toFixed(1));
    const ratio = temp > min ? Number((temp - 0.1).toFixed(1)) : min;
    setScale(ratio);
  }, [scale, min]);

  const handlePlus = useCallback(() => {
    const temp = Number(scale.toFixed(1));
    const ratio = temp + 0.1 <= max ? Number((temp + 0.1).toFixed(1)) : max;
    setScale(ratio);
  }, [scale, max]);

  const handleFlipX = useCallback(() => {
    setScaleX((prev) => -prev);
  }, []);

  const handleFlipY = useCallback(() => {
    setScaleY((prev) => -prev);
  }, []);

  const handleRotateCcw = useCallback(() => {
    setRotate((prev) => (prev - 90 <= -360 ? 0 : prev - 90));
  }, []);

  const handleRotateCw = useCallback(() => {
    setRotate((prev) => (prev + 90 >= 360 ? 0 : prev + 90));
  }, []);

  const handleFullscreen = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (wrapper && !document.fullscreenElement) {
      wrapper.requestFullscreen().catch(() => {});
    }
  }, []);

  const handleDownload = useCallback(() => {
    const a = document.createElement('a');
    a.href = src || '';
    a.download = name || 'image';
    a.click();
  }, [src, name]);

  const toolbarDirection = position === 'left' || position === 'right' ? 'vertical' : 'horizontal';
  const zoomPercent = `${(scale * 100).toFixed(0)}%`;

  return (
    <div
      {...rest}
      className={clsx(prefixCls, `${prefixCls}-${position}`, className)}
      style={style}
      role="application"
      aria-label="Image viewer"
    >
      <Space
        role="toolbar"
        aria-label="Image controls"
        direction={toolbarDirection}
        className={clsx(`${prefixCls}-toolbar`, classNames?.toolbar)}
        style={styles?.toolbar}
      >
        <Button type="text" icon={<FlipHorizontal size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />} onClick={handleFlipX} aria-label="Flip horizontal" />
        <Button type="text" icon={<FlipVertical size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />} onClick={handleFlipY} aria-label="Flip vertical" />
        <Button type="text" icon={<RotateCcw size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />} onClick={handleRotateCcw} aria-label="Rotate counterclockwise" />
        <Button type="text" icon={<RotateCw size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />} onClick={handleRotateCw} aria-label="Rotate clockwise" />
        {!popup && (
          <Button type="text" icon={<Maximize size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />} onClick={handleFullscreen} aria-label="Fullscreen" />
        )}
        <Divider type="vertical" />
        <Button type="text" icon={<ZoomOut size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />} disabled={scale === min} onClick={handleMinus} aria-label="Zoom out" />
        <span className={`${prefixCls}-zoom`} role="status" aria-live="polite">{zoomPercent}</span>
        <Button type="text" icon={<ZoomIn size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />} disabled={scale === max} onClick={handlePlus} aria-label="Zoom in" />
        <Divider type="vertical" />
        <Button type="text" icon={<Download size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />} onClick={handleDownload} aria-label="Download image" />
      </Space>
      <div
        className={clsx(`${prefixCls}-wrapper`, classNames?.wrapper)}
        style={styles?.wrapper}
        ref={wrapperRef}
      >
        <img
          src={src}
          alt={alt ?? ''}
          style={{
            transform: `rotate(${rotate}deg) translate(${moveX}px, ${moveY}px) scale(${scale}) scaleX(${scaleX}) scaleY(${scaleY})`,
            cursor: 'move',
          }}
          draggable={false}
          onMouseDown={onMove}
          onTouchStart={onTouchStart}
          ref={imgRef}
        />
      </div>
    </div>
  );
};

export default ImageViewer;
