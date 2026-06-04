import clsx from 'clsx';
import { Filter, Search } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '../../Button';
import Divider from '../../Divider';
import Input from '../../Input';
import Popover from '../../Popover';
import Space from '../../Space';
import Tree from '../../Tree';
import { useLocale } from '../../locale';
import { TableCtx } from '../table';

export interface TableFilterProps {
  filters?: any;
  dataIndex: string;
  filtered?: boolean;
}

const getStrLower = (str: any) => {
  if (typeof str === 'string') {
    return str.toLowerCase();
  }
  return str;
};

const HeaderFilter = React.memo((props: any) => {
  const { filter, column, getContainer, onInternalFilter } = props;
  const { prefixCls } = useContext(TableCtx);
  const {
    locale: { table: loc = {} },
  } = useLocale();
  const { dataIndex } = column;

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selectNodes, setSelectNodes] = useState<Array<string | number>>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus({ preventScroll: true });
      });
    }
  }, [open]);

  const inputChange = (value: string) => {
    setSearchValue(value);
  };

  //   const handleSelect = (node: any) => {
  //     setSelectNodes(node);
  //   };

  const reset = () => {
    setSearchValue('');
    setSelectNodes([]);
    onInternalFilter({ dataIndex, value: '', column });
  };

  const ok = (type?: 'filter' | 'search') => {
    onInternalFilter({
      dataIndex,
      value: type === 'search' ? searchValue : selectNodes,
      type: type,
      column,
    });
    setOpen(false);
  };

  let popup: React.ReactNode;

  const {
    items,
    icon,
    searchable = true,
    filterMode = 'menu',
    // filtered,
    // filterOnClose,
    // onFilter,
  } = filter;

  const searchInputNode = searchable ? (
    <Input
      prefix={<Search size={14} strokeWidth={1.5} />}
      value={searchValue}
      onChange={inputChange}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          ok('search');
        }
      }}
      ref={inputRef}
    />
  ) : null;

  if (items) {
    let dataSource = [];
    const inputValue = getStrLower(searchValue);

    const filteredItems = inputValue
      ? items.filter((item: Record<string, any>) =>
          getStrLower(item.label)?.includes(getStrLower(searchValue) as string),
        )
      : items;

    if (filterMode === 'menu') {
      dataSource = filteredItems;
    } else {
      dataSource = [
        {
          key: 'all',
          label: 'All',
          children: filteredItems,
        },
      ];
    }

    popup = (
      <div className={clsx(`${prefixCls}-filter-popup`)}>
        {searchInputNode}
        <Divider style={{ margin: '8px 0' }} />
        <Tree
          dataSource={dataSource}
          checkable
          multiple
          checkedKeys={selectNodes}
          onCheck={(keys) => setSelectNodes(keys as Array<string | number>)}
          //   selectedKeys={selectNodes}
          //   multiple
          //   onSelect={handleSelect}
        />
        <Divider style={{ margin: '8px 0' }} />
        <Space block style={{ justifyContent: 'flex-end' }}>
          <Button size="small" onClick={reset}>
            Reset
          </Button>
          <Button size="small" onClick={() => ok('filter')} type="primary">
            Confirm
          </Button>
        </Space>
      </div>
    );
  } else if (searchable) {
    popup = (
      <div className={clsx(`${prefixCls}-filter-content`)}>
        {searchInputNode}
        <Space
          style={{ marginTop: 12, justifyContent: 'flex-end', width: '100%' }}
        >
          <Button size="small" onClick={reset}>
            Reset
          </Button>
          <Button size="small" onClick={() => ok('search')} type="primary">
            Confirm
          </Button>
        </Space>
      </div>
    );
  } else {
    return null;
  }

  const handleOpenChange = (o: boolean) => {
    setOpen(o);
  };

  const renderTrigger = () => {
    const trigger =
      typeof icon === 'function' ? (
        icon()
      ) : (
        <Button
          icon={
            items ? (
              <Filter size={16} strokeWidth={1.5} />
            ) : (
              <Search size={16} strokeWidth={1.5} />
            )
          }
          type="text"
          size="small"
        />
      );
    return <span className={`${prefixCls}-filter-trigger`}>{trigger}</span>;
  };

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      content={popup}
      arrow
      open={open}
      hideOnClick={false}
      getPopupContainer={getContainer}
      onOpenChange={handleOpenChange}
    >
      {renderTrigger()}
    </Popover>
  );
});
export default HeaderFilter;
