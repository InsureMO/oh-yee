import { Button, notice } from '@oh/yee-c';
import React from 'react';

const BasicDemo = () => {
  const handleBasic = () => {
    notice.open('这是一个基本的通知');
  };

  const handleWithTitle = () => {
    notice.info({
      title: '信息通知',
      content: '这是一个带标题的信息通知',
      placement: 'topRight',
      duration: 500000,
      showProgress: true,
    });
  };

  const handleSuccess = () => {
    notice.success({
      title: '操作成功',
      content: '您的操作已成功完成！',
      placement: 'topLeft',
    });
  };

  const handleWarning = () => {
    notice.warning({
      title: '警告',
      content: '请注意检查您的输入信息',
      placement: 'bottomRight',
    });
  };

  const handleError = () => {
    notice.error({
      title: '错误',
      content: '操作失败，请稍后重试',
      placement: 'bottomLeft',
    });
  };

  const handleCustomDuration = () => {
    notice.info({
      title: '自定义时长',
      content: '这个通知将在10秒后自动关闭',
      duration: 10000,
      placement: 'top',
    });
  };

  const handleNeverClose = () => {
    notice.warning({
      title: '不会自动关闭',
      content: '这个通知需要手动关闭',
      duration: 0,
      placement: 'bottom',
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notice 通知组件演示</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button onClick={handleBasic}>基本通知</Button>
        <Button onClick={handleWithTitle}>信息通知 (右上)</Button>
        <Button onClick={handleSuccess}>成功通知 (左上)</Button>
        <Button onClick={handleWarning}>警告通知 (右下)</Button>
        <Button onClick={handleError}>错误通知 (左下)</Button>
        <Button onClick={handleCustomDuration}>自定义时长 (顶部)</Button>
        <Button onClick={handleNeverClose}>不自动关闭 (底部)</Button>
      </div>
    </div>
  );
};

export default BasicDemo;
