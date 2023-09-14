import _ from 'lodash';
import getTree from './getTree.js';

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }

  const currentIndent = ' '.repeat(depth * 4);
  const bracketIndent = ' '.repeat(depth * 4 - 4);
  const lines = Object
    .entries(currentValue)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (obj1, obj2) => {
  const prepairedTree = getTree(obj1, obj2);
  const getRender = (tree, deep = 1) => {
    const currentIndent = ' '.repeat(deep * 4 - 2);
    const indentOfEnds = ' '.repeat(deep * 4 - 4);

    const result = tree.reduce((acc, obj) => {
      if (obj.type === 'nested') {
        return `${acc}${currentIndent}  ${obj.key}: ${getRender(obj.value, deep + 1)}\n`;
      }
      if (obj.type === 'unchanged') {
        return `${acc}${currentIndent}  ${obj.key}: ${stringify(obj.value, deep + 1)}\n`;
      }
      if (obj.type === 'changed') {
        return `${acc}${currentIndent}- ${obj.key}: ${stringify(obj.value1, deep + 1)}\n${currentIndent}+ ${obj.key}: ${stringify(obj.value2, deep + 1)}\n`;
      }
      if (obj.type === 'deleted') {
        return `${acc}${currentIndent}- ${obj.key}: ${stringify(obj.value, deep + 1)}\n`;
      }
      if (obj.type === 'added') {
        return `${acc}${currentIndent}+ ${obj.key}: ${stringify(obj.value, deep + 1)}\n`;
      }
      return acc;
    }, '');

    return `{\n${result}${indentOfEnds}}`;
  };
  return getRender(prepairedTree);
};

export default stylish;

const x = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const y = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

console.log(stylish(x, y));
