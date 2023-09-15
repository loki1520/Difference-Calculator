import _ from 'lodash';
import getTree from '../getTree.js';

const getIndent = (depth, count = 2) => ' '.repeat(depth * 4 - count);
const signOfDiffer = {
  nested: '  ',
  unchanged: '  ',
  deleted: '- ',
  added: '+ ',
};

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return String(currentValue);
  }
  const lines = Object
    .entries(currentValue)
    .map(([key, value]) => `${getIndent(depth)}${signOfDiffer.unchanged}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${getIndent(depth, 4)}}`;
};

const stylish = (obj1, obj2) => {
  const prepairedTree = getTree(obj1, obj2);
  const getRender = (tree, depth = 1) => {
    const lines = tree.map((obj) => {
      switch (obj.type) {
        case 'nested':
          return `${getIndent(depth)}${signOfDiffer[obj.type]}${obj.key}: ${getRender(obj.value, depth + 1)}`;
        case 'unchanged':
        case 'deleted':
        case 'added':
          return `${getIndent(depth)}${signOfDiffer[obj.type]}${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'changed': {
          const deleteValue = `${getIndent(depth)}${signOfDiffer.deleted}${obj.key}: ${stringify(obj.valueDeleted, depth + 1)}\n`;
          const addedValue = `${getIndent(depth)}${signOfDiffer.added}${obj.key}: ${stringify(obj.valueAdded, depth + 1)}`;
          return `${deleteValue}${addedValue}`;
        }
        default:
          return '';
      }
    });
    return ['{', ...lines, `${getIndent(depth, 4)}}`].join('\n');
    // return `{\n${result}${getIndent(depth, 4)}}`;
  };
  return getRender(prepairedTree);
};

export default stylish;
