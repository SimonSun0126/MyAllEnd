import { NetStatus, PageType } from '../types';
import {
  AppConfigState,
  AppDataState,
} from '../types/state';

export const defaultAppDataState: AppDataState = {
  nowPage: PageType.Main,
  allAreaHeight: -1,
  safeAreaHeight: -1,
  safeAreaTop: 0,
  isLogined: false,
  isNetEnable: NetStatus.Link,
};

export const defaultAppConfigState: AppConfigState = {
  isDark: false,
  isHideMode: false,
};
