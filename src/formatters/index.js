import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const typeConclusion = {
  plain: (obj1, obj2) => plain(obj1, obj2),
  stylish: (obj1, obj2) => stylish(obj1, obj2),
  json: (obj1, obj2) => json(obj1, obj2),
};

const resultConclusion = (obj1, obj2, format) => {
  const conclusion = typeConclusion[format];
  return conclusion(obj1, obj2);
};

export default resultConclusion;
