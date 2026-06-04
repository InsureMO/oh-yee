import { Timeline } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Timeline>
      <Timeline.Item index={1} dot="🔑">Create a services site 2015-09-01</Timeline.Item>
      <Timeline.Item index={2} dot="🔧" color="blue">
        Solve initial network problems 2015-09-01
      </Timeline.Item>
      <Timeline.Item index={3} dot="🧪" color="green">
        Technical testing 2015-09-01
      </Timeline.Item>
      <Timeline.Item index={4} dot="✅" color="red">
        Network problems being solved 2015-09-01
      </Timeline.Item>
    </Timeline>
  );
};
