/**
 * title: Step Size
 * description: Set the step size for each change via the step property.
 */
import React from 'react';
import { InputNumber, Space } from '@rainbow-oh/yee-c';

export default () => {
    return (
        <Space direction="vertical">
            <InputNumber
                defaultValue={0}
                step={1}
                placeholder="Step size 1"
            />
            <InputNumber
                defaultValue={0}
                step={5}
                placeholder="Step size 5"
            />
            <InputNumber
                defaultValue={0}
                step={0.1}
                precision={1}
                placeholder="Step size 0.1"
            />
        </Space>
    );
};
