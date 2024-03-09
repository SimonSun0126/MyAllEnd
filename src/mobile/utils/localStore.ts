import {
  LoadFromLocalStore,
  SaveToLocalStore,
} from '@/common/utils/types/func';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

export const loadFromLocalStore: LoadFromLocalStore = key => {
  return loadFromLocalStorage(key, '');
};

export const saveToLocalStore: SaveToLocalStore = (
  key: string,
  value: string,
) => {
  saveToLocalStorage(key, value);
  return Promise.resolve(true);
};
