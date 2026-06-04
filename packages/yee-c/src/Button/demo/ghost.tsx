import { Space, Button } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <Space wrap>
            <Button ghost>Default</Button>
            <Button ghost type="primary">
                Primary
            </Button>
            <Button ghost color="success">
                Success
            </Button>
            <Button ghost color="warning">
                Warning
            </Button>
            <Button ghost color="danger">
                Danger
            </Button>
            <Button ghost color="info">
                Info
            </Button>
        </Space>
    );
};
