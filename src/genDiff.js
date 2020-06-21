import _ from 'lodash';
import parseFile from './parsers';
import { convertToFormat, isObject } from './formaters';

const buildDiff = (file1, file2) => {
  const accObj = (arg1, arg2, acc = {}, keyNum = 0) => {
    const keys = Object.keys(arg1);
    const key = keys[keyNum];

    if (keyNum > keys.length - 1) {
      return acc;
    }

    if (_.has(arg2, key)) {
      if (isObject(arg1[key]) && isObject(arg2[key])) {
        acc[key] = buildDiff(arg1[key], arg2[key]);
        return accObj(arg1, arg2, acc, keyNum + 1);
      }

      if (arg1[key] === arg2[key]) {
        acc[key] = arg1[key];
        return accObj(arg1, arg2, acc, keyNum + 1);
      }

      if (arg1[key] !== arg2[key]) {
        acc[`+ ${key}`] = arg2[key];
        acc[`- ${key}`] = arg1[key];
        return accObj(arg1, arg2, acc, keyNum + 1);
      }
    }

    acc[`- ${key}`] = arg1[key];

    return accObj(arg1, arg2, acc, keyNum + 1);
  };

  const addNewKeysObj = (arg1, arg2, acc = {}, keyNum = 0) => {
    const keys = Object.keys(arg2);
    const key = keys[keyNum];

    if (keyNum > keys.length - 1) {
      return acc;
    }

    if (_.has(arg1, key)) {
      return addNewKeysObj(arg1, arg2, acc, keyNum + 1);
    }

    acc[`+ ${key}`] = arg2[key];

    return addNewKeysObj(arg1, arg2, acc, keyNum + 1);
  };

  return addNewKeysObj(file1, file2, accObj(file1, file2, {}));
};

const genDiff = (filepath1, filepath2, format) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  return convertToFormat(buildDiff(file1, file2), format);
};

export {
  genDiff, buildDiff,
};
