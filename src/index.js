import fs from 'fs';
import path from 'path';
import comparison from './comparison.js';

const genDiff = (filepath1, filepath2) => {
  const absolutePathToFile1 = path.resolve(process.cwd(), filepath1);
  const absolutePathToFile2 = path.resolve(process.cwd(), filepath2);

  const obj1 = JSON.parse(fs.readFileSync(absolutePathToFile1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(absolutePathToFile2, 'utf-8'));

  return comparison(obj1, obj2);
};

export default genDiff;
