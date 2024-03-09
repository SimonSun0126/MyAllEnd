import { createSlice } from '@reduxjs/toolkit';
import { defaultAppDataState } from '../../utils/const/state';
import { AppDataState } from '../../utils/types/state';
import _ from 'lodash';

const appDataSlice = createSlice({
  name: 'appData',
  initialState: defaultAppDataState,
  reducers: {
    setAppData(
      state: AppDataState,
      action: { payload: Partial<AppDataState> },
    ) {
      return { ...state, ...action.payload };
    },
  },
});
export const appDataReducer = appDataSlice.reducer;
export const { setAppData } = appDataSlice.actions;
export default appDataSlice;
