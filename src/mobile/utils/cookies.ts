import {
  cookiesObj2Str,
  cookiesStr2Obj,
  getCookieFromStr,
} from '@/common/utils/cookies';
import {
  LoadFromCookies,
  SaveToCookies,
  LoadAllCookies,
  SaveAllCookies,
} from '@/common/utils/types/func';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

export const loadFromCookies: LoadFromCookies = key => {
  return new Promise(async resolve => {
    let cookies = await loadFromLocalStorage('cookies', '');
    if (typeof cookies !== 'string') {
      cookies = '';
    }
    resolve(getCookieFromStr(cookies, key) || '');
  });
};

export const saveToCookies: SaveToCookies = (key, value) => {
  return new Promise(async resolve => {
    let cookies = await loadFromLocalStorage('cookies', '');
    if (typeof cookies !== 'string') {
      cookies = '';
    }
    const cookiesObj = cookiesStr2Obj(cookies);
    cookiesObj[key] = value;
    saveToLocalStorage('cookies', cookiesObj2Str(cookiesObj));
    resolve(true);
  });
};

export const loadAllCookies: LoadAllCookies = () => {
  return new Promise(async resolve => {
    let cookies = await loadFromLocalStorage('cookies', '');
    if (typeof cookies !== 'string') {
      cookies = '';
    }
    resolve(cookies);
  });
};

export const saveAllCookies: SaveAllCookies = newCookies => {
  saveToLocalStorage('cookies', newCookies);
  return Promise.resolve(true);
};
