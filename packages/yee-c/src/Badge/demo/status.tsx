import React from 'react';
import { Badge } from '@oh/yee-c';

export default () => {
    return (
        <div>
            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                <Badge status="success" text="Success" />
                <Badge status="error" text="Error" />
                <Badge status="processing" text="Processing" />
                <Badge status="warning" text="Warning" />
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
                <Badge status="success" />
                <Badge status="error" />
                <Badge status="processing" />
                <Badge status="warning" />
            </div>
        </div>
    );
};