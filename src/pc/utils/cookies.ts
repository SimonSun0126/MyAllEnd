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

export const loadFromCookies: LoadFromCookies = key => {
  const cookies = document.cookie;
  return Promise.resolve(getCookieFromStr(cookies, key) || '');
};

export const saveToCookies: SaveToCookies = (key, value) => {
  const cookies = document.cookie;
  const cookiesObj = cookiesStr2Obj(cookies);
  cookiesObj[key] = value;
  document.cookie = cookiesObj2Str(cookiesObj);
  return Promise.resolve(true);
};

export const loadAllCookies: LoadAllCookies = () => {
  return Promise.resolve(document.cookie || '');
};

export const saveAllCookies: SaveAllCookies = newCookies => {
  document.cookie = newCookies;
  return Promise.resolve(true);
};
