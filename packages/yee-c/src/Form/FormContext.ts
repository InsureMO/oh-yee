import React from 'react';
import type { IFormContext } from './interface';

const FormContext = React.createContext<Partial<IFormContext>>({});

export default FormContext;
