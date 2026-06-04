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
    <ul className={`${prefixCls}-filter-menu`}>
      {items.length ? (
        items.map((item) => {
          const title = item.data.title || item.data.label;

          return (
            <li
              className={`${prefixCls}-filter-menu-item`}
              title={typeof title === 'string' ? title : String(title)}
              onClick={() => onClick(item.data)}
              key={item.data.uid}
            >
              {renderHighlightText(item.matches)}
            </li>
          );
        })
      ) : (
        <p>{'No result'}</p>
      )}
    </ul>
  );
};

export default React.memo(SearchList);
