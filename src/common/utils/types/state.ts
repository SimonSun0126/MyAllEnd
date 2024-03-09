import { NetStatus, PageType } from '.';

export interface Store {
  appDataState: AppDataState;
  appConfigState: AppConfigState;
}

export interface AppConfigState {
  isDark: boolean;
  isHideMode: boolean;
}

export interface AppDataState {
  isNetEnable: NetStatus;
  isLogined: boolean;
  nowPage: PageType;
  allAreaHeight: number;
  safeAreaHeight: number;
  safeAreaTop: number;
}
