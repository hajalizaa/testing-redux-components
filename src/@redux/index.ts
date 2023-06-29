import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  // devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false,
      serializableCheck: false
    });
  }
});

export type Store = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
