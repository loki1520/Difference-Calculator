import _ from 'lodash';

const getTree = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  return keys.map((key) => {
    if (_.has(obj2, key)
      && _.has(obj1, key)
      && _.isObject(obj1[key])
      && _.isObject(obj2[key])
      && !Array.isArray(obj1[key])
      && !Array.isArray(obj2[key])) {
      return { key, value: getTree(obj1[key], obj2[key]), type: 'nested' };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, value: obj1[key], type: 'unchanged' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
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

// const x = {
//   common: {
//     setting1: 'Value 1',
//     setting2: 200,
//     setting3: true,
//     setting6: {
//       key: 'value',
//       doge: {
//         wow: '',
//       },
//     },
//   },
//   group1: {
//     baz: 'bas',
//     foo: 'bar',
//     nest: {
//       key: 'value',
//     },
//   },
//   group2: {
//     abc: 12345,
//     deep: {
//       id: 45,
//     },
//   },
// };

// const y = {
//   common: {
//     follow: false,
//     setting1: 'Value 1',
//     setting3: null,
//     setting4: 'blah blah',
//     setting5: {
//       key5: 'value5',
//     },
//     setting6: {
//       key: 'value',
//       ops: 'vops',
//       doge: {
//         wow: 'so much',
//       },
//     },
//   },
//   group1: {
//     foo: 'bar',
//     baz: 'bars',
//     nest: 'str',
//   },
//   group3: {
//     deep: {
//       id: {
//         number: 45,
//       },
//     },
//     fee: 100500,
//   },
// };

// const res = getTree(x, y);
// console.log(JSON.stringify(res, null, 2));

// [
//   {
//     "key": "common",
//     "value": [
//       {
//         "key": "follow",
//         "value": false,
//         "type": "added"
//       },
//       {
//         "key": "setting1",
//         "value": "Value 1",
//         "type": "unchanged"
//       },
//       {
//         "key": "setting2",
//         "value": 200,
//         "type": "deleted"
//       },
//       {
//         "key": "setting3",
//         "value1": true,
//         "value2": null,
//         "type": "changed"
//       },
//       {
//         "key": "setting4",
//         "value": "blah blah",
//         "type": "added"
//       },
//       {
//         "key": "setting5",
//         "value": {
//           "key5": "value5"
//         },
//         "type": "added"
//       },
//       {
//         "key": "setting6",
//         "value": [
//           {
//             "key": "doge",
//             "value": [
//               {
//                 "key": "wow",
//                 "value1": "",
//                 "value2": "so much",
//                 "type": "changed"
//               }
//             ],
//             "type": "nested"
//           },
//           {
//             "key": "key",
//             "value": "value",
//             "type": "unchanged"
//           },
//           {
//             "key": "ops",
//             "value": "vops",
//             "type": "added"
//           }
//         ],
//         "type": "nested"
//       }
//     ],
//     "type": "nested"
//   },
//   {
//     "key": "group1",
//     "value": [
//       {
//         "key": "baz",
//         "value1": "bas",
//         "value2": "bars",
//         "type": "changed"
//       },
//       {
//         "key": "foo",
//         "value": "bar",
//         "type": "unchanged"
//       },
//       {
//         "key": "nest",
//         "value1": {
//           "key": "value"
//         },
//         "value2": "str",
//         "type": "changed"
//       }
//     ],
//     "type": "nested"
//   },
//   {
//     "key": "group2",
//     "value": {
//       "abc": 12345,
//       "deep": {
//         "id": 45
//       }
//     },
//     "type": "deleted"
//   },
//   {
//     "key": "group3",
//     "value": {
//       "deep": {
//         "id": {
//           "number": 45
//         }
//       },
//       "fee": 100500
//     },
//     "type": "added"
//   }
// ]