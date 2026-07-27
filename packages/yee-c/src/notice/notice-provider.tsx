import React, { createContext, useContext } from 'react';
import type { NoticeApi } from './interface';
import useNotice from './use-notice';

const NoticeContext = createContext<NoticeApi | undefined>(undefined);

export function NoticeProvider({ children }: { children: React.ReactNode }) {
  const { noticeApi, noticeHolders } = useNotice();

  return (
    <NoticeContext.Provider value={noticeApi}>
      {noticeHolders}
      {children}
    </NoticeContext.Provider>
  );
}

export function useGlobalNotice(): NoticeApi {
  const context = useContext(NoticeContext);

  if (context === undefined) {
    throw new Error('useGlobalNotice must be used within NoticeProvider');
  }

  return context;
}
