import React, { useState, useMemo } from 'react';
import { Table, Button, Transfer, Space, Trigger, Box } from '@oh/yee-c';
import { Funnel, FunnelPlus } from 'lucide-react';

export default () => {
  // ========== 状态管理 ==========
  // 所有可用的列定义
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

  // Transfer 数据源（列的选项）
  const transferDataSource = allColumns.map((col) => ({
    key: col.key,
    label: col.title,
  }));

  // 默认显示的列（显示前3列）
  const defaultTargetKeys = ['name', 'age', 'address'];

  // 当前选中的列 keys
  const [targetKeys, setTargetKeys] = useState<Array<string | number>>(defaultTargetKeys);

  // Transfer 弹窗显示状态
  const [transferVisible, setTransferVisible] = useState(false);

  // ========== 数据 ==========
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

  // ========== 事件处理 ==========
  /**
   * 处理 Transfer 选择变化
   * @param newTargetKeys - 新选中的列 keys
   */
  const handleTransferChange = (newTargetKeys: Array<string | number>) => {
    setTargetKeys(newTargetKeys);
  };

  /**
   * 切换 Transfer 弹窗显示状态
   */
  const toggleTransfer = () => {
    setTransferVisible(!transferVisible);
  };

  // ========== 计算属性 ==========
  /**
   * 根据 targetKeys 过滤要显示的列
   * 保持列的原始顺序
   */
  const visibleColumns = useMemo(() => {
    return allColumns.filter((col) => targetKeys.includes(col.key as string));
  }, [targetKeys]);

  // ========== 渲染 ==========
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
                        titles={['可选列', '已选列']}
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

      {/* 表格 */}
      <Table columns={visibleColumns as any} dataSource={dataSource} />
    </div>
  );
};
