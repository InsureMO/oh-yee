import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import type { NoticeProps, PlacementType } from './interface';
import Notice from './notice';

import './style/index.less';

const MOTION_TRANSITION = { duration: 0.25, ease: 'easeOut' } as const;

// Slide the notice in from the edge of the screen it is docked to, the way
// mainstream notification stacks do.
const getPlacementMotion = (placement: PlacementType) => {
  const fromRight = placement.toLowerCase().includes('right');
  const fromBottom = placement.toLowerCase().includes('bottom');
  const x = fromRight ? 100 : -100;
  const y = fromBottom ? 100 : -100;

  return {
    initial: {
      opacity: 0,
      x,
      y: placement === 'top' || placement === 'bottom' ? y : 0,
    },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: {
      opacity: 0,
      x,
      y: placement === 'top' || placement === 'bottom' ? y : 0,
    },
  };
};

const NoticeList = ({
  items,
  placement = 'topRight',
  onDestroy,
}: {
  items: NoticeProps[];
  placement?: PlacementType;
  onDestroy: (key: string | number, timerGeneration?: number) => void;
}) => {
  const motionProps = getPlacementMotion(placement);

  return (
    <div className={`yee-notice-list yee-notice-list-${placement}`}>
      <AnimatePresence initial={false}>
        {items.map((item: NoticeProps) => (
          <motion.div
            key={item.key}
            layout
            initial={motionProps.initial}
            animate={motionProps.animate}
            exit={motionProps.exit}
            transition={MOTION_TRANSITION}
          >
            <Notice {...item} id={item.key} onDestroy={onDestroy} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NoticeList;
