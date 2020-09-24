import _ from 'lodash';

const getIndent = (num) => ' '.repeat(num);

const getFormattedValue = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }

  const iter = (obj, indt) => {
    const indentForNested = indt + 4;

    return _.keys(obj).flatMap((key) => {
      if (_.isObject(obj[key])) {
        return `\n${getIndent(indentForNested)}${key}: {\n${iter(obj[key], indentForNested).join('\n')}${getIndent(indentForNested)}}\n`;
      }

      return `${getIndent(indentForNested)}${key}: ${obj[`${key}`]}`;
    });
  };

  const result = [['{'], iter(value, indent)];
  result.push(`${getIndent(indent)}}`);
  return result.join('\n');
};

const makeStylish = (tree) => {
  const iter = (node, indent = 4) => node.flatMap((nodeItem) => {
    const {
      name, value, status, children, oldValue, newValue,
    } = nodeItem;

    const indentForNested = indent + 4;
    const indentForOthers = indent - 2;

    switch (status) {
      case 'nested':
        return `${getIndent(indent)}${name}: {\n${iter(children, indentForNested).join('')}${getIndent(indent)}}\n`;
      case 'added':
        return `${getIndent(indentForOthers)}+ ${name}: ${getFormattedValue(value, indent)}\n`;
      case 'changed':
        return [
          `${getIndent(indentForOthers)}+ ${name}: ${getFormattedValue(newValue, indent)}\n`,
          `${getIndent(indentForOthers)}- ${name}: ${getFormattedValue(oldValue, indent)}\n`,
        ];
      case 'removed':
        return `${getIndent(indentForOthers)}- ${name}: ${getFormattedValue(value, indent)}\n`;
      case 'unchanged':
        return `${getIndent(indent)}${name}: ${getFormattedValue(value, indent)}\n`;
      default: throw new Error(`${status} is undefined status`);
    }
  });

  return `{\n${iter(tree).join('')}}`;
};

export default makeStylish;
