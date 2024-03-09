import { LoadFromFile, SaveToFile } from './types/func';

let _saveToFile: SaveToFile;
let _loadFromFile: LoadFromFile;

export function initFileFunction(saveFunc: SaveToFile, loadFunc: LoadFromFile) {
  _saveToFile = saveFunc;
  _loadFromFile = loadFunc;
}

export const saveToFile: SaveToFile = (filePath, content) => {
  if (_saveToFile) {
    return _saveToFile(filePath, content);
  } else {
    return Promise.resolve(false);
  }
};

export const loadFromFile: LoadFromFile = filePath => {
  if (_loadFromFile) {
    return _loadFromFile(filePath);
  } else {
    return Promise.resolve('');
  }
};
