import _ from 'lodash';
import getTree from '../getTree.js';

const stringify = (currentValue, depth) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  return String(currentValue);
};

const stylish = (obj1, obj2) => {
  const prepairedTree = getTree(obj1, obj2);
  const getRender = (tree, depth = 1) => {
    const result = tree.reduce((acc, obj) => {
      switch (obj.type) {
        case 'nested':
          return `${acc}${obj.key}. ${getRender(obj.value, depth + 1)}\n`;
        case 'unchanged':
          return `'${acc}||${obj.key}: ${stringify(obj.value, depth + 1)}\n'`;
        case 'deleted':
          return `${acc}||${obj.key}: ${stringify(obj.value, depth + 1)}\n`;
        case 'added':
          return `${acc}||${obj.key}: ${stringify(obj.value, depth + 1)}\n`;
        case 'changed': {
          const deleteValue = `||${obj.key}: ${stringify(obj.valueDeleted, depth + 1)}\n`;
          const addedValue = `||${obj.key}: ${stringify(obj.valueAdded, depth + 1)}\n`;
          return `${acc}${deleteValue}${addedValue}`;
        }
        default:
          return acc;
      }
    }, '');

    return `${result}`;
  };
  return getRender(prepairedTree);
};

export default stylish;
