import stylish from './stylish.js';
import plain from './plain.js';

const resultConclusion = (obj1, obj2, format) => {
  if (format === 'plain') {
    return plain(obj1, obj2);
  }
  return stylish(obj1, obj2);
};

export default resultConclusion;
