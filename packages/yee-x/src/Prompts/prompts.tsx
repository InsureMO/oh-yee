import clsx from 'clsx';
import React, { FC, createContext } from 'react';
import { PromptProps, PromptsProps, SemanticType } from './interface';
import Prompt from './prompt';

import './style/index.less';

export const Ctx = createContext<{
  prefixCls?: string;
  classNames?: Partial<Record<SemanticType, string>>;
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  onClick?: (info: { data: PromptProps }) => void;
}>({});

const Prompts: FC<PromptsProps> = (props) => {
  const {
    title,
    direction = 'horizontal',
    items,
    prefixCls = 'yee-prompts',
    wrap,
    className,
    style,
    classNames,
    styles,
    onItemClick,
  } = props;

  const titleNode = title ? (
    <h5
      className={clsx(`${prefixCls}-title`, classNames?.title)}
      style={styles?.title}
    >
      {title}
    </h5>
  ) : null;

  const listNode = Array.isArray(items) ? (
    <div
      className={clsx(
        `${prefixCls}-list`,
        `${prefixCls}-list-${direction}`,
        {
          [`${prefixCls}-list-wrap`]: wrap,
        },
        classNames?.list,
      )}
      style={styles?.list}
    >
      <Ctx.Provider
        value={{ prefixCls, classNames, styles, onClick: onItemClick }}
      >
        {items.map((item, index) => (
          <Prompt {...item} key={item.key || index} />
        ))}
      </Ctx.Provider>
    </div>
  ) : null;

  const cls = clsx(prefixCls, className);

  return (
    <div className={cls} style={style}>
      {titleNode}
      {listNode}
    </div>
  );
};

export default Prompts;
