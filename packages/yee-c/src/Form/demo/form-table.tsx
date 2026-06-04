import { Button, Form, Input, Space, Table } from '@oh/yee-c';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Form + Table 动态表单示例</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.List name="users" initialValue={[{
          name: '',
          age: '',
          address: '',
        }]}>
          {(fields, operations, meta) => {
            // 定义列配置 - 在这里可以访问 operations
            const columns = [
              {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                render: (record: any, index: number) => (
                  <Form.Field name={[index, 'name']} required>
                    <Input placeholder="请输入姓名" />
                  </Form.Field>
                ),
              },
              {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: '20%',
                render: (record: any, index: number) => (
                  <Form.Field name={[index, 'age']} required>
                    <Input placeholder="请输入年龄" type="number" />
                  </Form.Field>
                ),
              },
              {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
                width: '40%',
                render: (record: any, index: number) => (
                  <Form.Field name={[index, 'address']}>
                    <Input placeholder="请输入地址" />
                  </Form.Field>
                ),
              },
              {
                title: '操作',
                key: 'action',
                width: '10%',
                render: (record: any, index: number) => (
                  <Button
                    type="link"
                    color="danger"
                    onClick={() => operations.remove(index)}
                  >
                    删除
                  </Button>
                ),
              },
            ];

            return (
              <Table
                columns={columns}
                dataSource={fields}
                rowKey="key"
                pagination={false}
                footer={() => (
                  <Button
                    type="dashed"
                    onClick={() => operations.add({
                      name: '',
                      age: '',
                      address: '',
                    })}
                    block
                  >
                    + 添加一行
                  </Button>
                )}
              />
            );
          }}
        </Form.List>

        <Space style={{ marginTop: '24px' }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button
            style={{ marginLeft: '8px' }}
            onClick={() => {
              console.log('Current Values:', form.getFieldsValue());
            }}
          >
            查看当前值
          </Button>
        </Space>
      </Form>
    </div>
  );
};
