import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  _.sortBy(keys);

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
        value1: obj1[key],
        value2: obj2[key],
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
