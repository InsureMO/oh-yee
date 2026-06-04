/**
 * title: Prefix and Suffix
 * description: Add custom content before and after the input.
 */
import { InputNumber, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <InputNumber
                defaultValue={100}
                prefix="¥"
                placeholder="请输入金额"
            />
            <InputNumber
                defaultValue={50}
                suffix="kg"
                placeholder="请输入重量"
            />
            <InputNumber
                defaultValue={25}
                prefix="$"
                suffix="USD"
                placeholder="请输入价格"
            />
        </Space>
    );
};
