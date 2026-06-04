/**
 * title: Min and Max Values
 * description: Limit the input range via min and max.
 */
import React from 'react';
import { InputNumber, Space } from '@oh/yee-c';

export default () => {
    return (
        <Space direction="vertical">
            <InputNumber
                defaultValue={5}
                min={0}
                max={10}
                placeholder="Between 0 and 10"
            />
            <InputNumber
                defaultValue={0}
                min={-100}
                max={100}
                placeholder="Between -100 and 100"
            />
        </Space>
    );
};
