import {
  LoadFromCookies,
  SaveToCookies,
  LoadAllCookies,
  SaveAllCookies,
} from './types/func';

let _saveToCookies: SaveToCookies;
let _loadFromCookies: LoadFromCookies;
let _loadAllCookies: LoadAllCookies;
let _saveAllCookies: SaveAllCookies;

export function initCookiesFunction(
  saveFunc: SaveToCookies,
  loadFunc: LoadFromCookies,
  loadAllFunc: LoadAllCookies,
  saveAllFunc: SaveAllCookies,
) {
  _saveToCookies = saveFunc;
  _loadFromCookies = loadFunc;
  _loadAllCookies = loadAllFunc;
  _saveAllCookies = saveAllFunc;
}

export const saveToCookies: SaveToCookies = (key, value) => {
  if (_saveToCookies) {
    return _saveToCookies(key, value);
  } else {
    return Promise.resolve(false);
  }
};

export const loadFromCookies: LoadFromCookies = key => {
  if (_loadFromCookies) {
    return _loadFromCookies(key);
  } else {
    return Promise.resolve('');
  }
};

export const loadAllCookies: LoadAllCookies = () => {
  if (_loadAllCookies) {
    return _loadAllCookies();
  } else {
    return Promise.resolve('');
  }
};

export const saveAllCookies: SaveAllCookies = newCookies => {
  return new Promise(async resolve => {
    if (_saveAllCookies) {
      const allCookies = await loadAllCookies();
      const allCookiesObj = cookiesStr2Obj(allCookies);
      const newCookiesObj = cookiesStr2Obj(newCookies);
      const resCookiesObj = { ...allCookiesObj, ...newCookiesObj };
      const resCookies = cookiesObj2Str(resCookiesObj);
      _saveAllCookies(resCookies);
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

export function cookiesStr2Obj(cookiesStr: string) {
  if (!cookiesStr) {
    return {};
  }
  const cookiesObj: any = cookiesStr.split(';').reduce((prev: any, curr) => {
    curr = curr.trim();
    const [name, val] = curr.split('=');
    if (val) {
      prev[name] = val;
    }
    return prev;
  }, {});
  return cookiesObj;
}

export function cookiesObj2Str(cookiesObj: any) {
  if (!cookiesObj) {
    cookiesObj = {};
  }
  const cookieList = [];
  for (const [name, val] of Object.entries(cookiesObj)) {
    cookieList.push(`${name}=${val}`);
  }
  const cookiesStr = cookieList.join('; ');
  return cookiesStr;
}

export function getCookieFromStr(str: string, key: string) {
  return cookiesStr2Obj(str)[key];
}
