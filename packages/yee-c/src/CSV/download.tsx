import dayjs from 'dayjs';
import React from 'react';
import Button from '../Button';
import { buildURI, toCSV } from './utils';

import type { CSVDownloderProps } from './interface';

const Link = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CSVDownloderProps
>((props, ref) => {
  const {
    type = 'link',
    filename = dayjs().format('YYYYMMDDHHmmss'),
    data,
    uFEFF,
    headers,
    separator,
    enclosingCharacter,
    children,
    onClick,
    asyncOnClick,
    ...rest
  } = props;

  const isNodeEnvironment = typeof window === 'undefined';

  const handled = typeof data === 'function' ? data() : data;

  const href = isNodeEnvironment
    ? ''
    : buildURI(handled, uFEFF, headers, separator, enclosingCharacter);

  const handleLegacy = (
    event: React.MouseEvent<HTMLElement>,
    // isAsync = false,
  ) => {
    // If this browser is IE 11, it does not support the `download` attribute
    if ((window.navigator as any).msSaveOrOpenBlob) {
      // Stop the click propagation
      event.preventDefault();

      const { data, headers, separator, filename, enclosingCharacter, uFEFF } =
        props;

      const csvData = typeof data === 'function' ? data() : data;

      let blob = new Blob([
        uFEFF ? '\uFEFF' : '',
        toCSV(csvData, headers, separator, enclosingCharacter),
      ]);
      (window.navigator as any)?.msSaveBlob(blob, filename);

      return false;
    }
  };

  const handleAsyncClick = (event: React.MouseEvent<HTMLElement>) => {
    const done = (proceed: boolean) => {
      if (proceed === false) {
        event.preventDefault();
        return;
      }
      handleLegacy(event);
    };

    asyncOnClick?.(event, done);
  };

  const handleSyncClick = (event: React.MouseEvent<HTMLElement>) => {
    const stopEvent = onClick?.(event) === false;
    if (stopEvent) {
      event.preventDefault();
      return;
    }
    handleLegacy(event);
  };

  const handleClick = () => {
    return (event: React.MouseEvent<HTMLElement>) => {
      if (typeof onClick === 'function') {
        return asyncOnClick ? handleAsyncClick(event) : handleSyncClick(event);
      }
      handleLegacy(event);
    };
  };

  return (
    <Button
      type={type}
      download={filename}
      {...rest}
      ref={ref}
      target="_self"
      href={href}
      onClick={handleClick()}
    >
      {children}
    </Button>
  );
});

export default Link;
