import { Button, Card, Grid, Input, useVirtualForm } from '@rainbow-oh/yee-c';
import React, { useLayoutEffect } from 'react';

export default function Virtual() {
  const { createForm, getForm, Field } = useVirtualForm();

  useLayoutEffect(() => {
    const { form, destroyForm } = createForm('form');
    setTimeout(() => {
      form.initialize({
        initialValues: {
          name: 'John',
          age: 18,
        },
        callbacks: {
          onFinish: (values) => {
            console.log('finish: ', values);
          },
          onFinishFailed: () => {
            console.log('failed');
          },
        },
      });
    }, 2000);

    return destroyForm;
  }, []);

  return (
    <Card>
      <Grid>
        <Grid.Item>
          <Field
            label="Name"
            formName="form"
            name="name"
            required
            layout="horizontal"
          >
            <Input />
          </Field>
        </Grid.Item>
        <Grid.Item>
          <Field label="Age" formName="form" name="age" required>
            <Input />
          </Field>
        </Grid.Item>
      </Grid>
      <Button
        type="primary"
        onClick={() => {
          const form = getForm('form');
          form.submit();
        }}
      >
        Submit
      </Button>
    </Card>
  );
}
