import { Alert } from '@oh/yee-c';
import React from 'react';
import { Apple } from 'lucide-react'

export default () => {
    return (
        <>
            <Alert
                description="Alert with custom icon"
                icon={<Apple size={16} />}
                showIcon
            />
            <br />
            <Alert
                description="Success alert without default icon"
                status="success"
                showIcon={false}
            />
        </>
    );
};