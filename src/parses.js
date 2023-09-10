import yaml from 'js-yaml';

const parseToJSObject = (data, extention) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': yaml.load,
    '.yaml': yaml.load,
  };

  const parse = parsers[extention];
  if (!parse) throw new Error('Attention! This file format is not supported!');
  return parse(data);
};

export default parseToJSObject;
