import { RootState } from '@redux';
import rootReducer from '@redux/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Provider } from 'react-redux';

export let testStore: ToolkitStore<RootState>;

const makeStore = (state: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: state,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: false,
        serializableCheck: false
      });
    }
  });
};

export const withStore = (component: any, initialState: any) => {
  testStore = makeStore(initialState);

  return <Provider store={testStore}>{component}</Provider>;
};
