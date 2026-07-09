/**
 * 自定义表格元素（可被外部接管）
 *
 * Table 暴露两个接缝供外部库（如 dnd-kit）接管行/体渲染：
 * - components.body.tbody —— 替换 <tbody>，外部可在此包 SortableContext 等 Provider；
 * - components.body.row   —— 整行接管，消费方自行渲染 <tr> + 单元格，可在任意单元格里放拖拽手柄。
 *
 * Table 本身不依赖任何拖拽库；本 demo 不引入 dnd，仅证明替换点生效。
 */
import { Table } from '@rainbow-oh/yee-c';
import type { TableComponents, TableRowRendererProps } from '@rainbow-oh/yee-c';
import React from 'react';

// 替换 <tbody>：保持渲染 <tbody>，外部库可在此包 SortableContext。
const CustomTbody = (props: { className?: string; children?: React.ReactNode }) => (
  <tbody className={props.className} data-custom-tbody>
    {props.children}
  </tbody>
);

// 整行接管：消费方渲染整 <tr> + 单元格，可在此放拖拽手柄等任意内容。
const CustomRow = ({ record, index, columns, rowKey }: TableRowRendererProps) => (
  <tr data-row-key={rowKey} style={{ background: index % 2 === 0 ? '#f8fafc' : undefined }}>
    <td style={{ width: 40, textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>{index + 1}</td>
    {columns.map((col) => (
      <td key={String(col.key)}>{record[col.dataIndex || '']}</td>
    ))}
  </tr>
);

export default () => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];

  const dataSource = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
  ];

  const components: TableComponents = {
    body: { tbody: CustomTbody, row: CustomRow },
  };

  return <Table columns={columns} dataSource={dataSource} components={components} />;
};
