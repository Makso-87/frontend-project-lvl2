import _ from 'lodash';

const convStrToNum = (arg) => {
  if (_.isString(arg)) {
    if (_.isNumber(Number(arg)) && !_.isNaN(Number(arg)) && !_.isNull(arg) && !_.isBoolean(arg)) {
      return Number(arg);
    }
  }
  return arg;
};

const getChildren = (obj) => {
  const keys = (typeof obj === 'object') ? Object.keys(obj) : [];

  if (keys.length === 0 || typeof obj !== 'object') {
    return [];
  }

  return keys.map((key) => {
    const tempObj = {};
    tempObj[key] = obj[key];

    return tempObj;
  });
};

const getName = (obj) => (typeof obj === 'object' ? Object.keys(obj)[0] : '');

const trimPlusAndMinus = (string) => string.replace('+ ', '').replace('- ', '');

export {
  getChildren, getName, trimPlusAndMinus, convStrToNum,
};
