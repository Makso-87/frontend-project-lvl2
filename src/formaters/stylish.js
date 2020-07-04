import _ from 'lodash';

const toStringJsonStyle = (object, indent = 4, acc = '{', keyNum = 0) => {
  const keys = Object.keys(object);
  const key = keys[keyNum];

  if (keyNum > keys.length - 1) {
    const newIndent = indent - 4;
    const newAcc = `${acc}\n${' '.repeat(newIndent)}}`;
    return newAcc;
  }

  if (_.isObject(object[key])) {
    const newIndent = `${key}`[0] === '+' || `${key}`[0] === '-' ? indent - 2 : indent;
    const newAcc = `${acc}\n${' '.repeat(newIndent)}${key}: ${toStringJsonStyle(object[key], indent + 4)}`;
    return toStringJsonStyle(object, indent, newAcc, keyNum + 1);
  }

  const newIndent = `${key}`[0] === '+' || `${key}`[0] === '-' ? indent - 2 : indent;
  const newAcc = `${acc}\n${' '.repeat(newIndent)}${key}: ${object[key]}`;
  return toStringJsonStyle(object, indent, newAcc, keyNum + 1);
};

export default toStringJsonStyle;
