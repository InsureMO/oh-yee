import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useContext, useId } from 'react';
import Button from '../Button';
import { CollapseContext } from './collapse';
import type { PanelProps } from './interface';

const Panel: React.FC<PanelProps & { id: string | number }> = (props) => {
  const { children, title, id, className, style, extra, classNames, styles } =
    props;

  const { prefixCls, activeKey, onExpand } = useContext(CollapseContext);

  const panelId = useId();
  const headerId = `${panelId}-header`;
  const contentId = `${panelId}-content`;

  const expanded = activeKey.includes(id);

  const itemClassName = clsx(
    `${prefixCls}-item`,
    {
      [`${prefixCls}-item-expanded`]: expanded,
    },
    className,
  );

  return (
    <div className={itemClassName} style={style}>
      <div
        className={clsx(`${prefixCls}-header`, classNames?.header)}
        role="button"
        style={styles?.header}
        id={headerId}
        aria-expanded={expanded}
        aria-controls={contentId}
        aria-disabled="false"
        tabIndex={0}
        onClick={() => onExpand(id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onExpand(id);
          }
        }}
      >
        <motion.div
          className={clsx(`${prefixCls}-expand-icon`, classNames?.expandIcon)}
          style={styles?.expandIcon}
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          aria-hidden="true"
        >
          <Button icon={<ChevronRight size={16} />} type="text" />
        </motion.div>
        <div
          className={clsx(`${prefixCls}-title`, classNames?.title)}
          style={styles?.title}
          title={typeof title === 'string' ? title : undefined}
        >
          {title}
        </div>
        {extra && (
          <div
            className={clsx(`${prefixCls}-extra`, classNames?.extra)}
            style={styles?.extra}
            onClick={(e) => e.stopPropagation()}
          >
            {typeof extra === 'function' ? extra() : extra}
          </div>
        )}
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={clsx(`${prefixCls}-content`, classNames?.content)}
            style={styles?.content}
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Panel.displayName = 'Panel';

export default Panel;
