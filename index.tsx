import i18n from '@/common/locales';
import { initPostFunction } from '@/common/utils/request';
import { postRequest } from './src/mobile/utils/request';
import { initLocalStoreFunction } from '@/common/utils/localStore';
import {
  loadFromLocalStore,
  saveToLocalStore,
} from '@/mobile/utils/localStore';
import { initFileFunction } from '@/common/utils/file';
import { loadFromFile, saveToFile } from '@/mobile/utils/file';
import { AppRegistry, NativeModules, Platform } from 'react-native';
import { name as appName } from './app.json';
import Pages from './src/mobile/pages/pages';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '@/common/redux/store';
import React from 'react';
import { Provider as AntdProvider } from '@ant-design/react-native';
import { DB } from '@/mobile/utils/db';
import { initDBClass } from '@/common/utils/db';
import { MainDbStruct, MainDbVersion } from '@/common/utils/const';
import { initCookiesFunction } from '@/common/utils/cookies';
import {
  loadAllCookies,
  loadFromCookies,
  saveAllCookies,
  saveToCookies,
} from '@/mobile/utils/cookies';
React.version;
(async () => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;
  i18n.changeLanguage(deviceLanguage.substring(0, 2));

  initLocalStoreFunction(saveToLocalStore, loadFromLocalStore);
  initCookiesFunction(
    saveToCookies,
    loadFromCookies,
    loadAllCookies,
    saveAllCookies,
  );
  await initDBClass(new DB(MainDbVersion, MainDbStruct));
  initFileFunction(saveToFile, loadFromFile);
  initPostFunction(postRequest);

  const App = () => (
    <Provider store={store}>
      <Pages />
    </Provider>
  );

  AppRegistry.registerComponent(appName, () => App);
})();
