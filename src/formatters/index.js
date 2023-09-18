import stylish from './stylish.js';
import plain from './plain.js';

const typeConclusion = {
  plain,
  stylish,
};

const resultConclusion = (obj1, obj2, format) => typeConclusion[format](obj1, obj2);

export default resultConclusion;
