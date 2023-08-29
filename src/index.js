import fs from 'fs';
import path from 'path';
import comparison from './comparison.js';

const getCurrentWorkDir = () => process.cwd();
const getAbsolutePathFile = (filepath) => path.resolve(getCurrentWorkDir(), filepath);
const getObj = (data) => JSON.parse(fs.readFileSync(data, 'utf-8'));
const getFileExtention = (filepath) => filepath.slice(filepath.lastIndexOf('.') + 1);

const genDiff = (filepath1, filepath2) => {
  const absolutePathToFile1 = getAbsolutePathFile(filepath1);
  const absolutePathToFile2 = getAbsolutePathFile(filepath2);

  const obj1 = getObj(absolutePathToFile1);
  const obj2 = getObj(absolutePathToFile2);

  return comparison(obj1, obj2);
};

export default genDiff;
