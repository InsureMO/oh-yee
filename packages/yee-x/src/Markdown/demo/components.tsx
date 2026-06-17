import { Button, Card, Form, Grid, Input, Space } from '@rainbow-oh/yee-c';
import { Markdown } from '@rainbow-oh/yee-x';
import React from 'react';

function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form
        onFinish={(values) => {
          console.log('values', values);
        }}
      >
        <Grid>
          <Form.Field label="Name" name="name" required>
            <Input />
          </Form.Field>
          <Form.Field label="Age" name="age">
            <Input />
          </Form.Field>
        </Grid>
        <Space>
          <Button htmlType="submit">Submit</Button>
        </Space>
      </Form>
    </div>
  );
}

const cs = {
  Demo: Demo,
};

const md = `
<think/>

Since the integer parts are equal, we'll move on to comparing the decimal parts.

- **Step 2:** Compare the tenths place (the first digit after the decimal point).

  - For 10.4, the tenths place is 4.
  - For 10.28, the tenths place is 2.

Here, we see that 4 (from 10.4) is greater than 2 (from 10.28). This indicates that when added to the integer part 10, 10.4 is larger than 10.28.

</think**Answer:** 10.4 is the larger number.

`;

export default function Index() {
  const components = {
    h1: (props: any) => <h1 style={{ color: 'red' }}>{props.children}</h1>,
    component: (params: Record<string, any>) => {
      const name = params.name as string;
      const Comp = cs[name];
      const props = params.props;
      if (Comp) {
        return <Comp {...JSON.parse(props || '{}')} />;
      }
      console.log('props: ', props);
    },
    think: ({ children }) => {
      return <Card title="thinking...">{children}</Card>;
    },
    tool: ({ children }) => {
      return <div>{children}</div>;
    },
  };

  return <Markdown markdown={md} components={components} />;
}
