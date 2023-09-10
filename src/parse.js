import yaml from 'js-yaml';

const parseToJSObject = (data, extention) => {
  switch (extention) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error('Attention! This file format is not supported!');
  }
};

export default parseToJSObject;
