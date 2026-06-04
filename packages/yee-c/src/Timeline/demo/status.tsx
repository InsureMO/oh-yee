import { Timeline } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Timeline>
      <Timeline.Item index={1} status="success">
        Create a services site 2015-09-01
      </Timeline.Item>
      <Timeline.Item index={2} status="error">
        Solve initial network problems 2015-09-01
      </Timeline.Item>
      <Timeline.Item index={3} status="warning">
        Technical testing 2015-09-01
      </Timeline.Item>
      <Timeline.Item index={4} status="info">
        Network problems being solved 2015-09-01
      </Timeline.Item>
      <Timeline.Item index={5} status="disabled">Disabled step 2015-09-01</Timeline.Item>
    </Timeline>
  );
};
