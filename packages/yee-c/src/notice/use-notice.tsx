import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NoticeConfig, NoticeType, WrapperedNoticeConfig } from './interface';
import NoticeList from './notice-list';

type PlacementType =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'bottom';

const useNotice = () => {
  const [noticesByPlacement, setNoticesByPlacement] = useState<
    Map<PlacementType, NoticeType[]>
  >(new Map());
  const count = useRef(0);

  const add = useCallback((props: WrapperedNoticeConfig) => {
    const placement = props.placement || 'topRight';
    const id = count.current++;

    setNoticesByPlacement((prev) => {
      const newMap = new Map(prev);
      const notices = newMap.get(placement) || [];
      newMap.set(placement, [...notices, { key: id, ...props }]);
      return newMap;
    });
  }, []);

  const onDestroy = (key: string | number, placement: PlacementType) => {
    setNoticesByPlacement((prev) => {
      const newMap = new Map(prev);
      const notices = newMap.get(placement) || [];
      const filtered = notices.filter((notice) => notice.key !== key);

      if (filtered.length === 0) {
        newMap.delete(placement);
      } else {
        newMap.set(placement, filtered);
      }

      return newMap;
    });
  };

  const noticeApi = {
    open: (props: string | NoticeConfig) => {
      add(
        typeof props === 'string'
          ? { content: props, status: 'info' }
          : { status: 'info', ...props },
      );
    },
    success: (props: string | NoticeConfig) => {
      add(
        typeof props === 'string'
          ? { content: props, status: 'success' }
          : { ...props, status: 'success' },
      );
    },
    error: (props: string | NoticeConfig) => {
      add(
        typeof props === 'string'
          ? { content: props, status: 'error' }
          : { ...props, status: 'error' },
      );
    },
    warning: (props: string | NoticeConfig) => {
      add(
        typeof props === 'string'
          ? { content: props, status: 'warning' }
          : { ...props, status: 'warning' },
      );
    },
    info: (props: string | NoticeConfig) => {
      add(
        typeof props === 'string'
          ? { content: props, status: 'info' }
          : { ...props, status: 'info' },
      );
    },
    destroy: (key: string | number) => {
      setNoticesByPlacement((prev) => {
        const newMap = new Map(prev);

        // Find and remove in all placements
        newMap.forEach((notices, placement) => {
          const filtered = notices.filter((notice) => notice.key !== key);
          if (filtered.length === 0) {
            newMap.delete(placement);
          } else if (filtered.length !== notices.length) {
            newMap.set(placement, filtered);
          }
        });

        return newMap;
      });
    },
    clear: (placement?: PlacementType) => {
      if (placement) {
        setNoticesByPlacement((prev) => {
          const newMap = new Map(prev);
          newMap.delete(placement);
          return newMap;
        });
      } else {
        setNoticesByPlacement(new Map());
      }
    },
  };

  const noticeHolders = React.useMemo(() => {
    const holders: React.ReactPortal[] = [];
    noticesByPlacement.forEach((notices, placement) => {
      holders.push(
        createPortal(
          <NoticeList
            items={notices}
            placement={placement}
            onDestroy={(key) => onDestroy(key, placement)}
          />,
          document.body,
          `notice-${placement}`,
        ),
      );
    });
    return holders;
  }, [noticesByPlacement]);

  return { noticeApi, noticeHolders };
};

export default useNotice;
