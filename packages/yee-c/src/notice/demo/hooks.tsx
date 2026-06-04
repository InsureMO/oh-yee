import React from 'react';
import { useNotice, Button } from '@oh/yee-c';

const HooksDemo = () => {
  const { noticeApi, noticeHolders } = useNotice();

  const handleHooksBasic = () => {
    noticeApi.open('This is a basic notification called via hooks');
  };

  const handleHooksSuccess = () => {
    noticeApi.success({
      title: 'Hooks Success',
      content: 'Success notification called via useNotice hook',
      placement: 'topLeft',
    });
  };

  const handleHooksError = () => {
    noticeApi.error({
      title: 'Hooks Error',
      content: 'Error notification called via useNotice hook',
      placement: 'bottomRight',
      duration: 0, // No auto close
    });
  };

  const handleMultiplePositions = () => {
    noticeApi.info({
      title: 'Top Left',
      content: 'This is a top-left notification',
      placement: 'topLeft',
    });

    noticeApi.success({
      title: 'Top Right',
      content: 'This is a top-right notification',
      placement: 'topRight',
    });

    noticeApi.warning({
      title: 'Bottom Left',
      content: 'This is a bottom-left notification',
      placement: 'bottomLeft',
    });

    noticeApi.error({
      title: 'Bottom Right',
      content: 'This is a bottom-right notification',
      placement: 'bottomRight',
    });
  };

  const handleClearAll = () => {
    noticeApi.clear();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>useNotice Hook Demo</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button onClick={handleHooksBasic}>Hooks Basic</Button>
        <Button onClick={handleHooksSuccess}>Hooks Success</Button>
        <Button onClick={handleHooksError}>Hooks Error</Button>
        <Button onClick={handleMultiplePositions}>Multiple Positions</Button>
        <Button onClick={handleClearAll}>Clear All</Button>
      </div>
      {noticeHolders}
    </div>
  );
};

export default HooksDemo;
