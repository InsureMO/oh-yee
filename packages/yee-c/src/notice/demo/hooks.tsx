import React from 'react';
import { useNotice, Button } from '@oh/yee-c';

const HooksDemo = () => {
  const { noticeApi, noticeHolders } = useNotice();

  const handleHooksBasic = () => {
    noticeApi.open('这是通过 hooks 调用的基本通知');
  };

  const handleHooksSuccess = () => {
    noticeApi.success({
      title: 'Hooks 成功',
      content: '通过 useNotice hooks 调用的成功通知',
      placement: 'topLeft',
    });
  };

  const handleHooksError = () => {
    noticeApi.error({
      title: 'Hooks 错误',
      content: '通过 useNotice hooks 调用的错误通知',
      placement: 'bottomRight',
      duration: 0, // No auto close
    });
  };

  const handleMultiplePositions = () => {
    noticeApi.info({
      title: '左上角',
      content: '这是左上角的通知',
      placement: 'topLeft',
    });

    noticeApi.success({
      title: '右上角',
      content: '这是右上角的通知',
      placement: 'topRight',
    });

    noticeApi.warning({
      title: '左下角',
      content: '这是左下角的通知',
      placement: 'bottomLeft',
    });

    noticeApi.error({
      title: '右下角',
      content: '这是右下角的通知',
      placement: 'bottomRight',
    });
  };

  const handleClearAll = () => {
    noticeApi.clear();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>useNotice Hooks 演示</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button onClick={handleHooksBasic}>Hooks 基本通知</Button>
        <Button onClick={handleHooksSuccess}>Hooks 成功通知</Button>
        <Button onClick={handleHooksError}>Hooks 错误通知</Button>
        <Button onClick={handleMultiplePositions}>多位置同时显示</Button>
        <Button onClick={handleClearAll}>清除所有通知</Button>
      </div>
      {noticeHolders}
    </div>
  );
};

export default HooksDemo;
