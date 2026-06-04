import React, { useState } from 'react';
import { Button } from '@oh/yee-c';

export default () => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Button loading>Loading</Button>
            <Button loading type="primary">
                Primary
            </Button>
            <Button loading={loading} onClick={handleClick} color="success">
                Click me!
            </Button>
        </div>
    );
};