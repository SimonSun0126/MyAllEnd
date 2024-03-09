import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,
});

export const saveToLocalStorage = (key: string, value: any) => {
  storage.save({
    key,
    data: value,
    expires: null,
  });
};

export const loadFromLocalStorage = (
  key: string,
  defaultValue: any,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    storage
      .load({
        key,
      })
      .then(ret => {
        resolve(ret);
      })
      .catch(() => {
        resolve(defaultValue);
      });
  });
};
