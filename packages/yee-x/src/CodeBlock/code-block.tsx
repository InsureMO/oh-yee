import { Button } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import { Check, Copy } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import rehypeHighlight from 'rehype-highlight';
import Markdown from '../Markdown';
import { CodeBlockProps } from './interface';

import './style/index.less';

const CodeDisplay = (props: CodeBlockProps) => {
  const {
    prefixCls = 'yee-codeblock',
    className,
    classNames,
    styles,
    code,
    language,
    renderActions,
  } = props;

  const [pureCode, setPureCode] = useState('');
  const [copyed, setCopyed] = useState(false);
  const [lang, setLanguage] = useState<string>(language || '');

  const extract = (code: string) => {
    const regexp = /(?:```|~~~)(\w+)?\n([\s\S]*?)(?:```|~~~)/g;
    const match = regexp.exec(code);
    if (match) {
      const [, language, pureCode] = match;
      return [language, pureCode];
    }
  };

  useEffect(() => {
    if (typeof code !== 'string') return;
    const result = extract(code);
    if (result) {
      setLanguage(result[0]);
      setPureCode(result[1]);
    } else {
      setPureCode(code);
    }
  }, [code]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(pureCode);
      setCopyed(true);
      setTimeout(() => {
        setCopyed(false);
      }, 10000);
    } catch {
      // Clipboard API not available
    }
  };

  let _code = code;

  if (typeof code === 'string') {
    const t = code.trim();
    if (!t.startsWith('```') && !t.startsWith('~~~')) {
      _code = '```' + (language ?? '') + '\n' + code + '\n```';
    }
  }

  return (
    <div className={clsx(prefixCls, className)}>
      <div
        className={clsx(`${prefixCls}-header`, classNames?.header)}
        style={styles?.header}
      >
        <span className={`${prefixCls}-language`}>{lang}</span>
        <div className={`${prefixCls}-header-actions`}>
          {renderActions
            ? renderActions({ language: lang, code: pureCode })
            : null}
          <Button
            icon={
              copyed ? (
                <Check size={16} strokeWidth={1.5} />
              ) : (
                <Copy size={16} strokeWidth={1.5} />
              )
            }
            variant="text"
            color={copyed ? 'success' : 'info'}
            onClick={onCopy}
          />
        </div>
      </div>
      <div
        className={clsx(`${prefixCls}-content`, classNames?.content)}
        style={styles?.content}
      >
        {typeof _code === 'string' ? (
          <Markdown markdown={_code} rehypePlugins={[rehypeHighlight]} />
        ) : (
          _code
        )}
      </div>
    </div>
  );
};

export default React.memo(CodeDisplay);
