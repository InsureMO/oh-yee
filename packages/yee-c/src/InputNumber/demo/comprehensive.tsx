/**
 * title: Comprehensive Example
 * description: Demonstrates various feature combinations of InputNumber.
 */
import React, { useState } from 'react';
import { InputNumber, Space } from '@oh/yee-c';
import { DollarSign, Percent } from 'lucide-react';

export default () => {
    const [value1, setValue1] = useState<number | null>(100);
    const [value2, setValue2] = useState<number | null>(50);

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <div>
                <div style={{ marginBottom: 8 }}>Price input (with icon prefix):</div>
                <InputNumber
                    value={value1}
                    onChange={setValue1}
                    min={0}
                    max={10000}
                    step={10}
                    precision={2}
                    prefix={<DollarSign size={14} />}
                    suffix="USD"
                    allowClear
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value!.replace(/,/g, '')}
                    placeholder="Enter price"
                />
                <div style={{ marginTop: 8, color: '#666' }}>
                    Current value: {value1 ?? 'null'}
                </div>
            </div>

            <div>
                <div style={{ marginBottom: 8 }}>Percentage input (with icon suffix):</div>
                <InputNumber
                    value={value2}
                    onChange={setValue2}
                    min={0}
                    max={100}
                    step={5}
                    precision={1}
                    suffix={<Percent size={14} />}
                    allowClear
                    formatter={(value) => `${value}`}
                    placeholder="Enter percentage"
                />
                <div style={{ marginTop: 8, color: '#666' }}>
                    Current value: {value2 ?? 'null'}%
                </div>
            </div>

            <div>
                <div style={{ marginBottom: 8 }}>No stepper:</div>
                <InputNumber
                    defaultValue={999}
                    controls={false}
                    prefix="¥"
                    allowClear
                    placeholder="No stepper"
                />
            </div>
        </Space>
    );
};
