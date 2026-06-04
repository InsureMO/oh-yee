import React from 'react';
import CSVDownloader from '../download';

const headers = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' },
];

const data = [
  { id: 1, name: 'Alice', age: 28, city: 'New York' },
  { id: 2, name: 'Bob', age: 34, city: 'London' },
  { id: 3, name: 'Charlie', age: 22, city: 'Tokyo' },
];

export default () => {
  return (
    <CSVDownloader
      filename="users"
      headers={headers}
      data={data}
    >
      Download CSV
    </CSVDownloader>
  );
};
