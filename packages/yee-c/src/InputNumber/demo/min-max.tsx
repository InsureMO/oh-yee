/**
 * title: Min and Max Values
 * description: Limit the input range via min and max.
 */
import { InputNumber, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <Space direction="vertical">
            <InputNumber
                defaultValue={5}
                min={0}
                max={10}
                placeholder="0-10之间"
            />
            <InputNumber
                defaultValue={0}
                min={-100}
                max={100}
                placeholder="-100到100"
            />
        </Space>
    );
};
