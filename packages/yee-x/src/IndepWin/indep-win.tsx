import { useMount } from '@rainbow-oh/yee-c';
import { useCallback, useEffect, useRef } from 'react';
import { IndepWinProps } from './interface';

const extractOriginElementStyles = (
  document: Document,
  win: Window,
  { prefixCls }: { prefixCls?: string },
) => {
  const cls = prefixCls
    ? prefixCls.startsWith('.')
      ? prefixCls
      : `.${prefixCls}`
    : '';

  const style = document.createElement('style');
  style.textContent = `
  * {
    padding: 0;
    margin: 0;
  }
  `;
  win.document.head.appendChild(style);

  Array.from(document.styleSheets).forEach((styleSheet) => {
    try {
      const cssRules = Array.from(styleSheet.cssRules)
        .filter((rule) => !!(rule as any).selectorText)
        .filter((rule) => (rule as any).selectorText.startsWith(cls))
        .map((rule) => rule.cssText);
      if (cssRules.length) {
        const textCss = cssRules.join('\n');
        const style = document.createElement('style');
        style.textContent = textCss;
        win.document.head.appendChild(style);
      }
    } catch (e: any) {
      throw new Error(e);
      //   const link = document.createElement('link');
      //   link.rel = 'stylesheet';
      //   link.type = styleSheet.type;
      //   link.media = styleSheet.media;
      //   link.href = styleSheet.href ?? '';
      //   win.document.head.appendChild(link);
    }
  });
};

// Independent window (Picture-in-Picture)
const IndepWin = (props: IndepWinProps) => {
  const {
    element,
    id,
    keyboard,
    keyCode,
    width = 300,
    height = 500,
    open,
    extractPrefixCls,
    extractStyles,
    onOpenChange,
  } = props;

  const opened = useRef(false);

  const getElement = (
    element?: HTMLElement | (() => HTMLElement),
    id?: string,
  ) => {
    const ele = element
      ? typeof element === 'function'
        ? element()
        : element
      : id
      ? document.getElementById(id)
      : null;
    return ele;
  };

  const onOpen = useCallback(async () => {
    const ele = getElement(element, id);
    if ('documentPictureInPicture' in window) {
      const pipWindow = await (
        window as any
      ).documentPictureInPicture.requestWindow({
        width: width, // Window width
        height: height, // Window height
      });
      //   Clone the target node and append it to the PIP window (the original node would disappear otherwise)
      const cloned = ele?.cloneNode(true);
      pipWindow.document.body.appendChild(cloned);

      if (extractStyles) {
        extractStyles(document, pipWindow);
      } else {
        extractOriginElementStyles(document, pipWindow, {
          prefixCls: extractPrefixCls,
        });
      }

      // PIP exit event
      pipWindow.addEventListener('pagehide', () => {
        opened.current = false;
        onOpenChange?.(false);
      });
      opened.current = true;
    } else {
      console.warn(
        'Your browser does not support the PiP feature. Please update your browser.',
      );
    }

    onOpenChange?.(true);
  }, [element, id]);

  const onClose = useCallback(() => {
    (window as any).documentPictureInPicture.window.close();
    opened.current = false;
  }, []);

  useEffect(() => {
    if (typeof open !== 'boolean') {
      return;
    }
    if (open) {
      onOpen();
    } else if (opened.current) {
      onClose();
    }
  }, [open]);

  useMount(() => {
    if (keyboard) {
      document.addEventListener('keydown', (e) => {
        if (e.key === keyCode) {
          onOpen();
        }
        if (e.key === 'Escape' && opened.current) {
          onClose();
        }
      });
    }
  });

  return null;
};

export default IndepWin;
