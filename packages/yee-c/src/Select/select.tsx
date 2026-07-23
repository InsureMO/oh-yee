import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../Config-Provider';
import Selector from '../Selector';
import Trigger from '../Trigger';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import useSelectKeyboard from './hooks/useSelectKeyboard';
import { Option, SelectProps } from './interface';
import Options from './options';
import './style/index.less';

// ---------------------------------------------------------------------------
// Value comparison utilities (module-level for stable references)
// ---------------------------------------------------------------------------

/** Compare two values: loose mode uses String() conversion, strict uses ===. */
function matchValue(
  a: string | number,
  b: string | number,
  loose: boolean,
): boolean {
  if (loose) return String(a) === String(b);
  return a === b;
}

/** Check if a value exists in a keys array with optional loose matching. */
function keysIncludes(
  keys: Array<string | number>,
  val: string | number,
  loose: boolean,
): boolean {
  if (loose) return keys.some((k) => String(k) === String(val));
  return keys.includes(val);
}

const Select = (baseprops: SelectProps) => {
  const { select } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, select);
  const {
    prefixCls = 'yee-select',
    options = [],
    placement = 'bottomLeft',
    mode,
    value,
    defaultValue,
    optionFilterProp = 'label',
    disabled,
    onChange,
    onFilter,
    virtual,
    itemHeight,
    listHeight,
    columns = 1,
    popupWidth,
    looseMatch = false,
    orphanClassName,
    orphanStyle,
    ...rest
  } = props;

  const single = mode !== 'multiple' && mode !== 'tags' ? true : false;

  const handleState = (
    value: string | number | Array<string | number>,
  ): Array<string | number> => {
    if (Array.isArray(value)) {
      return value;
    }
    if (value !== undefined && typeof value !== null) {
      return [value];
    }
    return [];
  };

  const [mergedValue, setMergedValue] = useMergedState<any>([], {
    value,
    defaultValue,
    handleState,
  });

  const [searchValue, setSearchValue] = useState('');

  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  // Holds the virtual list API exposed by <Options>, so keyboard navigation
  // can drive the virtual viewport (only populated when `virtual` is on).
  const virtualApiRef = useRef<{
    scrollToIndex: (index: number) => void;
  } | null>(null);
  const handleVirtualScrollToIndex = useCallback((index: number) => {
    virtualApiRef.current?.scrollToIndex(index);
  }, []);

  const getOptions = (keys: string | number | Array<string | number>) => {
    if (keys === '' || keys === null) {
      return undefined;
    }
    if (Array.isArray(keys)) {
      if (keys.length === 0) {
        return [];
      }
      return keys.map((key) => {
        const opt = options.find((o) => matchValue(o.value, key, looseMatch));
        return opt ?? { value: key, label: String(key) };
      });
    }

    return (
      options.find((opt) => matchValue(opt.value, keys, looseMatch)) ?? {
        value: keys,
        label: String(keys),
      }
    );
  };

  const handleSelect = (
    key: string | number,
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => {
    let keys;
    if (single) {
      setMergedValue([key]);
      keys = key;
      setSearchValue('');
      setOpen(false);
    } else {
      if (keysIncludes(mergedValue, key, looseMatch)) {
        keys = mergedValue.filter(
          (k: string | number) => !matchValue(k, key, looseMatch),
        );
      } else {
        keys = [...mergedValue, key];
      }
      setMergedValue(keys);

      if (e) {
        e.stopPropagation();
      }
    }
    const opts = getOptions(keys);
    onChange?.(keys, opts);
  };

  const handleClear = () => {
    setMergedValue([]);
    onChange?.(single ? '' : [], single ? undefined : []);
  };

  const handleRemove = (option: Option) => {
    const keys = mergedValue.filter(
      (k: string | number) => !matchValue(k, option.value, looseMatch),
    );
    const filteredOpts = getOptions(keys);
    setMergedValue(keys);
    const key = single ? keys[0] : keys;
    onChange?.(key, filteredOpts);
  };

  const handleSearch = (v: string) => {
    setSearchValue(v);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const filteredOpts = useMemo(() => {
    if (!searchValue) {
      return options;
    }
    if (onFilter) {
      return onFilter(searchValue, options);
    }
    const low = String(searchValue).toLowerCase();
    return options.filter((item) => {
      const label = item[optionFilterProp].toLowerCase();
      return label.includes(low);
    });
  }, [searchValue, optionFilterProp, options]);

  // Get keyboard handler for the input
  const { focusedKey, onKeyDown } = useSelectKeyboard({
    options: filteredOpts,
    open,
    selectedKeys: mergedValue,
    columns,
    looseMatch,
    onSelect: handleSelect,
    onClose: () => setOpen(false),
    onOpenChange: handleOpenChange,
    containerRef: popupRef as React.RefObject<HTMLDivElement>,
    scrollToIndex: virtual ? handleVirtualScrollToIndex : undefined,
  });

  const popup = (
    <Options
      prefixCls={prefixCls}
      multiple={mode === 'multiple' || mode === 'tags'}
      options={filteredOpts}
      focusedKey={focusedKey}
      selectedKeys={mergedValue}
      dataTestId={rest['data-testid']}
      onSelect={handleSelect}
      ref={popupRef}
      virtual={virtual}
      itemHeight={itemHeight}
      listHeight={listHeight}
      virtualApiRef={virtualApiRef}
      columns={columns}
      looseMatch={looseMatch}
    />
  );

  return (
    <Trigger
      {...rest}
      placement={placement}
      popup={popup}
      stretch={popupWidth ? undefined : 'width'}
      popupStyle={popupWidth ? { width: popupWidth } : undefined}
      open={disabled ? false : open}
      onOpenChange={handleOpenChange}
    >
      <Selector
        {...rest}
        mode={mode}
        value={searchValue}
        options={options}
        disabled={disabled}
        selectedKeys={mergedValue}
        onOpenChange={handleOpenChange}
        onClear={handleClear}
        onRemove={handleRemove as any}
        onSearch={handleSearch}
        onKeyDown={onKeyDown}
        orphanClassName={orphanClassName}
        orphanStyle={orphanStyle}
        looseMatch={looseMatch}
      />
    </Trigger>
  );
};

export default Select;
