/**
 * title: Step Size
 * description: Set the step size for each change via the step property.
 */
import { InputNumber, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <Space direction="vertical">
            <InputNumber
                defaultValue={0}
                step={1}
                placeholder="步长为1"
            />
            <InputNumber
                defaultValue={0}
                step={5}
                placeholder="步长为5"
            />
            <InputNumber
                defaultValue={0}
                step={0.1}
                precision={1}
                placeholder="步长为0.1"
            />
        </Space>
    );
};
