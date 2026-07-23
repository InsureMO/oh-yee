import { Star as StarFull, StarHalf } from 'lucide-react';
import React from 'react';
import Tooltip from '../Tooltip';

import type { StarProps } from './interface';
import './style/index.less';

const Star: React.FC<StarProps> = (props) => {
  const {
    prefixCls,
    children,
    value,
    className,
    index,
    active,
    allowHalf,
    character,
    count,
    onClick,
    onHover,
  } = props;

  const onFirstHover = () => {
    const hoverValue = index - 0.5;
    onHover(hoverValue);
  };

  const onSecondHover = () => {
    onHover(index);
  };

  const renderCharacter = () => {
    if (typeof character === 'function') {
      return character({ index });
    }
    return character;
  };

  return (
    <>
      {allowHalf ? (
        <li
          className={className}
          role="radio"
          aria-checked={active}
          aria-posinset={index + 1}
          aria-setsize={count}
          aria-label={`${index + 1} ${index + 1 === 1 ? 'star' : 'stars'}`}
          key={'star-' + index}
        >
          <div
            className={`${prefixCls}-star-first`}
            onMouseMove={onFirstHover}
            onClick={() => onClick(index - 0.5)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClick?.(index - 0.5);
              }
            }}
            tabIndex={0}
            aria-label={`${index + 0.5} stars`}
            key={'star-' + index + 'left'}
          >
            {character ? (
              <span className={`${prefixCls}-character`}>
                {renderCharacter()}
              </span>
            ) : (
              <StarHalf
                className={`${prefixCls}-star-half`}
                aria-hidden="true"
              />
            )}
          </div>
          <div
            className={`${prefixCls}-star-second`}
            onMouseMove={onSecondHover}
            onClick={() => onClick(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClick?.(index);
              }
            }}
            tabIndex={0}
            aria-label={`${index + 1} ${index + 1 === 1 ? 'star' : 'stars'}`}
            key={'star-' + index + 'right'}
          >
            {character ? (
              <span className={`${prefixCls}-character`}>
                {renderCharacter()}
              </span>
            ) : (
              <StarFull
                className={`${prefixCls}-star-full`}
                aria-hidden="true"
              />
            )}
          </div>
        </li>
      ) : (
        <li
          className={className}
          onClick={() => onClick(index)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onClick?.(index);
            }
          }}
          onMouseMove={() => onHover(index)}
          tabIndex={0}
          role="radio"
          aria-checked={active}
          aria-posinset={index + 1}
          aria-setsize={count}
          aria-label={`${index + 1} ${index + 1 === 1 ? 'star' : 'stars'}`}
          key={'star-' + index}
        >
          {character ? (
            <span className={`${prefixCls}-character`}>
              {renderCharacter()}
            </span>
          ) : active ? (
            <StarFull
              className={`${prefixCls}-star-active`}
              aria-hidden="true"
            />
          ) : (
            <StarFull
              className={`${prefixCls}-star-inactive`}
              aria-hidden="true"
            />
          )}
        </li>
      )}

      {children ? (
        <Tooltip title={value} placement="top">
          {children}
        </Tooltip>
      ) : null}
    </>
  );
};

Star.displayName = 'Star';

export default Star;
