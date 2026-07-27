import React, { createContext, useContext } from 'react';
import type { MessageApi } from './interface';
import useMessage from './use-message';

const MessageContext = createContext<MessageApi | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const { messageApi, messageHolder } = useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {messageHolder}
      {children}
    </MessageContext.Provider>
  );
}

export function useGlobalMessage(): MessageApi {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error('useGlobalMessage must be used within MessageProvider');
  }

  return context;
}
