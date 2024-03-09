import { createSlice } from '@reduxjs/toolkit';
import { AppConfigState } from '@/common/utils/types/state';
import { saveAppConfig } from '@/common/utils';
import { defaultAppConfigState } from '@/common/utils/const/state';

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState: defaultAppConfigState,
  reducers: {
    setAppConfig(
      state: AppConfigState,
      action: { payload: Partial<AppConfigState> },
    ) {
      const newAppConfig = { ...state, ...action.payload };
      saveAppConfig(newAppConfig);
      return newAppConfig;
    },
    setIsDark(state: AppConfigState, action: { payload: boolean }) {
      const newAppConfig = { ...state, isDark: action.payload };
      saveAppConfig(newAppConfig);
      return newAppConfig;
    },
  },
});

export const appConfigReducer = appConfigSlice.reducer;
export const { setAppConfig, setIsDark } = appConfigSlice.actions;
export default appConfigSlice;
