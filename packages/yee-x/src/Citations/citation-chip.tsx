import { Popover } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';
import { useCitations } from './context';
import { CitationChipProps, CitationSource } from './interface';
import SourcePreview from './source-preview';
import './style/index.less';

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Inline numbered citation chip. Place inside a `CitationsProvider` and pass
 * `sourceId`, or pass `source` directly. Typically wired into a Markdown
 * renderer through its component overrides.
 */
const CitationChip = (props: CitationChipProps) => {
  const {
    prefixCls = 'yee-citation-chip',
    className,
    style,
    sourceId,
    source: sourceProp,
    index: indexProp,
    onClick,
    children,
    ...rest
  } = props;

  const context = useCitations();

  const resolved = useMemo(() => {
    if (sourceProp) {
      return {
        source: sourceProp,
        index: indexProp ?? 1,
      };
    }
    if (context && sourceId) {
      const i = context.indexOf(sourceId);
      if (i >= 0) {
        return {
          source: context.sources[i],
          index: indexProp ?? i + 1,
        };
      }
    }
    return null;
  }, [sourceProp, context, sourceId, indexProp]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!resolved) return;
      const source: CitationSource = resolved.source;
      if (onClick) {
        onClick(source, resolved.index);
      } else if (source.url) {
        openUrl(source.url);
      }
    },
    [resolved, onClick],
  );

  if (!resolved) {
    return null;
  }

  const { source, index } = resolved;

  return (
    <Popover content={<SourcePreview source={source} />}>
      <a
        className={clsx(prefixCls, className)}
        style={style}
        href={source.url}
        target={source.url ? '_blank' : undefined}
        rel="noopener noreferrer"
        data-citation-id={source.id}
        aria-label={`Citation ${index}`}
        onClick={handleClick}
        {...rest}
      >
        {children ?? index}
      </a>
    </Popover>
  );
};

export default CitationChip;
