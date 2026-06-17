import type { ColumnProps } from '@rainbow-oh/yee-c';
import { Button, Form, Input, Space, Table } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, unknown>) => {
    console.log('Form Values:', values);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Form + Table Dynamic Form Example</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.List
          name="users"
          // initialValue={[
          //   {
          //     name: '',
          //     age: '',
          //     address: '',
          //   },
          // ]}
        >
          {(fields, operations) => {
            // Define column config - operations are accessible here
            const columns: ColumnProps[] = [
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                render: (_record, index) => (
                  <Form.Field name={[index, 'name']} required>
                    <Input placeholder="Please enter name" />
                  </Form.Field>
                ),
              },
              {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: '20%',
                render: (_record, index) => (
                  <Form.Field name={[index, 'age']} required>
                    <Input placeholder="Please enter age" type="number" />
                  </Form.Field>
                ),
              },
              {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                width: '40%',
                render: (_record, index) => (
                  <Form.Field name={[index, 'address']}>
                    <Input placeholder="Please enter address" />
                  </Form.Field>
                ),
              },
              {
                title: 'Action',
                key: 'action',
                width: '10%',
                render: (_record, index) => (
                  <Button
                    type="link"
                    color="danger"
                    onClick={() => operations.remove(index)}
                  >
                    Delete
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
                    onClick={() =>
                      operations.add({
                        name: '',
                        age: '',
                        address: '',
                      })
                    }
                    block
                  >
                    + Add Row
                  </Button>
                )}
              />
            );
          }}
        </Form.List>

        <Space style={{ marginTop: '24px' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            style={{ marginLeft: '8px' }}
            onClick={() => {
              console.log('Current Values:', form.getFieldsValue());
            }}
          >
            View Current Values
          </Button>
        </Space>
      </Form>
    </div>
  );
};
