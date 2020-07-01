import { isObject, isString, trimPlusAndMinus } from '../auxiliaryFunctions';



const makeNewPath = (path, name) => `${path}.${name}`.replace('.', '');

const toStringPlainStyle = (object, path = '', acc = '', keyNum = 0) => {
  const keys = Object.keys(object);
  const key = keys[keyNum];
  const nextKey = keys[keyNum + 1];

  if (keyNum > keys.length - 1) {
    const newAcc = acc;
    return newAcc;
  }

  if (nextKey !== undefined) {
    if (key[0] === '+' && nextKey[0] === '-') {
      const cleanName = trimPlusAndMinus(key);
      const newPath = makeNewPath(path, cleanName);

      const newValue = isString(object[key]) ? `'${object[key]}'` : object[key];
      const mostNewValue = isObject(newValue) ? '[complex value]' : newValue;

      const oldValue = isString(object[nextKey]) ? `'${object[nextKey]}'` : object[nextKey];
      const newOldValue = isObject(oldValue) ? '[complex value]' : oldValue;

      const newAcc = `${acc}\nProperty '${newPath}' was changed from ${newOldValue} to ${mostNewValue}`;
      return toStringPlainStyle(object, path, newAcc, keyNum + 2);
    }
  }

  if (key[0] === '+' && isObject(object[key])) {
    const cleanName = trimPlusAndMinus(key);
    const newPath = makeNewPath(path, cleanName);
    const newAcc = `${acc}\nProperty '${newPath}' was added with value: [complex value]`;
    return toStringPlainStyle(object, path, newAcc, keyNum + 1);
  }

  if (key[0] === '+') {
    const cleanName = trimPlusAndMinus(key);
    const newPath = makeNewPath(path, cleanName);
    const newValue = isString(object[key]) ? `'${object[key]}'` : object[key];
    const newAcc = `${acc}\nProperty '${newPath}' was added with value: ${newValue}`;
    return toStringPlainStyle(object, path, newAcc, keyNum + 1);
  }

  if (key[0] === '-') {
    const cleanName = trimPlusAndMinus(key);
    const newPath = makeNewPath(path, cleanName);
    const newAcc = `${acc}\nProperty '${newPath}' was deleted`;
    return toStringPlainStyle(object, path, newAcc, keyNum + 1);
  }

  if (isObject(object[key])) {
    const newPath = `${path}.${key}`;
    const newAcc = `${acc.trimLeft()}${toStringPlainStyle(object[key], newPath)}`;
    return toStringPlainStyle(object, path, newAcc, keyNum + 1);
  }

  return toStringPlainStyle(object, path, acc, keyNum + 1);
};

export default toStringPlainStyle;
