import _ from 'lodash';
import getTree from './getTree.js';

const stylish = (obj1, obj2) => {
  const prepairedTree = getTree(obj1, obj2);
  console.log(prepairedTree);
  const getRender = (tree, deep = 1) => {
    const currentIndent = ' '.repeat(deep * 4 - 2);
    const indentOfEnds = ' '.repeat(deep * 4 - 4);

    const result = tree.reduce((acc, obj) => {
      if (obj.type === 'nested') {
        return `${acc}${currentIndent}  ${obj.key}: ${getRender(obj.value, deep + 1)}\n`;
      }
      if (obj.type === 'unchanged') {
        return `${acc}${currentIndent}  ${obj.key}: ${obj.value}\n`;
      }
      if (obj.type === 'changed') {
        return `${acc}${currentIndent}- ${obj.key}: ${obj.value1}\n${currentIndent}+ ${obj.key}: ${obj.value2}\n`;
      }
      if (obj.type === 'deleted') {
        return `${acc}${currentIndent}- ${obj.key}: ${obj.value}\n`;
      }
      if (obj.type === 'added') {
        return `${acc}${currentIndent}+ ${obj.key}: ${obj.value}\n`;
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

// const z = {
//   "host": "hexlet.io",
//   "timeout": 50,
//   "proxy": "123.234.53.22",
//   "follow": false
// };

// const a = {
//   "timeout": 20,
//   "verbose": true,
//   "host": "hexlet.io"
// };

// console.log(stylish(z, a));
