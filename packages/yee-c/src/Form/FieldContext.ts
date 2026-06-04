import { createContext } from 'react';
import type { FormInstance } from './interface';

const FieldContext = createContext<FormInstance>({} as FormInstance);

export default FieldContext;
