import React from 'react';
import { GlobalCtxType } from './interface';

const GlobalContext = React.createContext<GlobalCtxType>({});

export default GlobalContext;
