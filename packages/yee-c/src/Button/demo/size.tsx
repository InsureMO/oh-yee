import React from 'react';
import { Button } from '@rainbow-oh/yee-c';

export default () => {
    return (
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Button size="small" type="primary">
                Small
            </Button>
            <Button size="default" type="primary">
                Default
            </Button>
            <Button size="large" type="primary">
                Large
            </Button>
        </div>
    );
};