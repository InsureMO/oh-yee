/**
 * title: Precision Control
 * description: Control decimal places via the precision property.
 */
import { InputNumber, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <Space direction="vertical">
            <InputNumber
                defaultValue={3.14159}
                precision={2}
                placeholder="保留2位小数"
            />
            <InputNumber
                defaultValue={1.23456}
                precision={4}
                placeholder="保留4位小数"
            />
        </Space>
    );
};
