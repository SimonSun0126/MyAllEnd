import { LoadFromFile, SaveToFile } from '@/common/utils/types/func';
import fs from 'fs';

export const saveToFile: SaveToFile = (filePath, content) => {
  return new Promise(resolve => {
    if (filePath && content) {
      try {
        fs.writeFileSync(filePath, content);
        resolve(true);
      } catch {
        resolve(false);
      }
    }
    resolve(false);
  });
};

export const loadFromFile: LoadFromFile = filePath => {
  return Promise.resolve('');
};
