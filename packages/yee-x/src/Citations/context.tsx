import React, { createContext, useContext, useMemo } from 'react';
import { CitationSource } from './interface';

export interface CitationsContextValue {
  sources: Array<CitationSource>;
  /** 0-based position of a source id, or -1 when unknown */
  indexOf: (id: string) => number;
}

const CitationsContext = createContext<CitationsContextValue | null>(null);

export const CitationsProvider: React.FC<{
  sources: Array<CitationSource>;
  children: React.ReactNode;
}> = ({ sources, children }) => {
  const value = useMemo<CitationsContextValue>(() => {
    const indexById = new Map<string, number>();
    sources.forEach((source, i) => {
      if (!indexById.has(source.id)) indexById.set(source.id, i);
    });
    return {
      sources,
      indexOf: (id: string) => indexById.get(id) ?? -1,
    };
  }, [sources]);

  return <CitationsContext.Provider value={value}>{children}</CitationsContext.Provider>;
};

export function useCitations(): CitationsContextValue | null {
  return useContext(CitationsContext);
}
