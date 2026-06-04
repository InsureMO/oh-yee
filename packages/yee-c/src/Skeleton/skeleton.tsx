import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { SkeletonProps } from './interface';

import './style/index.less';

const Skeleton: React.FC<SkeletonProps> = (baseprops) => {
  const { skeleton } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, skeleton);
  const {
    prefixCls = 'yee-skeleton',
    active,
    className,
    style,
    title = { width: '46%' },
    avatar,
    paragraph = { rows: 4 },
    ...rest
  } = props;

  const cls = clsx(prefixCls, { [`${prefixCls}-active`]: active }, className);

  const renderAvatar = () => {
    if (avatar) {
      return <div className={`${prefixCls}-avatar`}></div>;
    }
  };

  const renderTitle = () => {
    if (title) {
      const { width = '46%' } = typeof title === 'object' ? title : {};
      return <h3 className={`${prefixCls}-title`} style={{ width }}></h3>;
    }
  };

  const renderParagraph = () => {
    if (paragraph) {
      const { rows = 4, width = undefined } =
        typeof paragraph === 'object' ? paragraph : {};

      return (
        <ul className={`${prefixCls}-paragraph`}>
          {new Array(rows).fill(0).map((_, index: number) => (
            <li
              style={{
                width:
                  index + 1 !== rows
                    ? Array.isArray(width)
                      ? width?.[index]
                      : undefined
                    : Array.isArray(width)
                      ? width[rows - 1]
                      : width,
              }}
              key={index}
            ></li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div {...rest} className={cls} style={style}>
      {renderAvatar()}
      <div className={`${prefixCls}-content`}>
        {renderTitle()}
        {renderParagraph()}
      </div>
    </div>
  );
};

export default Skeleton;
