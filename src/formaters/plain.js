const getFullPropertyName = (array, name) => [...array, name].join('.');

const getFormattedValue = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const makePlain = (tree) => {
  const iter = (node, paths = []) => node.flatMap((nodeItem) => {
    const {
      name, value, status, children, value1, value2,
    } = nodeItem;

    switch (status) {
      case 'nested':
        return iter(children, [...paths, name]);
      case 'added':
        return `Property '${getFullPropertyName(paths, name)}' was added with value: ${getFormattedValue(value)}`;
      case 'changed':
        return `Property '${getFullPropertyName(paths, name)}' was changed from ${getFormattedValue(value1)} to ${getFormattedValue(value2)}`;
      case 'removed':
        return `Property '${getFullPropertyName(paths, name)}' was deleted`;
      case 'unchanged':
        return [];
      default: throw new Error(`${status} is undefined status`);
    }
  });

  return iter(tree).join('\n');
};

export default makePlain;
