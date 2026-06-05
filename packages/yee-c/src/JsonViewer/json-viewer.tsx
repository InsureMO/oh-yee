import clsx from 'clsx';
import React, { useState } from 'react';
import type { InternalJsonViewer, JsonValue } from './interface';
import './style/index.less';

const COLORS = {
  key: '#e06c75',
  string: '#89c379',
  number: '#d19a66',
  boolean: '#d19a54',
  null: '#d19a66',
  undefined: '#d19a5f',
  object: ['#b09a66', '#c678dd', '#56b6c2', '#e06c75', '#56b6c2'],
  array: ['#d19a66', '#c678dd', '#56b6c2', '#e06c75', '#56b6c2'],
};

const isObj = (
  value: unknown,
): value is Record<string, unknown> | unknown[] => {
  return typeof value === 'object' && value !== null;
};

const getType = (value: unknown): string => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

const getValue = (value: unknown, type: string): React.ReactNode => {
  switch (type) {
    case 'string':
      return `"${value}"`;
    default:
      return String(value);
  }
};

const getColorByDepth = (colors: string[], depth: number): string => {
  return colors[depth % colors.length];
};

const JsonViewer = (props: InternalJsonViewer) => {
  const {
    prefixCls = 'yee-json',
    data,
    name = null,
    depth = 0,
    latest = true,
    colors,
    ...rest
  } = props;

  const [collapsed, setCollapsed] = useState(false);
  const mc = { ...COLORS, ...colors } as typeof COLORS;

  const toggle = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setCollapsed((s) => !s);
  };

  const renderValue = (value: unknown) => {
    const type = getType(value);
    const color = mc[type as keyof typeof COLORS];
    const colorValue = Array.isArray(color)
      ? getColorByDepth(color, depth)
      : color;
    const node = (
      <span
        className={`${prefixCls}-value ${prefixCls}-${type}`}
        style={{ color: colorValue }}
      >
        {getValue(value, type)}
      </span>
    );

    if (!latest) {
      return (
        <>
          {node}
          <span className={`${prefixCls}-comma`}> ,</span>
        </>
      );
    }
    return node;
  };

  const renderLeftBracket = (value: unknown) => {
    if (!isObj(value)) {
      return null;
    }
    if (Array.isArray(value)) {
      return (
        <span
          className={`${prefixCls}-bracket ${prefixCls}-bracket-leaf`}
          style={{ color: getColorByDepth(mc.array, depth) }}
        >
          {'['}
        </span>
      );
    }
    return (
      <span
        className={`${prefixCls}-brace ${prefixCls}-brace-leaf`}
        style={{ color: getColorByDepth(mc.object, depth) }}
      >
        {'{'}
      </span>
    );
  };

  const renderObject = (obj: JsonValue[] | Record<string, JsonValue>) => {
    if (Array.isArray(obj)) {
      return (
        <div
          className={clsx(`${prefixCls}-array`, {
            [`${prefixCls}-array-collapsed`]: collapsed,
          })}
        >
          {name ? (
            <span
              className={`${prefixCls}-key`}
              style={{ color: mc.key }}
              onClick={toggle}
            >
              {name}:{renderLeftBracket(data)}
            </span>
          ) : (
            <span
              className={`${prefixCls}-bracket`}
              style={{ color: getColorByDepth(mc.array, depth) }}
              onClick={toggle}
            >
              {'['}
            </span>
          )}
          <span
            className={`${prefixCls}-collapsed`}
            style={{ display: collapsed ? 'inline-block' : 'none' }}
            onClick={toggle}
          >
            ...
          </span>
          <div
            className={`${prefixCls}-items`}
            style={{ display: collapsed ? 'none' : 'block' }}
          >
            {obj.map((item, index) => (
              <div key={index} className={`${prefixCls}-item`}>
                <JsonViewer
                  data={item}
                  name={undefined}
                  depth={depth + 1}
                  latest={index >= obj.length - 1}
                  colors={colors}
                  prefixCls={prefixCls}
                />
              </div>
            ))}
          </div>
          <span
            className={`${prefixCls}-bracket`}
            style={{ color: getColorByDepth(mc.array, depth) }}
          >
            {']'}
            {!latest && <span className={`${prefixCls}-comma`}> ,</span>}
          </span>
        </div>
      );
    } else {
      const keys = Object.keys(obj);
      return (
        <div
          className={clsx(`${prefixCls}-object`, {
            [`${prefixCls}-object-collapsed`]: collapsed,
          })}
        >
          {name ? (
            <span
              className={`${prefixCls}-key`}
              style={{ color: mc.key }}
              onClick={toggle}
            >
              {name}:{renderLeftBracket(data)}
            </span>
          ) : (
            <span
              className={`${prefixCls}-brace`}
              style={{ color: getColorByDepth(mc.object, depth) }}
              onClick={toggle}
            >
              {'{'}
            </span>
          )}
          <span
            className={`${prefixCls}-collapsed`}
            style={{ display: collapsed ? 'block' : 'none' }}
            onClick={toggle}
          >
            ...
          </span>
          <div
            className={`${prefixCls}-properties`}
            style={{ display: collapsed ? 'none' : 'block' }}
          >
            {keys.map((key, index) => (
              <div
                key={key}
                className={`${prefixCls}-property`}
                style={{
                  display: isObj(obj[key]) ? 'block' : undefined,
                }}
              >
                <JsonViewer
                  data={obj[key]}
                  name={key}
                  depth={depth + 1}
                  latest={index >= keys.length - 1}
                  colors={colors}
                  prefixCls={prefixCls}
                />
              </div>
            ))}
          </div>
          <span
            className={`${prefixCls}-brace`}
            style={{ color: getColorByDepth(mc.object, depth) }}
          >
            {'}'}
            {!latest && <span className={`${prefixCls}-comma`}> ,</span>}
          </span>
        </div>
      );
    }
  };

  if (!isObj(data)) {
    return (
      <div className={`${prefixCls}-property`}>
        {name && (
          <span className={`${prefixCls}-key`} style={{ color: mc.key }}>
            {name}
            {':'}
          </span>
        )}
        {renderValue(data)}
      </div>
    );
  }

  return (
    <div {...rest} className={`${prefixCls}-view`}>
      <div className={`${prefixCls}-collapsible`}>{renderObject(data)}</div>
    </div>
  );
};

export default JsonViewer;
