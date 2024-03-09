// func useFunc
export interface SaveToFile {
  (filePath: string, content: string): Promise<boolean>;
}
export interface LoadFromFile {
  (filePath: string): Promise<string>;
}

export interface SaveToLocalStore {
  (key: string, value: string): Promise<boolean>;
}
export interface LoadFromLocalStore {
  (key: string): Promise<string>;
}

export interface SaveToCookies {
  (key: string, value: string): Promise<boolean>;
}
export interface LoadFromCookies {
  (key: string): Promise<string>;
}
export interface LoadAllCookies {
  (): Promise<string>;
}
export interface SaveAllCookies {
  (newCookies: string): Promise<boolean>;
}

export interface PostRequest {
  (url: string, data: any, cookies: string): Promise<{
    res: any;
    err: any;
    netCode: number;
    setCookie: string;
  }>;
}

export interface IDBObjectStoreParams {
  keyPath: string;
}

export abstract class CommonDB {
  protected dbName = 'mainDB';
  protected db: IDBDatabase | undefined;

  constructor(
    protected version: number,
    protected objectStores: { [name: string]: IDBObjectStoreParams },
  ) {}

  abstract open(): Promise<boolean>;
  abstract add(storeName: string, data: any): Promise<boolean>;
  abstract get(storeName: string, key: string): Promise<any>;
  abstract getAll(storeName: string): Promise<any>;
  abstract update(storeName: string, key: string, data: any): Promise<boolean>;
  abstract delete(storeName: string, key: string): Promise<boolean>;
  abstract clear(storeName: string): Promise<boolean>;
}
