import clsx from 'clsx';
import React, { FC, useContext } from 'react';
import { PromptProps } from './interface';
import Prompts, { Ctx } from './prompts';

const Prompt: FC<PromptProps> = (props) => {
  const { icon, label, description, children } = props;
  const {
    prefixCls: parentPrefixCls,
    classNames,
    styles,
    onClick,
  } = useContext(Ctx);

  const prefixCls = `${parentPrefixCls}-item`;

  const handleClick = () => {
    onClick?.({ data: props });
  };

  const iconNode = icon ? (
    <div className={`${prefixCls}-icon`}>{icon}</div>
  ) : null;

  const labelNode = label ? (
    <div className={`${prefixCls}-label`} key="label">
      {label}
    </div>
  ) : null;

  const descNode = description ? (
    <div className={`${prefixCls}-desc`} key="desc">
      {description}
    </div>
  ) : null;

  const childNode = Array.isArray(children) ? (
    <Prompts direction="vertical" items={children} onItemClick={onClick} />
  ) : null;

  const renderContent = () => {
    const contents = [labelNode, descNode].filter(Boolean);

    if (contents.length === 0) {
      return null;
    }

    if (contents.length === 1) {
      return contents;
    }

    return <div className={`${prefixCls}-content`}>{contents}</div>;
  };

  return (
    <div
      className={clsx(`${prefixCls}`, classNames?.item)}
      style={styles?.item}
      onClick={handleClick}
    >
      {iconNode}
      {renderContent()}
      {childNode}
    </div>
  );
};

export default Prompt;
