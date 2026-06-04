import { Download, Plus, Search } from 'lucide-react';
import { Button } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <>
            <Button type="primary" icon={<Search size={16} />}>
                Search
            </Button>
            <span style={{ margin: '0 10px' }}></span>
            <Button icon={<Download size={16} />}>Download</Button>
            <br />
            <br />
            <Button shape="circle" icon={<Plus size={16} />} />
            <span style={{ margin: '0 10px' }}></span>
            <Button shape="circle" type="primary" icon={<Search size={16} />} />
            <br />
            <br />
            <Button icon={<Search size={16} />} />
            <span style={{ margin: '0 10px' }}></span>
            <Button icon={<Search size={16} />} type="primary" />
        </>
    );
};
