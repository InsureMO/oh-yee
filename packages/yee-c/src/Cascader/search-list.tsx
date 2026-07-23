import React from 'react';
import type { FlattenOption } from './interface';

export interface SearchHighlightMatch {
  text: string;
  highlight: boolean;
}

export interface SearchListItem {
  matches: SearchHighlightMatch[];
  data: FlattenOption;
}

export interface SearchListProps {
  prefixCls: string;
  items: SearchListItem[];
  onClick: (item: FlattenOption) => void;
}

const renderHighlightText = (matches: SearchHighlightMatch[]) => {
  return matches.map((match, index) => (
    <span
      key={index}
      className={match.highlight ? 'yee-high-light' : undefined}
    >
      {match.text}
    </span>
  ));
};

const SearchList = (props: SearchListProps) => {
  const { prefixCls, items, onClick } = props;

  return (
    <ul className={`${prefixCls}-filter-menu`} role="listbox" aria-label="Search results">
      {items.length ? (
        items.map((item) => {
          const title = item.data.$source?.title || item.data.labelPath.join(' / ');

          return (
            <li
              className={`${prefixCls}-filter-menu-item`}
              title={typeof title === 'string' ? title : String(title)}
              onClick={() => onClick(item.data)}
              key={item.data.uid}
              role="option"
              aria-disabled={item.data.$source?.disabled || undefined}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick(item.data);
                }
              }}
            >
              {renderHighlightText(item.matches)}
            </li>
          );
        })
      ) : (
        <li role="option" aria-disabled="true">{'No result'}</li>
      )}
    </ul>
  );
};

export default React.memo(SearchList);
