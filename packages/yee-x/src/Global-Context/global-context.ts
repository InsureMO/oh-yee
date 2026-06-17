import { createContext } from 'react';
import { GlobalContextType } from './interface';

const GlobalContext = createContext<GlobalContextType>({});

export default GlobalContext;
