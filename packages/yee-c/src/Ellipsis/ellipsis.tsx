import clsx from 'clsx';
import { motion } from 'motion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../Button';
import useMergedState from '../hooks/useMergedState';
import type { EllipsisProps } from './interface';

import './style/index.less';

const DEFAULT_LINE_HEIGHT = 22;
const DEFAULT_ANIMATION_DURATION = 300;

const Ellipsis: React.FC<EllipsisProps> = (props) => {
  const {
    prefixCls = 'yee-ellipsis',
    className,
    style,
    children,
    lines = 3,
    expandText,
    collapseText,
    defaultExpanded = false,
    expanded: controlledExpanded,
    onExpand,
    showExpandButton = true,
    animated = true,
    animationDuration = DEFAULT_ANIMATION_DURATION,
    ...rest
  } = props;

  const textRef = useRef<HTMLDivElement>(null);
  const [needEllipsis, setNeedEllipsis] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const [mergedExpanded, setMergedExpanded] = useMergedState(defaultExpanded, {
    value: controlledExpanded,
  });

  const measure = useCallback(() => {
    const el = textRef.current;
    if (!el) return;

    const computedStyle = getComputedStyle(el);
    const lineHeight =
      parseInt(computedStyle.lineHeight) || DEFAULT_LINE_HEIGHT;
    const limit = lineHeight * lines;

    if (el.scrollHeight > limit) {
      setNeedEllipsis(true);
      setMaxHeight(limit);
    } else {
      setNeedEllipsis(false);
      setMaxHeight(0);
    }
  }, [lines]);

  useEffect(() => {
    measure();
  }, [children, lines, measure]);

  const handleToggle = () => {
    const next = !mergedExpanded;
    setMergedExpanded(next);
    onExpand?.(next);
  };

  const isCollapsed = !mergedExpanded && needEllipsis;
  const isZhCN =
    typeof document !== 'undefined'
      ? (document.documentElement.lang || 'zh-CN').startsWith('zh')
      : true;

  const buttonText = mergedExpanded
    ? (collapseText ?? (isZhCN ? '收起' : 'Collapse'))
    : (expandText ?? (isZhCN ? '展开' : 'Expand'));

  const renderButton = () => {
    if (!showExpandButton || !needEllipsis) return null;

    if (mergedExpanded) {
      return (
        <Button
          type="link"
          size="small"
          onClick={handleToggle}
          className={`${prefixCls}-button-inline`}
        >
          {buttonText}
        </Button>
      );
    }

    return (
      <div className={`${prefixCls}-button-fixed`}>
        <Button type="link" size="small" onClick={handleToggle}>
          {buttonText}
        </Button>
      </div>
    );
  };

  return (
    <div
      {...rest}
      className={clsx(prefixCls, className, {
        [`${prefixCls}-show-expand-button`]: showExpandButton,
        [`${prefixCls}-expanded`]: mergedExpanded,
        [`${prefixCls}-collapsed`]: isCollapsed,
      })}
      style={style}
    >
      <motion.div
        className={`${prefixCls}-content`}
        initial={false}
        animate={{
          height: isCollapsed ? maxHeight : 'auto',
        }}
        transition={
          animated
            ? { duration: animationDuration / 1000, ease: 'easeInOut' }
            : { duration: 0 }
        }
        style={{ overflow: 'hidden' }}
      >
        <div
          ref={textRef}
          className={`${prefixCls}-text`}
          style={
            {
              WebkitLineClamp: isCollapsed ? lines : undefined,
            } as React.CSSProperties
          }
        >
          {children}
          {mergedExpanded && renderButton()}
        </div>
        {!mergedExpanded && renderButton()}
      </motion.div>
    </div>
  );
};

export default Ellipsis;
