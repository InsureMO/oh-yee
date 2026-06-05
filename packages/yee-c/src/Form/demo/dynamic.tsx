import { Button, Form, Input, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [friends, setFriends] = useState([{ name: '', age: '' }]);

  const addFriend = () => {
    setFriends([...friends, { name: '', age: '' }]);
  };

  const removeFriend = (index: number) => {
    const newFriends = [...friends];
    newFriends.splice(index, 1);
    setFriends(newFriends);
  };

  const onFinish = (values: Record<string, unknown>) => {
    console.log('Received values:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Field
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Please input your username" />
      </Form.Field>

      {friends.map((friend, index) => (
        <div
          key={index}
          style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}
        >
          <Form.Field
            name={`friends${index}name`}
            label={`Friend ${index + 1} Name`}
            rules={[{ required: true, message: 'Please input friend name!' }]}
          >
            <Input placeholder="Please input friend name" />
          </Form.Field>

          <Form.Field
            name={`friends${index}age`}
            label={`Friend ${index + 1} Age`}
            rules={[{ required: true, message: 'Please input friend age!' }]}
          >
            <Input type="number" placeholder="Please input friend age" />
          </Form.Field>

          {friends.length > 1 && (
            <Button onClick={() => removeFriend(index)} color="danger">
              Remove
            </Button>
          )}
        </div>
      ))}

      <Space>
        <Button onClick={addFriend}>Add Friend</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Space>
    </Form>
  );
};
