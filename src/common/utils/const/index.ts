// const constFunc
import i18next from 'i18next';
import { cloneDeep } from 'lodash';
const t = i18next.t;

export const forceDev = true;

export const UserNameKey = 'userName';
export const UserTokenKey = 'userToken';
export const AppConfigKey = 'appConfig';
export const mobileIconColor = 'rgba(89, 106, 123, 0.4)';

export const MainDbVersion = 3;

type MainDbStructType = {
  [key: string]: {
    keyPath: string;
  };
};

export const MainDbStruct: MainDbStructType = {
  configStore: { keyPath: 'key' }, // app config
};

type MainDbStructKeyType = {
  [key in keyof typeof MainDbStruct]: key;
};

export const MainDbStructKey: MainDbStructKeyType = {
  configStore: 'configStore', // app config
};
