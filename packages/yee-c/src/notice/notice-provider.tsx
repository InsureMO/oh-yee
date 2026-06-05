import React, { createContext, useContext } from 'react';
import useNotice from './use-notice';

const NoticeContext = createContext<any>({});

export function NoticeProvider({ children }: { children: React.ReactNode }) {
  const { noticeApi, noticeHolders } = useNotice();

  return (
    <NoticeContext.Provider value={noticeApi}>
      {noticeHolders}
      {children}
    </NoticeContext.Provider>
  );
}

export function useGlobalNotice() {
  const context = useContext(NoticeContext);

  if (context === undefined) {
    throw new Error('useGlobalNotice must be used within NoticeProvider');
  }

  return context;
}
