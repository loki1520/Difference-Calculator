import path from 'path';
import fs from 'fs';
import render from './render.js';

const getCurrentWorkDir = () => process.cwd();
const getAbsolutePathFile = (filepath) => path.resolve(getCurrentWorkDir(), filepath);
const getObj = (data) => JSON.parse(fs.readFileSync(data, 'utf-8'));
// const extention = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2) => {
  const absolutePathToFile1 = getAbsolutePathFile(filepath1);
  const absolutePathToFile2 = getAbsolutePathFile(filepath2);
  const obj1 = getObj(absolutePathToFile1);
  const obj2 = getObj(absolutePathToFile2);

  return render(obj1, obj2);
};
export default genDiff;
