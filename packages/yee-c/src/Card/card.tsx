import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import React, { FC, useContext } from 'react';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { CardProps } from './interface';

import './style/index.less';

const Card: FC<CardProps> = (baseprops) => {
  const { card } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, card);

  const {
    prefixCls = 'yee-card',
    className,
    classNames,
    styles,
    title,
    children,
    extra,
    defaultExpanded,
    expanded,
    headerClickable = true,
    iconPosition = 'right',
    expandIcon,
    bordered,
    animationDuration = 0.15,
    showHeader = true,
    onExpand,
    ...rest
  } = props;

  const [mergedExpanded, setMergedExpanded] = useMergedState(true, {
    value: expanded,
    defaultValue: defaultExpanded,
  });

  const headerId = React.useId();

  const handleExpand = () => {
    const newExpanded = !mergedExpanded;
    setMergedExpanded(newExpanded);
    onExpand?.(newExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (headerClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleExpand();
    }
  };

  const renderExpandIcon = () => {
    const icon =
      typeof expandIcon === 'function'
        ? expandIcon?.(mergedExpanded)
        : expandIcon;
    if (icon === null) {
      return null;
    }

    return (
      <Button
        type="text"
        size="small"
        className={clsx(
          `${prefixCls}-header-expand-icon`,
          classNames?.expandIcon,
        )}
        style={styles?.expandIcon}
        aria-expanded={mergedExpanded}
        aria-label={mergedExpanded ? 'Collapse content' : 'Expand content'}
        icon={
          icon ? (
            icon
          ) : (
            <ChevronUp
              strokeWidth={1.5}
              size={16}
              style={{
                transform: mergedExpanded ? undefined : 'rotate(180deg)',
              }}
            />
          )
        }
        onClick={!headerClickable ? handleExpand : undefined}
      />
    );
  };

  const renderHeaderActions = () => {
    const expandIcon = iconPosition === 'right' ? renderExpandIcon() : null;

    if (expandIcon === null && !extra) {
      return null;
    }

    return (
      <div className={clsx(`${prefixCls}-header-actions`, classNames?.actions)}>
        {typeof extra === 'function'
          ? extra({ expanded: mergedExpanded })
          : extra}
        {expandIcon}
      </div>
    );
  };

  return (
    <section
      {...rest}
      aria-labelledby={title ? headerId : undefined}
      className={clsx(
        prefixCls,
        `${prefixCls}-${mergedExpanded ? 'expanded' : 'collapse'}`,
        {
          [`${prefixCls}-bordered`]: bordered,
        },
        className,
      )}
    >
      {showHeader && (
        <div
          className={clsx(
            `${prefixCls}-header`,
            { [`${prefixCls}-header-clickable`]: headerClickable },
            classNames?.header,
          )}
          style={styles?.header}
          onClick={headerClickable ? handleExpand : undefined}
          onKeyDown={handleKeyDown}
          tabIndex={headerClickable ? 0 : undefined}
          role={headerClickable ? 'button' : undefined}
          aria-expanded={headerClickable ? mergedExpanded : undefined}
        >
          {iconPosition === 'left' ? renderExpandIcon() : null}
          {title ? (
            <div
              id={headerId}
              className={clsx(`${prefixCls}-header-title`, classNames?.title)}
              style={styles?.title}
            >
              {title}
            </div>
          ) : null}
          {renderHeaderActions()}
        </div>
      )}
      <motion.div
        className={clsx(`${prefixCls}-content`, classNames?.content)}
        style={{ ...styles?.content, overflow: 'hidden' }}
        animate={mergedExpanded ? { height: 'auto' } : { height: 0 }}
        exit={{ height: 0, display: 'none' }}
        transition={{ duration: animationDuration }}
        role="region"
        aria-labelledby={title ? headerId : undefined}
        aria-hidden={!mergedExpanded}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Card;
