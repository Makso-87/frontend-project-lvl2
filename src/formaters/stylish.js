import _ from 'lodash';

const getIndent = (num) => ' '.repeat(num);

const getFormattedValue = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indentForNested = indent + 4;
  const result = Object.entries(value).flatMap(([key, val]) => {
    if (!_.isObject(val)) {
      return `${getIndent(indentForNested)}  ${key}: ${val}`;
    }

    return `${getIndent(indentForNested)}  ${key}: {\n${getFormattedValue(val, indentForNested).join('\n')}\n${getIndent(indentForNested)}  }`;
  });

  return `{\n${result.join('\n')}\n${getIndent(indent)}  }`;
};

const makeStylish = (tree) => {
  const iter = (nodes, indent = 2) => nodes.flatMap((nodesItem) => {
    const {
      name, value, status, children, value1, value2,
    } = nodesItem;

    switch (status) {
      case 'nested':
        return `${getIndent(indent)}  ${name}: {\n${iter(children, indent + 4).join('\n')}\n${getIndent(indent)}  }`;
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

  return `{\n${iter(tree).join('\n')}\n}`;
};

export default makeStylish;
