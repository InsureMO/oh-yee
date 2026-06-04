import { Button, notice } from '@oh/yee-c';
import React from 'react';

const BasicDemo = () => {
  const handleBasic = () => {
    notice.open('This is a basic notification');
  };

  const handleWithTitle = () => {
    notice.info({
      title: 'Info',
      content: 'This is an info notification with a title',
      placement: 'topRight',
      duration: 500000,
      showProgress: true,
    });
  };

  const handleSuccess = () => {
    notice.success({
      title: 'Success',
      content: 'Your operation completed successfully!',
      placement: 'topLeft',
    });
  };

  const handleWarning = () => {
    notice.warning({
      title: 'Warning',
      content: 'Please check your input',
      placement: 'bottomRight',
    });
  };

  const handleError = () => {
    notice.error({
      title: 'Error',
      content: 'Operation failed, please try again later',
      placement: 'bottomLeft',
    });
  };

  const handleCustomDuration = () => {
    notice.info({
      title: 'Custom Duration',
      content: 'This notification will auto-close in 10 seconds',
      duration: 10000,
      placement: 'top',
    });
  };

  const handleNeverClose = () => {
    notice.warning({
      title: 'No Auto-Close',
      content: 'This notification must be closed manually',
      duration: 0,
      placement: 'bottom',
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notice Component Demo</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button onClick={handleBasic}>Basic</Button>
        <Button onClick={handleWithTitle}>Info (Top Right)</Button>
        <Button onClick={handleSuccess}>Success (Top Left)</Button>
        <Button onClick={handleWarning}>Warning (Bottom Right)</Button>
        <Button onClick={handleError}>Error (Bottom Left)</Button>
        <Button onClick={handleCustomDuration}>Custom Duration (Top)</Button>
        <Button onClick={handleNeverClose}>No Auto-Close (Bottom)</Button>
      </div>
    </div>
  );
};

export default BasicDemo;
