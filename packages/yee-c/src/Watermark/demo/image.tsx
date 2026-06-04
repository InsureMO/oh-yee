import React from 'react';
import { Watermark } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <Watermark
      image="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAxMjAgNjQiPjx0ZXh0IHg9IjYwIiB5PSIzMiIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Nb28gRGVzaWduPC90ZXh0Pjwvc3ZnPg=="
      width={120}
      height={64}
      gapX={100}
      gapY={50}
    >
      <div style={{ height: 500, padding: 20, background: '#f5f5f5' }}>
        <h2>Image Watermark</h2>
        <p>This is a container with an image watermark.</p>
        <p>You can use SVG or other image formats as watermarks.</p>
      </div>
    </Watermark>
  );
};
