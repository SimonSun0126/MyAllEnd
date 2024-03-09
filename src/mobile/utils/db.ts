import { CommonDB, IDBObjectStoreParams } from '@/common/utils/types/func';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

export class DB extends CommonDB {
  constructor(
    version: number,
    objectStores: { [name: string]: IDBObjectStoreParams },
  ) {
    super(version, objectStores);
  }

  open(): Promise<boolean> {
    return Promise.resolve(true);
  }

  add(storeName: string, data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!data || data[this.objectStores[storeName].keyPath] === undefined) {
        resolve(false);
        return;
      }
      let arr: Array<any> = await loadFromLocalStorage(
        'mainDB' + storeName,
        [],
      );
      if (!arr || !arr.length) {
        arr = [];
      }
      const key = data[this.objectStores[storeName].keyPath];
      const filtedArr = arr.filter(
        (item: any) => item[this.objectStores[storeName].keyPath] !== key,
      );
      filtedArr.push(data);
      saveToLocalStorage('mainDB' + storeName, filtedArr);
      resolve(true);
    });
  }

  get(storeName: string, key: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let arr: Array<any> = await loadFromLocalStorage(
        'mainDB' + storeName,
        [],
      );
      if (!arr || !arr.length) {
        arr = [];
      }
      const filtedArr = arr.filter(
        (item: any) => item[this.objectStores[storeName].keyPath] === key,
      );
      if (filtedArr.length) {
        resolve(filtedArr[0]);
      } else {
        resolve(undefined);
      }
    });
  }

  getAll(storeName: string): Promise<any[] | undefined> {
    return new Promise(async (resolve, reject) => {
      let arr: Array<any> = await loadFromLocalStorage(
        'mainDB' + storeName,
        [],
      );
      if (!arr || !arr.length) {
        arr = [];
      }
      resolve(arr);
    });
  }

  update(storeName: string, key: string, data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      // 容错处理
      if (!data || data[this.objectStores[storeName].keyPath] === undefined) {
        resolve(false);
        return;
      }
      let arr: Array<any> = await loadFromLocalStorage(
        'mainDB' + storeName,
        [],
      );
      if (!arr || !arr.length) {
        arr = [];
      }
      const filtedArr = arr.filter(
        (item: any) => item[this.objectStores[storeName].keyPath] !== key,
      );
      filtedArr.push(data);
      saveToLocalStorage('mainDB' + storeName, filtedArr);
      resolve(true);
    });
  }

  delete(storeName: string, key: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let arr: Array<any> = await loadFromLocalStorage(
        'mainDB' + storeName,
        [],
      );
      if (!arr || !arr.length) {
        arr = [];
      }
      const filtedArr = arr.filter(
        (item: any) => item[this.objectStores[storeName].keyPath] !== key,
      );
      saveToLocalStorage('mainDB' + storeName, filtedArr);
      resolve(true);
    });
  }

  clear(storeName: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      saveToLocalStorage('mainDB' + storeName, []);
      resolve(true);
    });
  }
}
