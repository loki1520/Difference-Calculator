import _ from 'lodash';

const stringify = (data, sign = ' ', quantitySign = 1, deep = 1) => {
  const markLines = sign.repeat(deep * quantitySign);
  const markEnds = sign.repeat((deep - 1) * quantitySign);

  const prepairedString = Object.entries(data).reduce((acc, [key, value]) => {
    console.log('key =', key);
    if (_.isObject(value)) {
      return `${acc}${markLines}${key}: ${stringify(value, sign, quantitySign, deep + 1)}\n`;
    }
    return `${acc}${markLines}${key}: ${value}\n`;
  }, '');

  return `{\n${prepairedString}${markEnds}}`;
};


const data = [
  {
    key: 'common',
    children: [
      {
        key: 'follow',
        value: false,
        type: 'added',
      },
      {
        key: 'setting1',
        value: 'Value 1',
        type: 'unchanged',
      },
      {
        key: 'setting2',
        value: 200,
        type: 'deleted',
      },
      {
        key: 'setting3',
        value1: true,
        value2: null,
        type: 'changed',
      },
      {
        key: 'setting4',
        value: 'blah blah',
        type: 'added',
      },
      {
        key: 'setting5',
        value: {
          key5: 'value5',
        },
        type: 'added',
      },
      {
        key: 'setting6',
        children: [
          {
            key: 'doge',
            children: [
              {
                key: 'wow',
                value1: '',
                value2: 'so much',
                type: 'changed',
              },
            ],
            type: 'nested',
          },
          {
            key: 'key',
            value: 'value',
            type: 'unchanged',
          },
          {
            key: 'ops',
            value: 'vops',
            type: 'added',
          },
        ],
        type: 'nested',
      },
    ],
    type: 'nested',
  },
  {
    key: 'group1',
    children: [
      {
        key: 'baz',
        value1: 'bas',
        value2: 'bars',
        type: 'changed',
      },
      {
        key: 'foo',
        value: 'bar',
        type: 'unchanged',
      },
      {
        key: 'nest',
        value1: {
          key: 'value',
        },
        value2: 'str',
        type: 'changed',
      },
    ],
    type: 'nested',
  },
  {
    key: 'group2',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    type: 'deleted',
  },
  {
    key: 'group3',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
    type: 'added',
  },
];

console.log(stringify(data, ' ', 2)); // Ваш массив данных
