import { Button, message, Space, Table } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

import type { ColumnProps } from '@rainbow-oh/yee-c';

interface RecordType {
  key: string;
  name: string;
  age: number;
  gender: string;
}

const allData: RecordType[] = [
  { key: '1', name: 'John Brown', age: 32, gender: 'male' },
  { key: '2', name: 'Jim Green', age: 42, gender: 'male' },
  { key: '3', name: 'Joe Black', age: 32, gender: 'male' },
  { key: '4', name: 'Jon Snow', age: 42, gender: 'female' },
  { key: '5', name: 'Arya Stark', age: 16, gender: 'female' },
];

export default () => {
  const { messageApi, messageHolder } = message.useMessage();

  // Server-side search: keep the keyword controlled, refetch in onChange.
  const [nameKeyword, setNameKeyword] = useState<string>('');

  // Controlled local filter: the tree selection lives in the parent state.
  const [genders, setGenders] = useState<string[]>([]);

  const columns: ColumnProps[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filter: {
        searchable: true,
        // No onFilter: no local matching, the search hits the "server".
        filteredValue: nameKeyword,
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      filter: {
        filterMode: 'tree',
        items: [
          { label: 'Male', key: 'male' },
          { label: 'Female', key: 'female' },
        ],
        filteredValue: genders,
        onFilter: (value, record) => value === record.gender,
      },
    },
  ];

  const handleChange: React.ComponentProps<typeof Table>['onChange'] = (
    info,
  ) => {
    if (info.action !== 'filter') return;

    const filters = (info.filters ?? {}) as {
      name?: string;
      gender?: string[];
    };

    // The committing column's key is always present in the payload — with its
    // empty value on clear — so both setting and clearing are mirrored here.
    const name = filters.name ?? '';
    if (name !== nameKeyword) {
      // Pretend to refetch with ?name=<keyword>.
      messageApi.info(`Fetch: /api/users?name=${name}`);
      setNameKeyword(name);
    }

    setGenders(filters.gender ?? []);
  };

  const data = allData.filter((item) => {
    const matchName = nameKeyword
      ? item.name.toLowerCase().includes(nameKeyword.toLowerCase())
      : true;
    const matchGender = genders.length ? genders.includes(item.gender) : true;
    return matchName && matchGender;
  });

  return (
    <>
      {messageHolder}
      <Space block style={{ marginBottom: 16 }}>
        <Button onClick={() => setNameKeyword('')}>Reset name search</Button>
        <Button onClick={() => setGenders([])}>Reset gender filter</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={false}
      />
    </>
  );
};
