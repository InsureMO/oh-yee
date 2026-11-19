import { ExternalLink } from 'lucide-react';
import React from 'react';
import { CitationSource } from './interface';

/** Hover preview of one source, shared by cards and chips */
const SourcePreview: React.FC<{
  source: CitationSource;
  prefixCls?: string;
}> = ({ source, prefixCls = 'yee-citations' }) => {
  return (
    <div className={`${prefixCls}-preview`}>
      <div className={`${prefixCls}-preview-head`}>
        <span className={`${prefixCls}-preview-title`}>{source.title ?? source.id}</span>
        {source.url && <ExternalLink size={12} />}
      </div>
      {source.meta && (
        <div className={`${prefixCls}-preview-meta`}>{source.meta}</div>
      )}
      {source.snippet && (
        <div className={`${prefixCls}-preview-snippet`}>{source.snippet}</div>
      )}
      {source.quote && (
        <blockquote className={`${prefixCls}-preview-quote`}>{source.quote}</blockquote>
      )}
    </div>
  );
};

export default SourcePreview;
