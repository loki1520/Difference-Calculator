import getTree from './getTree.js';

const findObjectDifferences = (obj1, obj2) => {
  const prepairedTree = getTree(obj1, obj2);

  const result = prepairedTree.reduce((acc, obj) => {
    if (obj.type === 'unchanged') {
      return `${acc}  ${obj.key}: ${obj.value}\n`;
    }
    if (obj.type === 'changed') {
      return `${acc}  - ${obj.key}: ${obj.value1}\n  + ${obj.key}: ${obj.value2}\n`;
    }
    if (obj.type === 'deleted') {
      return `${acc}  - ${obj.key}: ${obj.value}\n`;
    }
    if (obj.type === 'added') {
      return `${acc}  + ${obj.key}: ${obj.value}\n`;
    }
    return acc;
  }, '');

  return `{\n${result}}`;
};

export default findObjectDifferences;
