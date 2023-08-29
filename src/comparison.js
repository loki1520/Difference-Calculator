import _ from 'lodash';

const comparison = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  let result = '';

  keys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]) {
      result += `  ${key}: ${obj1[key]}\n`;
    } else if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]) {
      result += `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
    } else if (_.has(obj1, key)) {
      result += `  - ${key}: ${obj1[key]}\n`;
    } else if (_.has(obj2, key)) {
      result += `  + ${key}: ${obj2[key]}\n`;
    }
    return result;
  });
  return `{\n${result}}`;
};

export default comparison;
