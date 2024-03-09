import { LoadFromFile, SaveToFile } from '@/common/utils/types/func';

export const saveToFile: SaveToFile = (filePath, content) => {
  return Promise.resolve(true);
};

export const loadFromFile: LoadFromFile = filePath => {
  return Promise.resolve('');
};
