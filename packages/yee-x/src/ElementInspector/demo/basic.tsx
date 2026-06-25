import {
  Box,
  Button,
  Form,
  Grid,
  Input,
  Select,
  Space,
  Table,
} from '@rainbow-oh/yee-c';
import { ElementInspector } from '@rainbow-oh/yee-x';
import React, { useMemo, useState } from 'react';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'disabled';
}

const ALL_USERS: UserRecord[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Engineer',
    status: 'active',
  },
  {
    id: '2',
    name: 'Alan Turing',
    email: 'alan@example.com',
    role: 'Architect',
    status: 'active',
  },
  {
    id: '3',
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Manager',
    status: 'disabled',
  },
  {
    id: '4',
    name: 'Linus Torvalds',
    email: 'linus@example.com',
    role: 'Engineer',
    status: 'active',
  },
  {
    id: '5',
    name: 'Margaret Hamilton',
    email: 'margaret@example.com',
    role: 'Architect',
    status: 'active',
  },
  {
    id: '6',
    name: 'Dennis Ritchie',
    email: 'dennis@example.com',
    role: 'Engineer',
    status: 'disabled',
  },
  {
    id: '7',
    name: 'Barbara Liskov',
    email: 'barbara@example.com',
    role: 'Manager',
    status: 'active',
  },
];

const ROLE_OPTIONS = [
  { label: 'Engineer', value: 'Engineer' },
  { label: 'Architect', value: 'Architect' },
  { label: 'Manager', value: 'Manager' },
];

const STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Disabled', value: 'disabled' },
];

interface UserFilter {
  name?: string;
  role?: string;
  status?: 'active' | 'disabled';
}

export default function Demo() {
  const [form] = Form.useForm();
  const [filter, setFilter] = useState<UserFilter>({});
  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(
    () =>
      ALL_USERS.filter((user) => {
        if (
          filter.name &&
          !user.name.toLowerCase().includes(filter.name.toLowerCase())
        ) {
          return false;
        }
        if (filter.role && user.role !== filter.role) {
          return false;
        }
        if (filter.status && user.status !== filter.status) {
          return false;
        }
        return true;
      }),
    [filter],
  );

  const paged = useMemo(() => {
    const start = (current - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, current]);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (record: Record<string, unknown>) =>
        (record as unknown as UserRecord).status === 'active'
          ? 'Active'
          : 'Disabled',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" onClick={() => undefined}>
            Edit
          </Button>
          <Button variant="link" color="danger" onClick={() => undefined}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const resetSearch = () => {
    setFilter({});
    setCurrent(1);
  };

  return (
    <ElementInspector contextMenu>
      <div style={{ display: 'grid', gap: 16 }}>
        <p style={{ color: '#888', margin: 0 }}>
          Click the floating button (bottom-right) or press <kbd>Alt</kbd>+
          <kbd>E</kbd>, then click any region — the search box, a single form
          field, a table cell, or an action button in a row. A popover with the
          generated prompt appears next to it. <strong>Right-click</strong> a region for a dev menu (jump to source, copy selectors). Press <kbd>Esc</kbd> to stop.
        </p>

        <Box data-testid="user-search">
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              setFilter(values as UserFilter);
              setCurrent(1);
            }}
          >
            <Grid cols={3} colGap={16} rowGap={16}>
              <Grid.Item>
                <Form.Field name="name" label="Name">
                  <Input placeholder="Search by name" />
                </Form.Field>
              </Grid.Item>
              <Grid.Item>
                <Form.Field name="role" label="Role">
                  <Select options={ROLE_OPTIONS} />
                </Form.Field>
              </Grid.Item>
              <Grid.Item>
                <Form.Field name="status" label="Status">
                  <Select options={STATUS_OPTIONS} />
                </Form.Field>
              </Grid.Item>
            </Grid>
            <Space data-testid="user-search-action" style={{ marginTop: 16 }}>
              <Button type="primary" htmlType="submit" data-testid="search-btn">
                Search
              </Button>
              <Button
                htmlType="reset"
                data-testid="reset-btn"
                onClick={resetSearch}
              >
                Reset
              </Button>
            </Space>
          </Form>
        </Box>

        <Table
          data-testid="user-table"
          dataSource={paged}
          columns={columns}
          rowKey="id"
          pagination={{
            current,
            pageSize,
            total: filtered.length,
            onChange: ({ current }) => setCurrent(current ?? 1),
          }}
        />
      </div>
    </ElementInspector>
  );
}
