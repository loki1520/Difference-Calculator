import _ from 'lodash';
import getTree from '../getTree.js';

const outputValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getWay = (data, path = '') => data.reduce((acc, obj) => {
  const fullPath = `${path}${obj.key}.`;

  if (obj.type === 'nested') {
    return `${acc}${getWay(obj.value, fullPath)}`;
  }
  if (obj.type === 'added') {
    return `${acc}Property '${fullPath.slice(0, -1)}' was added with value: ${outputValue(obj.value)}\n`;
  }
  if (obj.type === 'deleted') {
    return `${acc}Property '${fullPath.slice(0, -1)}' was removed\n`;
  }
  if (obj.type === 'changed') {
    return `${acc}Property '${fullPath.slice(0, -1)}' was updated. From ${outputValue(obj.valueDeleted)} to ${outputValue(obj.valueAdded)}\n`;
  }
  return `${acc}`;
}, '');

const plain = (obj1, obj2) => {
  const prepairedTree = getTree(obj1, obj2);
  return getWay(prepairedTree).trim();
};

export default plain;
