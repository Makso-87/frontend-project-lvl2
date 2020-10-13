import _ from 'lodash';

const getIndent = (num) => ' '.repeat(num);

const getFormattedValue = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }

  const iter = (obj, indt) => {
    const indentForNested = indt + 4;

    return _.keys(obj).flatMap((key) => {
      if (!_.isObject(obj[key])) {
        return `${getIndent(indentForNested)}  ${key}: ${obj[`${key}`]}`;
      }

      return [
        `${getIndent(indentForNested)}  ${key}: {`,
        `${iter(obj[key], indentForNested).join('\n')}`,
        `${getIndent(indentForNested)}  }`,
      ].join('\n');
    });
  };

  const result = ['{', iter(value, indent).join('\n'), `${getIndent(indent)}  }`];
  return result.join('\n');
};

const makeStylish = (tree) => {
  const iter = (node, indent = 2) => node.flatMap((nodeItem) => {
    const {
      name, value, status, children, value1, value2,
    } = nodeItem;

    switch (status) {
      case 'nested':
        return [
          `${getIndent(indent)}  ${name}: {`,
          `${iter(children, indent + 4).join('\n')}`,
          `${getIndent(indent)}  }`,
        ].join('\n');
      case 'added':
        return `${getIndent(indent)}+ ${name}: ${getFormattedValue(value, indent)}`;
      case 'changed':
        return [
          `${getIndent(indent)}+ ${name}: ${getFormattedValue(value2, indent)}`,
          `${getIndent(indent)}- ${name}: ${getFormattedValue(value1, indent)}`,
        ];
      case 'removed':
        return `${getIndent(indent)}- ${name}: ${getFormattedValue(value, indent)}`;
      case 'unchanged':
        return `${getIndent(indent)}  ${name}: ${getFormattedValue(value, indent)}`;
      default: throw new Error(`${status} is undefined status`);
    }
  });

  return ['{', `${iter(tree).join('\n')}`, '}'].join('\n');
};

export default makeStylish;
