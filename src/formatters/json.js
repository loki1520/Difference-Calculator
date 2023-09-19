import getTree from '../getTree.js';

const getJsonView = (obj1, obj2) => {
  const prepairedDiff = getTree(obj1, obj2);
  return JSON.stringify(prepairedDiff, null, ' ');
};

export default getJsonView;
