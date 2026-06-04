import React, { useState } from 'react';
import { Button, ImageViewer } from '@oh/yee-c';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Image Popup</Button>
      <ImageViewer.Popup
        open={open}
        onClose={() => setOpen(false)}
      >
        <ImageViewer src="https://picsum.photos/id/10/1200/800" />
      </ImageViewer.Popup>
    </>
  );
};
