import { LoadFromLocalStore, SaveToLocalStore } from './types/func';

let _saveToLocalStore: SaveToLocalStore;
let _loadFromLocalStore: LoadFromLocalStore;

export const initLocalStoreFunction = (
  saveFunc: SaveToLocalStore,
  loadFunc: LoadFromLocalStore,
) => {
  _saveToLocalStore = saveFunc;
  _loadFromLocalStore = loadFunc;
};

export const saveToLocalStore: SaveToLocalStore = (key, value) => {
  return _saveToLocalStore
    ? _saveToLocalStore(key, value)
    : Promise.resolve(false);
};

export const loadFromLocalStore: LoadFromLocalStore = key => {
  return _loadFromLocalStore ? _loadFromLocalStore(key) : Promise.resolve('');
};
