import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const typeConclusion = {
  plain,
  stylish,
  json,
};

const resultConclusion = (obj1, obj2, format = 'stylish') => typeConclusion[format](obj1, obj2);

export default resultConclusion;
