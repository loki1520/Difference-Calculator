import _ from 'lodash';

const stringify = (data, sign = ' ', quantitySign = 1, deep = 1) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const markLines = sign.repeat(deep * quantitySign);
  const markEnds = sign.repeat((deep - 1) * quantitySign);

  const prepairedString = Object.entries(data).reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return `${acc}${markLines}${key}: ${stringify(value, sign, quantitySign, deep + 1)}\n`;
    }
    return `${acc}${markLines}${key}: ${value}\n`;
  }, '');

  return `{\n${prepairedString}${markEnds}}`;
};

const nested = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
  object: {
    5: 'number',
    1.25: 'float',
    null: 'null',
    true: 'boolean',
    value: 'string',
    nested: {
      boolean: true,
      float: 1.25,
      string: 'value',
      number: 5,
      null: null,
    },
  },
};

console.log(stringify(nested, '+', 1));
