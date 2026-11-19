import { Popover } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import { Globe, FileText } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCitations } from './context';
import { CitationSource, CitationsLocale, CitationsProps } from './interface';
import SourcePreview from './source-preview';
import './style/index.less';

const defaultLocale: Required<CitationsLocale> = {
  sources: 'Sources',
  more: '+{count} more',
};

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

export const CitationCard: React.FC<{
  source: CitationSource;
  index: number;
  prefixCls: string;
  onClick?: (source: CitationSource, index: number) => void;
}> = ({ source, index, prefixCls, onClick }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (onClick) {
        onClick(source, index);
      } else if (source.url) {
        openUrl(source.url);
      }
    },
    [onClick, source, index],
  );

  return (
    <Popover content={<SourcePreview source={source} prefixCls={prefixCls} />}>
      <a
        className={`${prefixCls}-source`}
        href={source.url}
        target={source.url ? '_blank' : undefined}
        rel="noopener noreferrer"
        data-citation-id={source.id}
        onClick={handleClick}
      >
        <span className={`${prefixCls}-source-icon`}>
          {source.icon ?? (source.url ? <Globe size={14} /> : <FileText size={14} />)}
        </span>
        <span className={`${prefixCls}-source-main`}>
          <span className={`${prefixCls}-source-title`}>{source.title ?? source.id}</span>
          {source.meta && (
            <span className={`${prefixCls}-source-meta`}>{source.meta}</span>
          )}
        </span>
        <span className={`${prefixCls}-source-index`}>{index + 1}</span>
      </a>
    </Popover>
  );
};

const Citations = (props: CitationsProps) => {
  const {
    prefixCls = 'yee-citations',
    className,
    style,
    classNames,
    styles,
    sources: sourcesProp,
    layout = 'card',
    maxVisible,
    onSourceClick,
    showLabel = false,
    locale: localeProp,
  } = props;

  const locale = useMemo(() => ({ ...defaultLocale, ...localeProp }), [localeProp]);
  const context = useCitations();
  const sources = sourcesProp ?? context?.sources ?? [];

  const [expanded, setExpanded] = useState(false);

  // a new sources list (e.g. a different chat message) starts folded again
  const sourcesKey = sources.map((s) => s.id).join('\n');
  useEffect(() => {
    setExpanded(false);
  }, [sourcesKey]);

  const visible = useMemo(() => {
    if (maxVisible === undefined || expanded || maxVisible >= sources.length) {
      return sources;
    }
    return sources.slice(0, maxVisible);
  }, [sources, maxVisible, expanded]);

  const hiddenCount = sources.length - visible.length;

  const moreText = locale.more.replace('{count}', String(hiddenCount));

  const renderSource = (source: CitationSource, i: number) => {
    if (layout === 'chip') {
      return (
        <Popover content={<SourcePreview source={source} prefixCls={prefixCls} />}>
          <a
            className={`${prefixCls}-chip`}
            href={source.url}
            target={source.url ? '_blank' : undefined}
            rel="noopener noreferrer"
            data-citation-id={source.id}
            aria-label={typeof source.title === 'string' ? source.title : `Source ${i + 1}`}
            onClick={(e) => {
              e.preventDefault();
              if (onSourceClick) {
                onSourceClick(source, i);
              } else if (source.url) {
                openUrl(source.url);
              }
            }}
          >
            {i + 1}
          </a>
        </Popover>
      );
    }
    return (
      <CitationCard
        key={`${source.id}-${i}`}
        source={source}
        index={i}
        prefixCls={prefixCls}
        onClick={onSourceClick}
      />
    );
  };

  if (!sources.length) {
    return null;
  }

  return (
    <div
      className={clsx(prefixCls, `${prefixCls}-${layout}`, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {showLabel && (
        <div className={`${prefixCls}-label`}>{locale.sources}</div>
      )}
      <div
        className={clsx(`${prefixCls}-list`, classNames?.list)}
        style={styles?.list}
      >
        {visible.map((source, i) => (
          <React.Fragment key={`${source.id}-${i}`}>{renderSource(source, i)}</React.Fragment>
        ))}
        {hiddenCount > 0 && (
          <button
            type="button"
            className={clsx(`${prefixCls}-overflow`, classNames?.overflow)}
            style={styles?.overflow}
            onClick={() => setExpanded(true)}
          >
            {moreText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Citations;
