import clsx from 'clsx';
import React, { forwardRef, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import { SpaceProps } from './interface';
import './style/index.less';

const Space = forwardRef<HTMLDivElement, SpaceProps>((baseprops, ref) => {
  const { space } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, space);
  const {
    prefixCls = 'yee-space',
    children,
    gap = 16,
    direction = 'horizontal',
    align = direction === 'horizontal' ? 'center' : undefined,
    justify,
    wrap,
    className,
    style,
    classNames,
    styles,
    block,
    ...rest
  } = props;

  const componentRef = (ref as any) || React.createRef();

  const getAlign = () => {
    if (align === 'start' || align === 'end') {
      return 'flex-' + align;
    }
    return align;
  };

  const cls = clsx(
    prefixCls,
    [`${prefixCls}-${direction}`],
    {
      [`${prefixCls}-wrap`]: wrap,
    },
    className,
  );

  const pack = () => {
    if (!children) {
      return null;
    }

    const loop = (childs: React.ReactNode[]) => {
      let res = [] as React.ReactElement[];

      childs.forEach((child, index) => {
        const isItem =
          React.isValidElement(child) && (child.type as any).isSpaceItem;
        const itemClassName = isItem
          ? (child.props as any).className
          : undefined;
        const itemStyle = isItem ? (child.props as any).style : undefined;
        const itemChildren = isItem ? (child.props as any).children : child;

        if (React.isValidElement(child) && child.type === React.Fragment) {
          res = res.concat(
            loop(React.Children.toArray((child.props as any).children)),
          );
        } else {
          res.push(
            <div
              className={clsx(
                `${prefixCls}-item`,
                classNames?.item,
                itemClassName,
              )}
              style={{ ...styles?.item, ...itemStyle }}
              key={index}
            >
              {itemChildren}
            </div>,
          );
        }
      });
      return res;
    };

    const childs = React.Children.toArray(children).filter(
      (child) => child !== null && child !== undefined,
    );

    return loop(childs);
  };

  const packed = pack();

  return (
    <div
      {...rest}
      className={cls}
      style={{
        width: block ? '100%' : undefined,
        gap: gap + 'px',
        alignItems: getAlign(),
        justifyContent: justify,
        ...style,
      }}
      ref={componentRef}
    >
      {packed}
    </div>
  );
});

Space.displayName = 'Space';

export default Space;
