/**
 * title: Prefix and Suffix
 * description: Add custom content before and after the input.
 */
import React from 'react';
import { InputNumber, Space } from '@oh/yee-c';

export default () => {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <InputNumber
                defaultValue={100}
                prefix="¥"
                placeholder="Enter amount"
            />
            <InputNumber
                defaultValue={50}
                suffix="kg"
                placeholder="Enter weight"
            />
            <InputNumber
                defaultValue={25}
                prefix="$"
                suffix="USD"
                placeholder="Enter price"
            />
        </Space>
    );
};
