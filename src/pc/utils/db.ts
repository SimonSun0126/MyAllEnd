import { CommonDB, IDBObjectStoreParams } from '@/common/utils/types/func';

export class DB extends CommonDB {
  constructor(
    version: number,
    objectStores: { [name: string]: IDBObjectStoreParams },
  ) {
    super(version, objectStores);
  }

  open(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.version);

      request.onsuccess = () => {
        this.db = request.result;
        resolve(true);
      };

      request.onerror = () => {
        resolve(false);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        const objectStoreNames = db.objectStoreNames;
        for (const [storeName, objectStruct] of Object.entries(
          this.objectStores,
        )) {
          if (objectStoreNames.contains(storeName)) {
            db.deleteObjectStore(storeName);
          }
          db.createObjectStore(storeName, objectStruct);
        }
      };
    });
  }

  add(storeName: string, data: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put(data);

        request.onerror = () => {
          console.log('【database】 add error', request.error);
          resolve(false);
        };

        request.onsuccess = () => {
          console.log('【database】 add sucess', storeName);
          resolve(true);
        };
      } else {
        console.log('【database】 add error db null', this.db);
        resolve(false);
      }
    });
  }

  get(storeName: string, key: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(storeName, 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.get(key);

        request.onsuccess = () => {
          console.log('【database】 get sucess', storeName);
          resolve(request.result);
        };

        request.onerror = () => {
          resolve(false);
        };
      } else {
        resolve(false);
      }
    });
  }

  getAll(storeName: string): Promise<any[] | undefined> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(storeName, 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();

        request.onsuccess = () => {
          console.log('【database】getAll', storeName);
          resolve(request.result);
        };

        request.onerror = () => {
          resolve(undefined);
        };
      } else {
        resolve(undefined);
      }
    });
  }

  update(storeName: string, key: string, data: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put(data);

        request.onsuccess = () => {
          console.log('【database】 update sucess', storeName);
          resolve(true);
        };

        request.onerror = () => {
          resolve(false);
        };
      } else {
        resolve(false);
      }
    });
  }

  delete(storeName: string, key: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const isExist = await this.get(storeName, key);
        if (isExist) {
          const request = objectStore.delete(key);

          request.onsuccess = () => {
            resolve(true);
          };

          request.onerror = () => {
            resolve(false);
          };
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  }

  clear(storeName: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.clear();

        request.onsuccess = () => {
          resolve(true);
        };

        request.onerror = () => {
          resolve(false);
        };
      } else {
        resolve(false);
      }
    });
  }
}
