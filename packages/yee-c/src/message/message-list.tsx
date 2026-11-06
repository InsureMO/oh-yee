import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import type { MessageProps } from './interface';
import Message from './message';

import './style/index.less';

const MOTION_TRANSITION = { duration: 0.2, ease: 'easeOut' } as const;

const MessageList = ({
  items,
  onDestroy,
}: {
  items: MessageProps[];
  onDestroy: (key: string | number) => void;
}) => {
  return (
    <div className="yee-message-list">
      <AnimatePresence initial={false}>
        {items.map((item: MessageProps) => (
          <motion.div
            key={item.key}
            layout
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={MOTION_TRANSITION}
          >
            <Message {...item} id={item.key} onDestroy={onDestroy} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;
