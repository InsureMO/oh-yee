import { Button, Popover, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Popover placement="topLeft" title="Top Left" content="Content">
          <Button>TL</Button>
        </Popover>

        <Popover placement="top" title="Top" content="Content">
          <Button>Top</Button>
        </Popover>

        <Popover placement="topRight" title="Top Right" content="Content">
          <Button>TR</Button>
        </Popover>
      </Space>

      <Space>
        <Popover placement="leftTop" title="Left Top" content="Content">
          <Button>LT</Button>
        </Popover>

        <Popover placement="rightTop" title="Right Top" content="Content">
          <Button>RT</Button>
        </Popover>
      </Space>

      <Space>
        <Popover placement="left" title="Left" content="Content">
          <Button>Left</Button>
        </Popover>

        <Popover placement="right" title="Right" content="Content">
          <Button>Right</Button>
        </Popover>
      </Space>

      <Space>
        <Popover placement="leftBottom" title="Left Bottom" content="Content">
          <Button>LB</Button>
        </Popover>

        <Popover placement="rightBottom" title="Right Bottom" content="Content">
          <Button>RB</Button>
        </Popover>
      </Space>

      <Space>
        <Popover placement="bottomLeft" title="Bottom Left" content="Content">
          <Button>BL</Button>
        </Popover>

        <Popover placement="bottom" title="Bottom" content="Content">
          <Button>Bottom</Button>
        </Popover>

        <Popover placement="bottomRight" title="Bottom Right" content="Content">
          <Button>BR</Button>
        </Popover>
      </Space>
    </Space>
  );
};
