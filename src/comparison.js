import _ from 'lodash';

const comparison = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq(Object.keys(obj1), Object.keys(obj2)));

  const getTree = keys.map((key) => {
    if (key in obj1 && key in obj2 && obj1[key] === obj2[key]) {
      return {
        key,
        value: obj1[key],
        type: 'unchanged',
      };
    }
    if (key in obj1 && key in obj2 && obj1[key] !== obj2[key]) {
      return {
        key,
        value1: obj1[key],
        value2: obj2[key],
        type: 'changed',
      };
    }
    if (!(key in obj2)) {
      return {
        key,
        value: obj1[key],
        type: 'deleted',
      };
    }
    if (!(key in obj1)) {
      return {
        key,
        value: obj2[key],
        type: 'added',
      };
    }
    return getTree;
  });

  const result = getTree.reduce((acc, obj) => {
    if (obj.type === 'unchanged') {
      acc += `  ${obj.key}: ${obj.value}\n`;
    }
    if (obj.type === 'changed') {
      acc += `  - ${obj.key}: ${obj.value1}\n  + ${obj.key}: ${obj.value2}\n`;
    }
    if (obj.type === 'deleted') {
      acc += `  - ${obj.key}: ${obj.value}\n`;
    }
    if (obj.type === 'added') {
      acc += `  + ${obj.key}: ${obj.value}\n`;
    }
    return acc;
  }, '');

  return `{\n${result}}`;
};

export default comparison;
