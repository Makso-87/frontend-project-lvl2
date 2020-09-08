import _ from 'lodash';

const objectToString = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }

  const space = ' ';
  const result = [['{'], _.keys(value).flatMap((key) => `${space.repeat(indent)}${key}: ${value[`${key}`]}`)];
  result.push(`${space.repeat(indent - 4)}}`);
  return result.join('\n');
};

const makeStylish = (tree) => {
  const iterate = (node, indent = 4) => node.flatMap((nodeItem) => {
    const {
      name, value, status, children, oldValue, newValue,
    } = nodeItem;

    const space = ' ';

    switch (status) {
      case 'nested':
        return `${space.repeat(indent)}${name}: {\n${iterate(children, indent + 4).join('')}${space.repeat(indent)}}\n`;
      case 'added':
        return `${space.repeat(indent - 2)}+ ${name}: ${objectToString(value, indent + 4)}\n`;
      case 'changed':
        return [`${space.repeat(indent - 2)}+ ${name}: ${objectToString(newValue, indent + 4)}\n`, `${space.repeat(indent - 2)}- ${name}: ${objectToString(oldValue, indent + 4)}\n`];
      case 'removed':
        return `${space.repeat(indent - 2)}- ${name}: ${objectToString(value, indent + 4)}\n`;
      case 'unchanged':
        return `${space.repeat(indent)}${name}: ${objectToString(value, indent + 4)}\n`;
      default: throw new Error(`${status} is undefined status`);
    }
  });

  const result = ['{\n'];
  result.push(iterate(tree).join(''));
  result.push('}');
  return result.join('');
};

export default makeStylish;
