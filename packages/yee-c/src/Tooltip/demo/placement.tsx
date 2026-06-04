import { Button, Space, Tooltip } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px',
      }}
    >
      <Space>
        <Tooltip title="Top Left" placement="topLeft">
          <Button>TL</Button>
        </Tooltip>
        <Tooltip title="Top" placement="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip title="Top Right" placement="topRight">
          <Button>TR</Button>
        </Tooltip>
      </Space>

      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          margin: '8px 0',
        }}
      >
        <Space direction="vertical">
          <Tooltip title="Left Top" placement="leftTop">
            <Button>LT</Button>
          </Tooltip>
          <Tooltip title="Left" placement="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip title="Left Bottom" placement="leftBottom">
            <Button>LB</Button>
          </Tooltip>
        </Space>

        <Space direction="vertical">
          <Tooltip title="Right Top" placement="rightTop">
            <Button>RT</Button>
          </Tooltip>
          <Tooltip title="Right" placement="right">
            <Button>Right</Button>
          </Tooltip>
          <Tooltip title="Right Bottom" placement="rightBottom">
            <Button>RB</Button>
          </Tooltip>
        </Space>
      </div>

      <Space>
        <Tooltip title="Bottom Left" placement="bottomLeft">
          <Button>BL</Button>
        </Tooltip>
        <Tooltip title="Bottom" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip title="Bottom Right" placement="bottomRight">
          <Button>BR</Button>
        </Tooltip>
      </Space>
    </div>
  );
};
