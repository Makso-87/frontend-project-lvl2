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

const getName = (obj) => {
  const result = typeof obj === 'object' ? Object.keys(obj)[0] : '';
  return result;
};

const isString = (arg) => typeof arg === 'string';

const trimPlusAndMinus = (string) => string.replace('+ ', '').replace('- ', '');

export {
  getChildren, getName, isString, trimPlusAndMinus,
};
