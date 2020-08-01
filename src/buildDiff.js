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
  const keys = Object.keys({ ...arg1, ...arg2 });
  return _.uniq(keys);
};

const buildDiff = (arg1, arg2) => {
  const uniqueKeys = getUniqueKeys(arg1, arg2);

  const iter = (obj1, obj2, keyNum = 0) => {
    const keys = getUniqueKeys(obj1, obj2);
    const currentKey = keys[keyNum];

    if (_.isObject(obj1[currentKey]) && _.isObject(obj2[currentKey])) {
      const theseKeys = getUniqueKeys(obj1[currentKey], obj2[currentKey]);
      const children = theseKeys.flatMap(
        (key, index) => iter(obj1[currentKey], obj2[currentKey], index),
      );
      const status = 'changed';

      return creatNode(currentKey, children, status);
    }

    if (_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
      if (obj1[currentKey] === obj2[currentKey]) {
        const value = obj1[currentKey];
        const status = 'not changed';
        return creatLeaf(currentKey, value, status);
      }

      if (obj1[currentKey] !== obj2[currentKey]) {
        const valueOld = obj1[currentKey];
        const valueNew = obj2[currentKey];
        const statusOld = 'removed';
        const statusNew = 'added';
        const rezult = [];
        const oldUnit = _.isObject(obj1[currentKey]) ? creatNode(currentKey, valueOld, statusOld)
          : creatLeaf(currentKey, valueOld, statusOld);
        const newUnit = _.isObject(obj2[currentKey]) ? creatNode(currentKey, valueNew, statusNew)
          : creatLeaf(currentKey, valueNew, statusNew);
        rezult.push(oldUnit);
        rezult.push(newUnit);
        return rezult;
      }
    }

    if (!_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
      const value = obj2[currentKey];
      const status = 'added';
      const nodeUnit = _.isObject(obj2[currentKey]) ? creatNode(currentKey, value, status)
        : creatLeaf(currentKey, value, status);
      return nodeUnit;
    }

    // if (_.has(obj1, currentKey) && !_.has(obj2, currentKey)) {
    const value = obj1[currentKey];
    const status = 'removed';
    const nodeUnit = _.isObject(obj1[currentKey]) ? creatNode(currentKey, value, status)
      : creatLeaf(currentKey, value, status);
    return nodeUnit;
    // }
  };

  const result = uniqueKeys.flatMap((key, index) => iter(arg1, arg2, index));
  console.log(result);
  return result;
};

export default buildDiff;
