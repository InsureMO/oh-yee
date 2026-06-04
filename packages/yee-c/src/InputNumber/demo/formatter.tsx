/**
 * title: Formatted Display
 * description: Customize the display format of numbers via formatter and parser.
 */
import { InputNumber, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <InputNumber
                defaultValue={1000}
                // formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                formatter={(v) => v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                placeholder="格式化金额"
            />
            <InputNumber
                defaultValue={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value!.replace('%', '')}
                placeholder="百分比"
            />
        </Space>
    );
};
