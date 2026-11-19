import { Tooltip } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  RotateCw,
  Square,
  ThumbsDown,
  ThumbsUp,
  Volume2,
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { copyText } from '../utils/clipboard';
import {
  MessageActionFeedback,
  MessageActionsLocale,
  MessageActionsProps,
  MessageActionsSemanticType,
} from './interface';
import './style/index.less';

const COPY_RESET_DELAY = 2000;

const defaultLocale: Required<MessageActionsLocale> = {
  copy: 'Copy',
  copied: 'Copied',
  regenerate: 'Regenerate',
  like: 'Like',
  dislike: 'Dislike',
  readAloud: 'Read aloud',
  stop: 'Stop',
  prevVersion: 'Previous version',
  nextVersion: 'Next version',
};

const ActionButton: React.FC<{
  prefixCls: string;
  classNames?: Partial<Record<MessageActionsSemanticType, string>>;
  styles?: Partial<Record<MessageActionsSemanticType, React.CSSProperties>>;
  title: string;
  disabled?: boolean;
  active?: boolean;
  spin?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}> = ({
  prefixCls,
  classNames,
  styles,
  title,
  disabled,
  active,
  spin,
  onClick,
  children,
}) => {
  const button = (
    <button
      type="button"
      className={clsx(`${prefixCls}-item`, active && 'active', classNames?.item)}
      style={styles?.item}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={clsx(`${prefixCls}-item-icon`, spin && 'spin', classNames?.['item-icon'])}
        style={styles?.['item-icon']}
      >
        {children}
      </span>
    </button>
  );

  // disabled buttons swallow pointer events, so the tooltip needs a wrapper
  return <Tooltip title={title}>{disabled ? <span className={`${prefixCls}-item-wrap`}>{button}</span> : button}</Tooltip>;
};

const MessageActions = (props: MessageActionsProps) => {
  const {
    prefixCls = 'yee-message-actions',
    className,
    style,
    classNames,
    styles,
    text,
    onCopy,
    regenerating = false,
    onRegenerate,
    version: versionProp,
    defaultVersion = 1,
    total,
    onVersionChange,
    feedback: feedbackProp,
    defaultFeedback,
    onFeedbackChange,
    onReadAloud,
    speaking: speakingProp,
    extra,
    locale: localeProp,
  } = props;

  const locale = { ...defaultLocale, ...localeProp };
  const rootCls = clsx(prefixCls, className);

  // ---- copy ----
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    let ok = true;
    // an explicit text (even '') is copied internally; '' fails the write
    if (text !== undefined && text !== null) {
      ok = await copyText(text);
    }
    if (ok) {
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), COPY_RESET_DELAY);
    }
    onCopy?.(text, ok);
  }, [text, onCopy]);

  const showCopy = Boolean(text || onCopy);

  // ---- version switcher ----
  const [innerVersion, setInnerVersion] = useState(defaultVersion);
  const currentVersion = versionProp ?? innerVersion;
  const showVersions = Boolean(total && total > 1);

  const goVersion = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 1), total ?? 1);
      if (clamped === currentVersion) return;
      setInnerVersion(clamped);
      onVersionChange?.(clamped);
    },
    [currentVersion, total, onVersionChange],
  );

  // ---- feedback ----
  const [innerFeedback, setInnerFeedback] = useState<MessageActionFeedback | undefined>(
    defaultFeedback,
  );
  const feedback = feedbackProp ?? innerFeedback;

  const toggleFeedback = useCallback(
    (value: MessageActionFeedback) => {
      const next = feedback === value ? undefined : value;
      setInnerFeedback(next);
      onFeedbackChange?.(next);
    },
    [feedback, onFeedbackChange],
  );

  // ---- read aloud ----
  const [innerSpeaking, setInnerSpeaking] = useState(false);
  const speaking = speakingProp ?? innerSpeaking;

  const toggleSpeaking = useCallback(() => {
    const next = !speaking;
    setInnerSpeaking(next);
    onReadAloud?.(next);
  }, [speaking, onReadAloud]);

  return (
    <div className={rootCls} style={style}>
      {showCopy && (
        <ActionButton
          prefixCls={prefixCls}
          classNames={classNames}
          styles={styles}
          title={copied ? locale.copied : locale.copy}
          onClick={handleCopy}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </ActionButton>
      )}

      {onRegenerate && (
        <ActionButton
          prefixCls={prefixCls}
          classNames={classNames}
          styles={styles}
          title={locale.regenerate}
          disabled={regenerating}
          spin={regenerating}
          onClick={onRegenerate}
        >
          <RotateCw size={15} />
        </ActionButton>
      )}

      {showVersions && (
        <div className={`${prefixCls}-version`} style={styles?.version}>
          <ActionButton
            prefixCls={prefixCls}
            classNames={classNames}
            styles={styles}
            title={locale.prevVersion}
            disabled={currentVersion <= 1}
            onClick={() => goVersion(currentVersion - 1)}
          >
            <ChevronLeft size={15} />
          </ActionButton>
          <span
            className={clsx(`${prefixCls}-version-text`, classNames?.['version-text'])}
            style={styles?.['version-text']}
          >
            {currentVersion}/{total}
          </span>
          <ActionButton
            prefixCls={prefixCls}
            classNames={classNames}
            styles={styles}
            title={locale.nextVersion}
            disabled={currentVersion >= (total ?? 1)}
            onClick={() => goVersion(currentVersion + 1)}
          >
            <ChevronRight size={15} />
          </ActionButton>
        </div>
      )}

      {onFeedbackChange && (
        <>
          <ActionButton
            prefixCls={prefixCls}
            classNames={classNames}
            styles={styles}
            title={locale.like}
            active={feedback === 'like'}
            onClick={() => toggleFeedback('like')}
          >
            <ThumbsUp size={15} />
          </ActionButton>
          <ActionButton
            prefixCls={prefixCls}
            classNames={classNames}
            styles={styles}
            title={locale.dislike}
            active={feedback === 'dislike'}
            onClick={() => toggleFeedback('dislike')}
          >
            <ThumbsDown size={15} />
          </ActionButton>
        </>
      )}

      {onReadAloud && (
        <ActionButton
          prefixCls={prefixCls}
          classNames={classNames}
          styles={styles}
          title={speaking ? locale.stop : locale.readAloud}
          active={speaking}
          onClick={toggleSpeaking}
        >
          {speaking ? <Square size={15} /> : <Volume2 size={15} />}
        </ActionButton>
      )}

      {extra && (
        <div
          className={clsx(`${prefixCls}-extra`, classNames?.extra)}
          style={styles?.extra}
        >
          {extra}
        </div>
      )}
    </div>
  );
};

export default MessageActions;
