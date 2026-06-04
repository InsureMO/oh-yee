/**
 * title: Precision Control
 * description: Control decimal places via the precision property.
 */
import React from 'react';
import { InputNumber, Space } from '@rainbow-oh/yee-c';

export default () => {
    return (
        <Space direction="vertical">
            <InputNumber
                defaultValue={3.14159}
                precision={2}
                placeholder="2 decimal places"
            />
            <InputNumber
                defaultValue={1.23456}
                precision={4}
                placeholder="4 decimal places"
            />
        </Space>
    );
};
