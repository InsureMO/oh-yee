import React, { useState, useMemo } from 'react';
import { Table, Button, Transfer, Space, Trigger, Box } from '@rainbow-oh/yee-c';
import type { ColumnProps } from '@rainbow-oh/yee-c';
import { Funnel, FunnelPlus } from 'lucide-react';

export default () => {
  // ========== State ==========
  // All available column definitions
  const allColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  // Transfer data source (column options)
  const transferDataSource = allColumns.map((col) => ({
    key: col.key,
    label: col.title,
  }));

  // Default visible columns (first 3)
  const defaultTargetKeys = ['name', 'age', 'address'];

  // Currently selected column keys
  const [targetKeys, setTargetKeys] = useState<Array<string | number>>(defaultTargetKeys);

  // Transfer popup visibility
  const [transferVisible, setTransferVisible] = useState(false);

  // ========== Data ==========
  const dataSource = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      email: 'john.brown@example.com',
      phone: '+1 123-456-7890',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      email: 'jim.green@example.com',
      phone: '+44 20 1234 5678',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      email: 'joe.black@example.com',
      phone: '+61 2 1234 5678',
    },
  ];

  // ========== Event Handlers ==========
  /**
   * Handle Transfer selection change
   * @param newTargetKeys - Newly selected column keys
   */
  const handleTransferChange = (newTargetKeys: Array<string | number>) => {
    setTargetKeys(newTargetKeys);
  };

  /**
   * Toggle Transfer popup visibility
   */
  const toggleTransfer = () => {
    setTransferVisible(!transferVisible);
  };

  // ========== Computed ==========
  /**
   * Filter visible columns based on targetKeys
   * Preserve original column order
   */
  const visibleColumns = useMemo(() => {
    return allColumns.filter((col) => targetKeys.includes(col.key as string));
  }, [targetKeys]);

  // ========== Render ==========
  return (
    <div>
      <Space block style={{justifyContent: 'end', padding: '8px 0'}}>
        <Trigger
            placement='bottomRight'
            popup={
                <Box>
                    <Transfer
                        dataSource={transferDataSource}
                        targetKeys={targetKeys}
                        onChange={handleTransferChange}
                        titles={['Available', 'Selected']}
                        searchable
                        oneWay={true}
                    />
                </Box>
            }
            hideOnClick={false}
        >
            <Button size='small' type='text' icon={ targetKeys.length ? <FunnelPlus size={16}/> : <Funnel size={16}/> } />
        </Trigger>
      </Space>

      {/* Table */}
      <Table columns={visibleColumns as ColumnProps[]} dataSource={dataSource} />
    </div>
  );
};
