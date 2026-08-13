import React, { useMemo, useState } from 'react';
import Search from '../index';
import type { SearchOption } from '../interface';
const people: SearchOption[] = [
  { key: 'ada', value: 'ada', label: 'Ada Lovelace' },
  { key: 'grace', value: 'grace', label: 'Grace Hopper' },
  { key: 'alan', value: 'alan', label: 'Alan Turing' },
  { key: 'margaret', value: 'margaret', label: 'Margaret Hamilton' },
];
export default () => {
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<SearchOption | null>(null);
  const results = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const matched = people.filter((person) =>
      String(person.label).toLowerCase().includes(normalizedKeyword),
    );
    return matched.length > 0
      ? matched
      : [
          {
            key: 'empty',
            value: 'empty',
            label: 'No results found',
            disabled: true,
          },
        ];
  }, [keyword]);
  const handleSelect = (option: SearchOption | null) => {
    setSelected(option);
    if (option) {
      setKeyword(String(option.label));
    }
  };
  return (
    <div style={{ width: 320 }}>
      <Search
        allowClear
        value={keyword}
        options={results}
        placeholder="Search people"
        onSearch={setKeyword}
        onChange={handleSelect}
      />
      <div style={{ marginTop: 12 }}>
        Selected: {selected ? String(selected.label) : 'None'}
      </div>
    </div>
  );
};
