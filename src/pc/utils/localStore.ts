import {
  LoadFromLocalStore,
  SaveToLocalStore,
} from '@/common/utils/types/func';

export const loadFromLocalStore: LoadFromLocalStore = key => {
  return Promise.resolve(localStorage.getItem(key) || '');
};

export const saveToLocalStore: SaveToLocalStore = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return Promise.resolve(true);
  } catch {
    return Promise.resolve(false);
  }
};
