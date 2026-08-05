import { Segmented } from '@rainbow-oh/yee-c';
import { Workflow } from '@rainbow-oh/yee-x';
import React from 'react';
import { branchGraph, weatherGraph } from './data';

export default function View() {
  const [key, setKey] = React.useState('weather');

  return (
    <>
      <Segmented
        style={{ marginBottom: 12 }}
        value={key}
        options={[
          { label: '线性流程', value: 'weather' },
          { label: '条件分支', value: 'branch' },
        ]}
        onChange={(value) => setKey(String(value))}
      />
      <Workflow
        mode="view"
        height={420}
        minimap
        value={key === 'weather' ? weatherGraph : branchGraph}
      />
    </>
  );
}
