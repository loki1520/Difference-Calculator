import _ from 'lodash';

const stringify = (currentValue, depth = 1) => {
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

console.log(stringify(nested));
