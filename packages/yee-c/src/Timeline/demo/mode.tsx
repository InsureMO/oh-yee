import { Timeline } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <>
      <Timeline mode="left">
        <Timeline.Item index={1} label="2015-09-01">
          Create a services site 2015-09-01
        </Timeline.Item>
        <Timeline.Item index={2} label="2015-09-01">
          Solve initial network problems 2015-09-01
        </Timeline.Item>
        <Timeline.Item index={3} label="2015-09-01">
          Technical testing 2015-09-01
        </Timeline.Item>
        <Timeline.Item index={4} label="2015-09-01">
          Network problems being solved 2015-09-01
        </Timeline.Item>
      </Timeline>

      <br />

      <Timeline mode="alternate">
        <Timeline.Item index={1} label="2015-09-01">
          Create a services site 2015-09-01
        </Timeline.Item>
        <Timeline.Item index={2} label="2015-09-01">
          Solve initial network problems 2015-09-01
        </Timeline.Item>
        <Timeline.Item index={3} label="2015-09-01">
          Technical testing 2015-09-01
        </Timeline.Item>
        <Timeline.Item index={4} label="2015-09-01">
          Network problems being solved 2015-09-01
        </Timeline.Item>
      </Timeline>

      <br />

      <Timeline mode="right">
        <Timeline.Item index={1} label="2015-09-01">
          Create a services site 2015-09-01
        </Timeline.Item>
        <Timeline.Item index={2} label="2015-09-01">
          Solve initial network problems 2015-09-01
        </Timeline.Item>
        <Timeline.Item index={3} label="2015-09-01">
          Technical testing 2015-09-01
        </Timeline.Item>
        <Timeline.Item index={4} label="2015-09-01">
          Network problems being solved 2015-09-01
        </Timeline.Item>
      </Timeline>
    </>
  );
};
