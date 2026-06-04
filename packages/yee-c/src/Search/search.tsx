import clsx from 'clsx';
import { X } from 'lucide-react';
import React, {
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../Config-Provider';
import List, { ListItemProps } from '../List';
import Trigger from '../Trigger';
import useMergedState from '../hooks/useMergedState';
import useSelectKeyboard from '../Select/hooks/useSelectKeyboard';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { SearchProps } from './interface';
import './style/index.less';

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (baseProps, ref) => {
    const { search: contextValue } = useContext(GlobalContext);
    const props = mergeContextToProps(baseProps, contextValue);

    const {
      prefixCls = 'yee-search',
      className,
      style,
      classNames,
      styles,
      size = 'default',
      bordered = true,
      prefix,
      suffix,
      disabled,
      allowClear,
      placeholder,
      defaultValue,
      value,
      searchOnAction = 'typing',
      suggestions,
      options,
      onChange,
      onSearch,
      optionRender,
      suggestionRender,
      ...rest
    } = props;

    const [searchValue, setSearchValue] = useMergedState(defaultValue || '', {
      value: value,
    });

    const [open, setOpen] = useState(false);

    const popupRef = useRef<HTMLDivElement>(undefined);

    const { focusedKey, onKeyDown } = useSelectKeyboard({
      open,
      options: (options || suggestions) as { [key: string]: any; value: string | number; disabled?: boolean }[],
      selectedKeys: [searchValue],
      onSelect: (value: string | number) => {
        const merged = options || suggestions;
        const target = merged?.find((item => item.value === value));
        onChange?.(target as ListItemProps);
      },
      onOpenChange: (open: boolean) => {
        setOpen(open);
      },
      onClose: () => {
        setOpen(false)
      }
    })

    useEffect(() => {
      if (open) {
        popupRef.current?.focus();
      } else {
      }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchValue(newValue);
      startTransition(() => {
        if (searchOnAction === 'typing') {
          handleSearch(e);
        }
      });
    };

    const handleClear = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      setSearchValue('');
      onChange?.(null);
      onSearch?.('');
    };

    const handleSearch = (
      e?:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLSpanElement>
        | React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (disabled) return;
      onSearch?.(searchValue);
      if (e?.type === 'click') {
        (e.target as HTMLElement).blur?.();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchOnAction === 'enter') {
        handleSearch(e);
      }
    };

    const renderSuffix = () => {
      const hasValue = !!searchValue;
      const showClearIcon = allowClear && hasValue && !disabled;
      const showSuffix = suffix || showClearIcon;

      if (!showSuffix) {
        return null;
      }

      return (
        <div className={`${prefixCls}-suffix`} style={styles?.suffix}>
          {showClearIcon && (
            <span
              className={clsx(`${prefixCls}-clear-icon`, classNames?.clear)}
              style={styles?.clear}
              onClick={handleClear}
            >
              <X size={14} />
            </span>
          )}
          {suffix}
        </div>
      );
    };

    const renderPrefix = () => {
      if (!prefix) return null;

      return (
        <div className={`${prefixCls}-prefix`} style={styles?.prefix}>
          {prefix}
        </div>
      );
    };

    const getInputClassName = () => {
      return clsx(
        `${prefixCls}-input`,
        {
          [`${prefixCls}-input-small`]: size === 'small',
          [`${prefixCls}-input-large`]: size === 'large',
          [`${prefixCls}-input-disabled`]: disabled,
        },
        classNames?.input,
      );
    };

    const getRootClassName = () => {
      return clsx(
        prefixCls,
        {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-borderless`]: !bordered,
          [`${prefixCls}-small`]: size === 'small',
          [`${prefixCls}-large`]: size === 'large',
        },
        className,
      );
    };

    const popup = (
      <div className={`${prefixCls}-popup`} tabIndex={0}>
        {Array.isArray(options) ? (
          <List focusedKey={focusedKey} items={options} itemRender={optionRender} onClick={onChange} />
        ) : Array.isArray(suggestions) ? (
          <List
            focusedKey={focusedKey}
            items={suggestions}
            itemRender={suggestionRender}
            onClick={onChange}
          />
        ) : null}
      </div>
    );

    return (
      <Trigger popup={popup} open={open} onOpenChange={setOpen}>
        <div className={getRootClassName()} style={style}>
          {renderPrefix()}
          <input
            {...rest}
            ref={ref}
            value={searchValue}
            className={getInputClassName()}
            style={styles?.input}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
          {renderSuffix()}
        </div>
      </Trigger>
    );
  },
);

export default Search;
