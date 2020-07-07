import _ from 'lodash';
import { convStrToNum, trimPlusAndMinus } from '../auxiliaryFunctions';

const getOldValues = (obj, acc = {}, keyNum = 0) => {
  const keys = Object.keys(obj);
  const key = keys[keyNum];

  if (!_.isObject(obj)) {
    return convStrToNum(obj);
  }

  if (keyNum > keys.length - 1) {
    return acc;
  }

  if (_.isObject(obj[key]) && key[0] !== '+') {
    acc[trimPlusAndMinus(key)] = getOldValues(obj[key]);

    return getOldValues(obj, acc, keyNum + 1);
  }

  if (key[0] === '-') {
    acc[trimPlusAndMinus(key)] = convStrToNum(obj[key]);
    return getOldValues(obj, acc, keyNum + 1);
  }

  if (key[0] !== '+') {
    acc[trimPlusAndMinus(key)] = convStrToNum(obj[key]);
    return getOldValues(obj, acc, keyNum + 1);
  }

  return getOldValues(obj, acc, keyNum + 1);
};

const getNewValues = (obj, acc = {}, keyNum = 0) => {
  const keys = Object.keys(obj);
  const key = keys[keyNum];

  if (!_.isObject(obj)) {
    return convStrToNum(obj);
  }

  if (keyNum > keys.length - 1) {
    return acc;
  }

  if (_.isObject(obj[key]) && key[0] !== '-') {
    acc[trimPlusAndMinus(key)] = getNewValues(obj[key]);

    return getNewValues(obj, acc, keyNum + 1);
  }

  if (key[0] === '+') {
    acc[trimPlusAndMinus(key)] = convStrToNum(obj[key]);
    return getNewValues(obj, acc, keyNum + 1);
  }

  if (key[0] !== '-') {
    acc[trimPlusAndMinus(key)] = convStrToNum(obj[key]);
    return getNewValues(obj, acc, keyNum + 1);
  }

  return getNewValues(obj, acc, keyNum + 1);
};

const isChanged = (obj, keyNum = 0) => {
  const keys = Object.keys(obj);
  const key = keys[keyNum];

  if (keyNum > keys.length - 1) {
    return false;
  }

  if (key[0] === '+' || key[0] === '-') {
    return true;
  }

  if (_.isObject(obj[key])) {
    isChanged(obj);
  }

  return isChanged(obj, keyNum + 1);
};

const toJsonStyle = (object, acc = [], keyNum = 0) => {
  const keys = Object.keys(object);
  const key = keys[keyNum];
  const nextKey = keys[keyNum + 1];

  if (keyNum > keys.length - 1) {
    return acc;
  }

  const newObject = {
    name: trimPlusAndMinus(key),
    currentValue: getNewValues(object[key]),
    oldValue: getOldValues(object[key]),
    wasChanged: false,
    wasAdded: false,
    wasDeleted: false,
    children: false,
  };

  if (nextKey !== undefined) {
    if (key[0] === '+' && nextKey[0] === '-') {
      newObject.oldValue = convStrToNum(object[nextKey]);
      newObject.wasChanged = true;
      acc.push(newObject);

      return toJsonStyle(object, acc, keyNum + 2);
    }
  }

  if (key[0] === '+' && _.isObject(object[key])) {
    newObject.wasAdded = true;
    acc.push(newObject);

    return toJsonStyle(object, acc, keyNum + 1);
  }

  if (key[0] === '-' && _.isObject(object[key])) {
    newObject.wasDeleted = true;
    acc.push(newObject);

    return toJsonStyle(object, acc, keyNum + 1);
  }

  if (key[0] === '+') {
    newObject.wasAdded = true;
    acc.push(newObject);

    return toJsonStyle(object, acc, keyNum + 1);
  }

  if (key[0] === '-') {
    newObject.wasDeleted = true;
    acc.push(newObject);

    return toJsonStyle(object, acc, keyNum + 1);
  }

  if (_.isObject(object[key])) {
    newObject.currentValue = getNewValues(object[key]);
    newObject.oldValue = getOldValues(object[key]);
    newObject.wasChanged = isChanged(object[key]);
    newObject.children = toJsonStyle(object[key]);

    acc.push(newObject);
    return toJsonStyle(object, acc, keyNum + 1);
  }

  acc.push(newObject);

  return toJsonStyle(object, acc, keyNum + 1);
};

export default toJsonStyle;
