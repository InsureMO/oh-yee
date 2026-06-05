import { Timeline } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Timeline reverse>
      <Timeline.Item index={1}>Create a services site 2015-09-01</Timeline.Item>
      <Timeline.Item index={2}>
        Solve initial network problems 2015-09-01
      </Timeline.Item>
      <Timeline.Item index={3}>Technical testing 2015-09-01</Timeline.Item>
      <Timeline.Item index={4}>
        Network problems being solved 2015-09-01
      </Timeline.Item>
    </Timeline>
  );
};
