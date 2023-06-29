import { ReactNode } from 'react';
import { render as tRender } from '@testing-library/react';

import { withStore } from './withStore';

export interface IRender {
  component: ReactNode;
  reduxData?: any;
}

export const render = ({ component, reduxData = {} }: IRender) => {
  return tRender(withStore(component, reduxData));
};
