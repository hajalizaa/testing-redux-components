import type { RootState, Store } from '@redux';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useStore as useReduxStore
} from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useStore: () => Store = useReduxStore;
