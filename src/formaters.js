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

const isObject = (arg) => {
  if (Array.isArray(arg)) return false;
  if (arg === null) return false;

  return typeof arg === 'object';
};

const toStringJsonStyle = (object, indent = 4, acc = '{', keyNum = 0) => {
  const keys = Object.keys(object);
  const key = keys[keyNum];

  if (keyNum > keys.length - 1) {
    const newIndent = indent - 4;
    const newAcc = `${acc}\n${' '.repeat(newIndent)}}`;
    return newAcc;
  }

  if (isObject(object[key])) {
    const newIndent = `${key}`[0] === '+' || `${key}`[0] === '-' ? indent - 2 : indent;
    const newAcc = `${acc}\n${' '.repeat(newIndent)}${key}: ${toStringJsonStyle(object[key], indent + 4)}`;
    return toStringJsonStyle(object, indent, newAcc, keyNum + 1);
  }

  const newIndent = `${key}`[0] === '+' || `${key}`[0] === '-' ? indent - 2 : indent;
  const newAcc = `${acc}\n${' '.repeat(newIndent)}${key}: ${object[key]}`;
  return toStringJsonStyle(object, indent, newAcc, keyNum + 1);
};

const convertToFormat = (boject, format) => {
  if (format === 'stylish') {
    return toStringJsonStyle(boject);
  }

  return toStringJsonStyle(boject);
};

export {
  convertToFormat, toStringJsonStyle, getChildren, getName, isObject,
};
