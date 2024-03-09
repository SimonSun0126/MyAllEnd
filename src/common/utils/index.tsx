import pkg from '../../../package.json';
import {
  AppConfigKey,
  forceDev
} from './const';
import { defaultAppConfigState } from './const/state';
import { loadFromLocalStore, saveToLocalStore } from './localStore';
import { AppConfigState } from './types/state';

export function isDev() {
  if (forceDev) {
    return true;
  }
  return process.env.NODE_ENV === 'development';
}

export function getAppVersion() {
  try {
    return pkg.version;
  } catch {
    return '0.0.0';
  }
}

export function saveAppConfig(appConfig: AppConfigState) {
  saveToLocalStore(AppConfigKey, JSON.stringify(appConfig));
}

export function loadAppConfig(): Promise<AppConfigState> {
  return new Promise(resolve => {
    let appConfig = defaultAppConfigState;
    loadFromLocalStore(AppConfigKey)
      .then(configStr => {
        try {
          appConfig = JSON.parse(configStr);
          resolve(appConfig);
        } catch (error) {
          resolve(appConfig);
        }
      })
      .catch(() => {
        resolve(appConfig);
      });
  });
}
