import _ from 'lodash';

const getTree = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  return keys.map((key) => {
    if (_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        value: obj1[key],
        type: 'unchanged',
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
    return {
      key,
      value1: obj1[key],
      value2: obj2[key],
      type: 'changed',
    };
  });
};

export default getTree;
