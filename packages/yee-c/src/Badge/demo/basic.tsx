import React from 'react';
import { Avatar, Badge, Box } from '@oh/yee-c';

export default () => {
    return (
        <>
            <Box>
                <Badge count={5}>
                    <Avatar shape="square" size="large" style={{ backgroundColor: '#aaa' }} />
                </Badge>
                <span style={{ marginLeft: '20px' }}></span>
                <Badge count={0} showZero>
                    <Avatar shape="square" size="large" style={{ backgroundColor: '#aaa' }} />
                </Badge>
                <span style={{ marginLeft: '20px' }}></span>
                <Badge count={0}>
                    <Avatar shape="square" size="large" style={{ backgroundColor: '#aaa' }} />
                </Badge>
            </Box>
        </>
    );
};
