import clsx from 'clsx';
import React, { forwardRef, useContext, useEffect, useRef, useMemo } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { WatermarkProps } from './interface';
import './style/index.less';

const Watermark = forwardRef<HTMLDivElement, WatermarkProps>((baseprops, ref) => {
  const { watermark } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, watermark);
  const {
    prefixCls = 'yee-watermark',
    children,
    style,
    className,
    classNames,
    styles,
    content,
    image,
    width,
    height,
    rotate = -22,
    gapX = 0,
    gapY = 0,
    offsetLeft = 0,
    offsetTop = 0,
    zIndex = 9,
    fontColor = 'rgba(0, 0, 0, 0.15)',
    fontSize = 16,
    fontFamily = 'sans-serif',
    fontWeight = 'normal',
    fontStyle = 'normal',
    opacity = 1,
    preventDelete = true,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  // Generate watermark Canvas
  const getWatermarkCanvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return '';
    }

    const ratio = window.devicePixelRatio || 1;

    // Calculate actual text dimensions
    let actualWidth: number;
    let actualHeight: number;

    if (image) {
      // Image watermark: width and height must be specified
      if (!width || !height) {
        console.warn('Watermark: image watermark requires width and height');
        return '';
      }
      actualWidth = width;
      actualHeight = height;
    } else if (content) {
      // Text watermark: auto-calculate or use specified values
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize * ratio}px ${fontFamily}`;

      const contents = Array.isArray(content) ? content : [content];

      // Calculate maximum width
      let maxWidth = 0;
      contents.forEach((text) => {
        const metrics = ctx.measureText(text);
        maxWidth = Math.max(maxWidth, metrics.width);
      });

      // If width is specified, use it; otherwise auto-calculate
      actualWidth = width ?? Math.ceil(maxWidth / ratio + 20);

      // If height is specified, use it; otherwise auto-calculate based on line count
      if (height) {
        actualHeight = height;
      } else {
        const lineHeight = fontSize * 1.5;
        actualHeight = Math.ceil(contents.length * lineHeight + 10);
      }
    } else {
      return '';
    }

    // Calculate extra space needed after rotation
    const rotateRad = (Math.abs(rotate) * Math.PI) / 180;
    const rotatedWidth = Math.ceil(actualWidth * Math.cos(rotateRad) + actualHeight * Math.sin(rotateRad));
    const rotatedHeight = Math.ceil(actualWidth * Math.sin(rotateRad) + actualHeight * Math.cos(rotateRad));

    // Canvas size needs to include gap and rotated space
    const canvasWidth = Math.ceil((gapX + rotatedWidth) * ratio);
    const canvasHeight = Math.ceil((gapY + rotatedHeight) * ratio);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${gapX + rotatedWidth}px`;
    canvas.style.height = `${gapY + rotatedHeight}px`;

    // Move to the center of the watermark unit (considering gap)
    const centerX = ((offsetLeft || 0) + rotatedWidth / 2) * ratio;
    const centerY = ((offsetTop || 0) + rotatedHeight / 2) * ratio;

    ctx.translate(centerX, centerY);
    ctx.rotate((rotate * Math.PI) / 180);

    // Draw image watermark
    if (image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = image;
      ctx.drawImage(
        img,
        -actualWidth * ratio / 2,
        -actualHeight * ratio / 2,
        actualWidth * ratio,
        actualHeight * ratio,
      );
    } else if (content) {
      // Draw text watermark
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize * ratio}px ${fontFamily}`;
      ctx.fillStyle = fontColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const contents = Array.isArray(content) ? content : [content];
      const lineHeight = fontSize * ratio * 1.5;
      const totalHeight = lineHeight * (contents.length - 1);
      const startY = -totalHeight / 2;

      contents.forEach((text, index) => {
        ctx.fillText(text, 0, startY + index * lineHeight);
      });
    }

    return canvas.toDataURL('image/png');
  }, [
    content,
    image,
    width,
    height,
    rotate,
    gapX,
    gapY,
    offsetLeft,
    offsetTop,
    fontColor,
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
  ]);

  // Anti-deletion protection
  useEffect(() => {
    if (!preventDelete || !watermarkRef.current) {
      return;
    }

    const watermarkElement = watermarkRef.current;

    // Create MutationObserver to monitor DOM changes
    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Detect if watermark has been deleted or modified
        if (
          mutation.type === 'childList' &&
          !containerRef.current?.contains(watermarkElement)
        ) {
          // Watermark was deleted, re-add it
          containerRef.current?.appendChild(watermarkElement);
        } else if (
          mutation.type === 'attributes' &&
          mutation.target === watermarkElement
        ) {
          // Watermark attribute was modified, restore original value
          if (mutation.attributeName === 'style') {
            watermarkElement.setAttribute(
              'style',
              `
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              background-repeat: repeat;
              background-image: url(${getWatermarkCanvas});
              z-index: ${zIndex};
              opacity: ${opacity};
            `,
            );
          } else if (mutation.attributeName === 'class') {
            watermarkElement.className = clsx(
              `${prefixCls}-layer`,
              classNames?.wrapper,
            );
          }
        }
      });
    });

    // Start observing
    observerRef.current.observe(containerRef.current!, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [preventDelete, getWatermarkCanvas, zIndex, opacity, prefixCls, classNames]);

  const containerCls = clsx(prefixCls, className);

  return (
    <div
      ref={containerRef}
      {...rest}
      className={containerCls}
      style={{ position: 'relative', ...style }}
    >
      {children}
      <div
        ref={watermarkRef}
        className={clsx(`${prefixCls}-layer`, classNames?.wrapper)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          backgroundRepeat: 'repeat',
          backgroundImage: `url(${getWatermarkCanvas})`,
          zIndex,
          opacity,
          ...styles?.wrapper,
        }}
      />
    </div>
  );
});

Watermark.displayName = 'Watermark';

export default Watermark;
