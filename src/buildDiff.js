import _ from 'lodash';

const creatNode = (nameValue = 'not set', childrenValue = 'not set', statusValue = 'not set') => ({
  type: 'node',
  name: nameValue,
  children: childrenValue,
  status: statusValue,
});

const creatLeaf = (nameValue = 'not set', valueValue = 'not set', statusValue = 'not set') => ({
  type: 'leaf',
  name: nameValue,
  value: valueValue,
  status: statusValue,
});

const getUniqueKeys = (arg1, arg2) => {
  const keys = _.union(_.keys(arg1), _.keys(arg2));
  return _.uniq(keys);
};

const buildDiff = (obj1, obj2) => {
  const keys = getUniqueKeys(obj1, obj2);

  const tree = keys.map((key) => {
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      const newValue = obj2[key];
      const status = 'added';
      return creatLeaf(key, newValue, status);
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      const newValue = obj1[key];
      const status = 'removed';
      return creatLeaf(key, newValue, status);
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const children = buildDiff(obj1[key], obj2[key]);
      const status = 'nested';
      return creatNode(key, children, status);
    }

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        const values = {
          old: obj1[key],
          new: obj2[key],
        };
        const status = 'changed';

        return creatLeaf(key, values, status);
      }
    }

    // if (obj1[key] === obj2[key]) {
    const value = obj1[key];
    const status = 'not changed';
    return creatLeaf(key, value, status);
    // }
  });

  return tree;
};

export default buildDiff;
