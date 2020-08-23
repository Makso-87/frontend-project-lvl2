import _ from 'lodash';

const getUniqueKeys = (arg1, arg2) => _.union(_.keys(arg1), _.keys(arg2));

const buildDiff = (obj1, obj2) => {
  const keys = getUniqueKeys(obj1, obj2);

  const tree = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        name: key,
        value: obj2[key],
        status: 'added',
      };
    }

    if (!_.has(obj2, key)) {
      return {
        name: key,
        value: obj1[key],
        status: 'removed',
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        children: buildDiff(obj1[key], obj2[key]),
        status: 'nested',
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        oldValue: obj1[key],
        newValue: obj2[key],
        status: 'changed',
      };
    }

    return {
      name: key,
      value: obj1[key],
      status: 'unchanged',
    };
  });

  return tree;
};

export default buildDiff;
