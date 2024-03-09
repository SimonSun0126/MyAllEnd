import { configureStore } from '@reduxjs/toolkit';
import { appConfigReducer } from './state/appConfig';
import { appDataReducer } from './state/appData';

export const store = configureStore({
  reducer: {
    appConfigState: appConfigReducer,
    appDataState: appDataReducer,
  },
});

store.subscribe(() => console.log('【data】', store.getState()));

export default store;
