import clsx from 'clsx';
import { ChevronDown, X } from 'lucide-react';
import React, { useMemo, useRef } from 'react';
import Input from '../Input';
import Spin from '../Spin';
import Tag from '../Tag';
import useMergedState from '../hooks/useMergedState';
import type { SelectorProps, TagType } from './interface';
import './style/index.less';

export const tagsAttributes = [
  'id',
  'searchable',
  'disabled',
  'allowClear',
  'placeholder',
  'className',
  'style',
  'value',
  'options',
  'closable',
  'onSearch',
  'onBlur',
  'onRemove',
  'loading',
];

const Selector = React.forwardRef(
  (props: SelectorProps, ref: React.Ref<any>) => {
    const {
      prefixCls = 'yee-selector',
      mode,
      className,
      style,
      optionLabelProp = 'label',
      searchable = true,
      disabled,
      options = [],
      selectedKeys,
      looseMatch = false,
      orphanClassName,
      orphanStyle,
      allowClear = true,
      placeholder,
      closable = true,
      suffix,
      value,
      open,
      loading,
      size = 'default',
      onSearch,
      onRemove,
      onClear,
      onOpenChange,
      onKeyDown: externalOnKeyDown,
      ...rest
    } = props;

    const multi = mode === 'multiple' || mode === 'tags';
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useMergedState<string>('', {
      value: value,
    });

    const tags = useMemo(() => {
      if (!Array.isArray(options)) {
        return [];
      }
      // 按 selectedKeys 顺序渲染；找不到的 key 作为孤儿值回退显示 value 本身
      return selectedKeys.map((key) => {
        const opt = looseMatch
          ? options.find((o) => String(o.value) === String(key))
          : options.find((o) => o.value === key);
        if (opt) {
          return {
            ...opt,
            children:
              typeof optionLabelProp === 'function'
                ? optionLabelProp(opt)
                : opt[optionLabelProp],
            _orphan: false,
          };
        }
        return {
          value: key,
          label: String(key),
          children: String(key),
          _orphan: true,
        };
      });
    }, [options, selectedKeys, optionLabelProp, looseMatch]);

    const handleClick = () => {
      if (inputRef.current && !disabled) {
        inputRef.current.focus();
      }
    };

    const onChange = (
      v: string,
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLSpanElement>,
    ) => {
      setSearchValue(v);
      onSearch?.(v, e);
    };

    //   Clear
    const handleClear = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
      setSearchValue('');
      onSearch?.('', e);
      onClear?.();
    };
    //   Remove
    const handleRemove = (option: TagType, e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.(option);
    };

    const cls = clsx(
      prefixCls,
      [`${prefixCls}-${size}`],
      [`${prefixCls}-searchable`],
      [`${prefixCls}-${mode || 'single'}`],
      {
        [`${prefixCls}-allow-clear`]: allowClear,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-open`]: open,
      },
      className,
    );

    const renderSearch = () => {
      return (
        <div
          className={clsx(`${prefixCls}-input-wrapper`, {
            'with-input-value': searchValue,
          })}
          data-value={searchValue}
        >
          <Input
            className={`${prefixCls}-input`}
            allowClear={false}
            bordered={false}
            disabled={disabled}
            readOnly={!searchable}
            value={searchValue}
            onChange={onChange}
            onKeyDown={externalOnKeyDown}
            ref={inputRef}
          />
        </div>
      );
    };

    const renderPlaceholder = () => {
      if (!placeholder || searchValue || selectedKeys.length) {
        return null;
      }
      return <span className={`${prefixCls}-placeholder`}>{placeholder}</span>;
    };

    const renderContent = () => {
      if (multi) {
        return tags.map(
          (item: TagType & { children: any; _orphan?: boolean }, index) => {
            const { _orphan, ...tagRest } = item;
            const _closable =
              typeof closable === 'function' ? closable(item) : closable;
            return (
              <Tag
                {...tagRest}
                className={_orphan ? orphanClassName : undefined}
                style={_orphan ? orphanStyle : undefined}
                closable={_closable}
                onClose={(e) => handleRemove(item, e)}
                key={item.value || index}
              />
            );
          },
        );
      }

      const key = selectedKeys.length ? selectedKeys[0] : '';
      const opt = Array.isArray(options)
        ? looseMatch
          ? options.find((opt) => String(opt.value) === String(key))
          : options.find((opt) => opt.value === key)
        : null;
      // 孤儿值：key 非空但在 options 中找不到时，回退显示 value 本身
      const isOrphan = !opt && key !== '';
      const label = (
        opt
          ? typeof optionLabelProp === 'function'
            ? optionLabelProp(opt)
            : opt[optionLabelProp]
          : isOrphan
            ? String(key)
            : null
      ) as React.ReactNode;

      return (
        <>
          {renderSearch()}
          {label && (
            <div
              className={clsx(
                `${prefixCls}-selection-item`,
                isOrphan && orphanClassName,
              )}
              style={isOrphan ? orphanStyle : undefined}
            >
              {label}
            </div>
          )}
        </>
      );
    };

    const renderSuffix = () => {
      return (
        <span className={`${prefixCls}-arrow`}>
          {loading ? (
            <Spin size="small" />
          ) : suffix ? (
            typeof suffix === 'function' ? (
              suffix()
            ) : (
              suffix
            )
          ) : (
            <ChevronDown size={16} strokeWidth={1.5} />
          )}
        </span>
      );
    };

    const renderClear = () => {
      if (!allowClear || disabled) {
        return null;
      }
      if (selectedKeys.length === 0 && !searchValue) {
        return null;
      }
      return (
        <span className={`${prefixCls}-clear`} onClick={handleClear}>
          <X size={12} strokeWidth={1} />
        </span>
      );
    };

    return (
      <div
        {...rest}
        tabIndex={disabled || searchable ? -1 : 0}
        className={cls}
        style={style}
        onKeyDown={(event) => {
          if (disabled) return;
          // For non-searchable single select, handle Enter to open dropdown
          if (!searchable && event.key === 'Enter' && !open) {
            onOpenChange?.(true);
          }
          // Also call external onKeyDown if provided
          externalOnKeyDown?.(event as React.KeyboardEvent<HTMLInputElement>);
        }}
        ref={ref}
      >
        <div
          className={clsx(`${prefixCls}-content`)}
          onClick={disabled ? undefined : handleClick}
        >
          {renderContent()}
          {multi && renderSearch()}
          {renderPlaceholder()}
        </div>
        {renderSuffix()}
        {renderClear()}
      </div>
    );
  },
);

Selector.displayName = 'Selector';

export default Selector;
