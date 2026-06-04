/**
 * title: Formatted Display
 * description: Customize the display format of numbers via formatter and parser.
 */
import React from 'react';
import { InputNumber, Space } from '@rainbow-oh/yee-c';

export default () => {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <InputNumber
                defaultValue={1000}
                // formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                formatter={(v) => v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                placeholder="Formatted currency"
            />
            <InputNumber
                defaultValue={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value!.replace('%', '')}
                placeholder="Percentage"
            />
        </Space>
    );
};
