/**
 * title: Disabled State
 * description: Disable the input via the disabled property.
 */
import { InputNumber, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <Space direction="vertical">
            <InputNumber defaultValue={100} disabled placeholder="禁用状态" />
            <InputNumber defaultValue={100} readOnly placeholder="只读状态" />
        </Space>
    );
};
