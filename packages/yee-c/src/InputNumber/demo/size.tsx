/**
 * title: Three Sizes
 * description: Provides three sizes: small, default, and large.
 */
import React from 'react';
import { InputNumber, Space } from '@oh/yee-c';

export default () => {
    return (
        <Space direction="vertical">
            <InputNumber size="small" defaultValue={100} placeholder="Small" />
            <InputNumber size="default" defaultValue={100} placeholder="Default" />
            <InputNumber size="large" defaultValue={100} placeholder="Large" />
        </Space>
    );
};
