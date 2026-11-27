import { Download, Eye } from 'lucide-react';
import React, { FC, useMemo } from 'react';
import type {
  ArtifactCardGroupProps,
  ArtifactCardProps,
} from './interface';

import './style/index.less';

/** Extension → tint for the default document glyph. */
const EXT_COLORS: Record<string, string> = {
  md: '#805AD5',
  markdown: '#805AD5',
  pdf: '#E53E3E',
  doc: '#2B6CB0',
  docx: '#2B6CB0',
  xls: '#2F855A',
  xlsx: '#2F855A',
  csv: '#2F855A',
  ppt: '#C05621',
  pptx: '#C05621',
  json: '#D69E2E',
};

const DEFAULT_COLOR = '#718096';

const DefaultIcon: FC<{ fileName?: string }> = ({ fileName }) => {
  const ext = fileName?.toLowerCase().split('.').pop();
  const color = (ext && EXT_COLORS[ext]) || DEFAULT_COLOR;
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z"
        fill={color}
        opacity="0.12"
      />
      <path
        d="M14 2l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ArtifactCard: FC<ArtifactCardProps> = (props) => {
  const {
    prefixCls = 'yee-artifact-card',
    className,
    style,
    title,
    fileName,
    description,
    icon,
    actions,
    onPreview,
    onDownload,
    onClick,
    locale = {},
  } = props;

  const previewText = locale.preview ?? 'View';
  const downloadText = locale.download ?? 'Download';

  const renderActions = () => {
    if (actions !== undefined && actions !== null) return actions;
    return (
      <div className={`${prefixCls}-actions`}>
        {onPreview && (
          <span
            className={`${prefixCls}-action ${prefixCls}-action-preview`}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
          >
            <Eye size={15} strokeWidth={1.6} />
            {previewText}
          </span>
        )}
        {onDownload && (
          <span
            className={`${prefixCls}-action ${prefixCls}-action-download`}
            role="button"
            tabIndex={0}
            aria-label={downloadText}
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
          >
            <Download size={15} strokeWidth={1.6} />
          </span>
        )}
      </div>
    );
  };

  const cls = [
    prefixCls,
    onClick ? `${prefixCls}-clickable` : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={cls}
      style={style}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick ? () => onClick() : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter') onClick();
            }
          : undefined
      }
    >
      <div className={`${prefixCls}-icon`} aria-hidden="true">
        {icon ?? <DefaultIcon fileName={fileName} />}
      </div>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-title-line`}>
          <span className={`${prefixCls}-title`}>{title}</span>
          {fileName !== undefined && fileName !== null && (
            <span className={`${prefixCls}-file-name`}>{fileName}</span>
          )}
        </div>
        {description !== undefined && description !== null && (
          <div className={`${prefixCls}-desc`}>{description}</div>
        )}
      </div>
      {renderActions()}
    </div>
  );
};

const ArtifactCardGroup: FC<ArtifactCardGroupProps> = ({
  prefixCls = 'yee-artifact-card',
  className,
  style,
  title,
  count,
  items,
}) => {
  const itemsArr = Array.isArray(items) ? items : [];
  const badge = count ?? itemsArr.length;
  const listNode = useMemo(
    () =>
      itemsArr.map(({ key, ...cardProps }, index) => (
        <ArtifactCard
          {...cardProps}
          key={key ?? index}
          prefixCls={cardProps.prefixCls ?? prefixCls}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemsArr, prefixCls],
  );

  return (
    <div
      className={`${prefixCls}-group${className ? ` ${className}` : ''}`}
      style={style}
    >
      {((title !== undefined && title !== null) || badge > 0) && (
        <div className={`${prefixCls}-group-head`}>
          {title !== undefined && title !== null && (
            <span className={`${prefixCls}-group-title`}>{title}</span>
          )}
          {badge > 0 && (
            <span className={`${prefixCls}-group-count`}>{badge}</span>
          )}
        </div>
      )}
      <div className={`${prefixCls}-group-list`}>{listNode}</div>
    </div>
  );
};

type ArtifactCardComponent = FC<ArtifactCardProps> & {
  Group: FC<ArtifactCardGroupProps>;
};

const ArtifactCardWithGroup = ArtifactCard as ArtifactCardComponent;
ArtifactCardWithGroup.Group = ArtifactCardGroup;

export default ArtifactCardWithGroup;
