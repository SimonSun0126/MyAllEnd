import i18n from '@/common/locales';
import store from '@/common/redux/store';
import { initPostFunction } from '@/common/utils/request';
import { postRequest } from '@/pc/utils/request';
import { initLocalStoreFunction } from '@/common/utils/localStore';
import { loadFromLocalStore, saveToLocalStore } from '@/pc/utils/localStore';
import { initFileFunction } from '@/common/utils/file';
import { loadFromFile, saveToFile } from '@/pc/utils/file';
import App from '@/pc/pages';
import { addErrorListener } from '@/pc/utils';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { initDBClass } from '@/common/utils/db';
import { DB } from '@/pc/utils/db';
import { MainDbStruct, MainDbVersion } from '@/common/utils/const';
import { initCookiesFunction } from '@/common/utils/cookies';
import {
  loadAllCookies,
  loadFromCookies,
  saveAllCookies,
  saveToCookies,
} from '@/pc/utils/cookies';
React.version;
(async () => {
  const language = navigator.language.substring(0, 2);
  i18n.changeLanguage(language);
  
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

  addErrorListener();

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  postMessage({ payload: 'removeLoading' }, '*');
})();
