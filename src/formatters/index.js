import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const resultConclusion = (obj1, obj2, format) => {
  switch (format) {
    case 'plain':
      return plain(obj1, obj2);
    case 'json':
      return json(obj1, obj2);
    case 'stylish':
      return stylish(obj1, obj2);
    default:
      throw new Error('Attention! This file format is not supported!');
  }
};

export default resultConclusion;
