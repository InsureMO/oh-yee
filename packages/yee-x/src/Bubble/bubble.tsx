import { Avatar, Spin } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import React, { FC, useContext } from 'react';
import { GlobalContext } from '../Global-Context';
import MD from '../Markdown';
import merger from '../utils/mergeContextToProps';
import { BubbleListCtx } from './bubble-list';
import { BubbleListProps, BubbleProps } from './interface';
import './style/index.less';

const Bubble: FC<
  BubbleProps & {
    prefixCls?: string;
    role?: string;
    latest?: boolean;
    item?: BubbleProps;
    $key?: string | number;
    parser?: BubbleListProps['parser'];
  }
> = (baseProps) => {
  const { bubble } = useContext(GlobalContext);
  const props = merger(baseProps, bubble);
  const {
    avatar,
    header,
    content,
    footer,
    prefixCls = 'yee-bubble',
    placement = 'start',
    typing = true,
    classNames = {},
    styles = {},
    role,
    loading,
    parser: selfParser,
    prefix,
    suffix,
    latest,
    item,
    visible,
  } = props;
  const { parser: parentParser } = useContext(BubbleListCtx);
  const parser = typeof selfParser !== 'undefined' ? selfParser : parentParser;

  if (visible === false) {
    return null;
  }

  const avatarNode = avatar ? (
    <Avatar {...avatar} className={`${prefixCls}-avatar`} />
  ) : null;

  const headerNode = header ? (
    <div
      className={clsx(`${prefixCls}-header`, classNames.header)}
      style={styles.header}
    >
      {header}
    </div>
  ) : null;

  const parserContent = (content: React.ReactNode) => {
    if (parser) {
      if (parser === 'markdown') {
        return <MD markdown={content as string} />;
      } else if (typeof parser === 'function') {
        return parser({ role: role as string, content: content as string });
      }
      return content;
    }

    return <p className={`${prefixCls}-p-content`}>{content}</p>;
  };

  const contentNode = (
    <div
      className={clsx(`${prefixCls}-content`, classNames.content)}
      style={styles.content}
    >
      {prefix}
      {loading ? <Spin type="bubbles" /> : parserContent(content)}
      {suffix}
    </div>
  );

  const footerNode = footer ? (
    <div
      className={clsx(`${prefixCls}-footer`, classNames.footer)}
      style={styles.footer}
    >
      {typeof footer === 'function'
        ? footer({ role: role as string, content, latest, loading, item })
        : footer}
    </div>
  ) : null;

  const renderContent = () => {
    if (headerNode || footerNode) {
      return (
        <div className={clsx(`${prefixCls}-content-wrapper`)}>
          {headerNode}
          {contentNode}
          {footerNode}
        </div>
      );
    }
    return contentNode;
  };

  return (
    <div
      className={clsx(prefixCls, `${prefixCls}-${placement}`, {
        [`${prefixCls}-typing`]: typing,
      })}
    >
      {placement === 'start' && avatarNode}
      {renderContent()}
      {placement === 'end' && avatarNode}
    </div>
  );
};

export default Bubble;
