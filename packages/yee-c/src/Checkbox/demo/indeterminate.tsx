import { Checkbox } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [checkedList, setCheckedList] = useState(['Apple']);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const options = ['Apple', 'Pear', 'Orange'];

  const onChange = (list: string[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <div style={{ marginTop: '10px' }}>
        {options.map((option) => (
          <Checkbox
            key={option}
            checked={checkedList.includes(option)}
            onChange={(e) => {
              const newCheckedList = e.target.checked
                ? [...checkedList, option]
                : checkedList.filter((item) => item !== option);
              onChange(newCheckedList);
            }}
            style={{ display: 'block', marginBottom: '5px' }}
          >
            {option}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
