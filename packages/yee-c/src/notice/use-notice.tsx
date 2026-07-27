import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  NoticeApi,
  NoticeType,
  PlacementType,
  WrapperedNoticeConfig,
} from './interface';
import NoticeList from './notice-list';

const invokeOnClose = (notices: NoticeType[]) => {
  const errors: unknown[] = [];

  notices.forEach((notice) => {
    try {
      notice.onClose?.();
    } catch (error) {
      errors.push(error);
    }
  });

  errors.forEach((error) => {
    const reportError = (
      globalThis as typeof globalThis & {
        reportError?: (reportedError: unknown) => void;
      }
    ).reportError;
    if (reportError) {
      reportError(error);
    } else {
      console.error(error);
    }
  });
};

const useNotice = () => {
  const [noticesByPlacement, setNoticesByPlacement] = useState<
    Map<PlacementType, NoticeType[]>
  >(new Map());
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  const noticesRef = useRef(new Map<PlacementType, NoticeType[]>());
  const generationByKey = useRef(new Map<string | number, number>());
  const generation = useRef(0);
  const timerGeneration = useRef(0);
  const autoKey = useRef(0);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  const updateNotices = useCallback(
    (
      updater: (
        current: Map<PlacementType, NoticeType[]>,
      ) => Map<PlacementType, NoticeType[]>,
    ) => {
      const nextNotices = updater(noticesRef.current);
      noticesRef.current = nextNotices;
      setNoticesByPlacement(nextNotices);
    },
    [],
  );

  const onDestroy = useCallback(
    (key: string | number, expectedTimerGeneration?: number) => {
      let target: NoticeType | undefined;
      noticesRef.current.forEach((items) => {
        target ??= items.find((item) => item.key === key);
      });

      if (
        !target ||
        (expectedTimerGeneration !== undefined &&
          target.timerGeneration !== expectedTimerGeneration)
      ) {
        return;
      }

      generationByKey.current.delete(key);
      updateNotices((current) => {
        const next = new Map(current);
        next.forEach((items, placement) => {
          const filtered = items.filter((item) => item.key !== key);
          if (filtered.length === 0) {
            next.delete(placement);
          } else if (filtered.length !== items.length) {
            next.set(placement, filtered);
          }
        });
        return next;
      });
      target.onClose?.();
    },
    [updateNotices],
  );

  const add = useCallback(
    (props: WrapperedNoticeConfig) => {
      const placement = props.placement ?? 'topRight';
      let key = props.key;
      if (key === undefined || key === null) {
        do {
          key = `__yee_notice_auto_${autoKey.current++}`;
        } while (generationByKey.current.has(key));
      }

      const keyGeneration =
        generationByKey.current.get(key) ?? generation.current++;
      generationByKey.current.set(key, keyGeneration);
      const nextNotice = {
        ...props,
        key,
        placement,
        timerGeneration: timerGeneration.current++,
      } as NoticeType;

      updateNotices((current) => {
        const next = new Map(current);
        let existingIndex = -1;

        next.forEach((items, currentPlacement) => {
          const index = items.findIndex((item) => item.key === key);
          if (index < 0) {
            return;
          }

          if (currentPlacement === placement) {
            existingIndex = index;
          } else {
            const filtered = items.filter((item) => item.key !== key);
            if (filtered.length === 0) {
              next.delete(currentPlacement);
            } else {
              next.set(currentPlacement, filtered);
            }
          }
        });

        const targetNotices = (next.get(placement) || []).filter(
          (item) => item.key !== key,
        );
        if (existingIndex >= 0) {
          targetNotices.splice(existingIndex, 0, nextNotice);
        } else {
          targetNotices.push(nextNotice);
        }
        next.set(placement, targetNotices);
        return next;
      });

      return () => {
        if (generationByKey.current.get(key) === keyGeneration) {
          onDestroy(key);
        }
      };
    },
    [onDestroy, updateNotices],
  );

  const clear = useCallback(
    (placement?: PlacementType) => {
      const removed = placement
        ? noticesRef.current.get(placement) || []
        : Array.from(noticesRef.current.values()).flat();

      removed.forEach((item) => generationByKey.current.delete(item.key));
      updateNotices((current) => {
        if (!placement) {
          return new Map();
        }
        const next = new Map(current);
        next.delete(placement);
        return next;
      });
      invokeOnClose(removed);
    },
    [updateNotices],
  );

  const noticeApi = useMemo<NoticeApi>(
    () => ({
      open: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'info' }
            : { status: 'info', ...props },
        ),
      success: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'success' }
            : { ...props, status: 'success' },
        ),
      error: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'error' }
            : { ...props, status: 'error' },
        ),
      warning: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'warning' }
            : { ...props, status: 'warning' },
        ),
      info: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'info' }
            : { ...props, status: 'info' },
        ),
      destroy: onDestroy,
      clear,
    }),
    [add, clear, onDestroy],
  );

  const noticeHolders = useMemo(() => {
    if (!portalContainer) {
      return [];
    }

    const holders: React.ReactPortal[] = [];
    noticesByPlacement.forEach((notices, placement) => {
      holders.push(
        createPortal(
          <NoticeList
            items={notices}
            placement={placement}
            onDestroy={onDestroy}
          />,
          portalContainer,
          `notice-${placement}`,
        ),
      );
    });
    return holders;
  }, [noticesByPlacement, onDestroy, portalContainer]);

  return { noticeApi, noticeHolders };
};

export default useNotice;
