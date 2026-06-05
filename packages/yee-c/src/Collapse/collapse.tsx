import clsx from 'clsx';
import React, { createContext, FC, useCallback, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { CollapseProps } from './interface';
import Panel from './panel';

import './style/index.less';

const noop = () => {};

export const CollapseContext = createContext<{
  prefixCls: string;
  activeKey: Array<string | number>;
  onExpand: (key: string | number) => void;
}>({ prefixCls: '', activeKey: [], onExpand: noop });

const handleState = (value: unknown): Array<string | number> => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return [value];
  }
  return [];
};

const Collapse: FC<CollapseProps> = (baseprops) => {
  const { collapse } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, collapse);
  const {
    prefixCls = 'yee-collapse',
    activeKey,
    defaultActiveKey, // Default expanded ids: []
    accordion, // Accordion mode, only one panel expanded at a time
    style,
    className,
    bordered = true,
    items,
    onChange,
    ...rest
  } = props;

  const [mergedActiveKey, setMergedActiveKey] = useMergedState([], {
    value: activeKey,
    defaultValue: defaultActiveKey,
    handleState: handleState,
  });

  const onExpand = useCallback(
    (key: string | number) => {
      const keys = mergedActiveKey as Array<string | number>;
      const expanded = keys.includes(key);
      let expandedKeys: Array<string | number>;
      if (accordion) {
        expandedKeys = expanded ? [] : [key];
      } else {
        expandedKeys = expanded
          ? keys.filter((k) => k !== key)
          : [...keys, key];
      }
      setMergedActiveKey(expandedKeys);
      onChange?.(accordion ? expandedKeys[0] : (expandedKeys as any));
    },
    [mergedActiveKey, accordion, onChange],
  );

  return (
    <CollapseContext.Provider
      value={{
        prefixCls,
        activeKey: mergedActiveKey as Array<string | number>,
        onExpand,
      }}
    >
      <div
        {...rest}
        className={clsx(
          prefixCls,
          {
            [`${prefixCls}-bordered`]: bordered,
          },
          className,
        )}
        style={style}
      >
        {items?.map((item) => (
          <Panel {...item} id={item.key} key={item.key} />
        ))}
      </div>
    </CollapseContext.Provider>
  );
};

Collapse.displayName = 'Collapse';

export default Collapse;
