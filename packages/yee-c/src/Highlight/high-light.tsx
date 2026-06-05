import clsx from 'clsx';
import React, { forwardRef, useContext, useMemo } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { HighlightProps } from './interface';
import './style/index.less';

const Highlight = forwardRef(
  (baseprops: HighlightProps, ref: React.Ref<HTMLElement>) => {
    const { highlight } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, highlight);
    const {
      prefixCls = 'yee-highlight',
      text,
      pattern,
      classNames,
      styles,
      htmlTag = 'span',
      wrapperHtmlTag = 'span',
      wrapperStyle,
      wrapperClassName,
      onClick,
      ...rest
    } = props;

    const parts = useMemo(() => {
      const result: Array<{ text: string; matched: boolean; index: number }> =
        [];
      if (!text || !pattern) {
        result.push({ text, matched: false, index: 0 });
        return result;
      }

      // Reset regex lastIndex
      const regex = new RegExp(pattern.source, pattern.flags);
      let lastIndex = 0;
      let matchIndex = 0;

      let match = regex.exec(text);
      while (match !== null) {
        // Add unmatched text
        if (match.index > lastIndex) {
          result.push({
            text: text.slice(lastIndex, match.index),
            matched: false,
            index: matchIndex,
          });
        }

        // Add matched text
        result.push({
          text: match[0],
          matched: true,
          index: matchIndex,
        });

        lastIndex = regex.lastIndex;
        matchIndex++;
        match = regex.exec(text);
      }

      // Add remaining text
      if (lastIndex < text.length) {
        result.push({
          text: text.slice(lastIndex),
          matched: false,
          index: matchIndex,
        });
      }

      return result;
    }, [text, pattern]);

    const handleClick = (e: React.MouseEvent<HTMLElement>, index: number) => {
      onClick?.(e, index);
    };

    const wrapperCls = clsx(prefixCls, wrapperClassName);
    const itemCls = clsx(
      `${prefixCls}-item`,
      { [`${prefixCls}-item-click`]: onClick },
      classNames?.item,
    );

    return React.createElement(
      wrapperHtmlTag,
      { ref, ...rest, className: wrapperCls, style: wrapperStyle },
      parts.map((part, idx) =>
        part.matched
          ? React.createElement(
              htmlTag,
              {
                key: idx,
                className: itemCls,
                style: styles?.item,
                onClick: (e: React.MouseEvent<HTMLElement>) =>
                  handleClick(e, part.index),
              },
              part.text,
            )
          : part.text,
      ),
    );
  },
);

Highlight.displayName = 'Highlight';

export default Highlight;
