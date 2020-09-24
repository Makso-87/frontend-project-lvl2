const makeFullPuthProp = (array, name) => {
  const newArr = [...array, name];
  return `${newArr.join('.')}`;
};

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
      name, value, status, children, oldValue, newValue,
    } = nodeItem;

    switch (status) {
      case 'nested':
        return iter(children, [...paths, `${name}`]);
      case 'added':
        return `Property '${makeFullPuthProp(paths, name)}' was added with value: ${getFormattedValue(value)}`;
      case 'changed':
        return `Property '${makeFullPuthProp(paths, name)}' was changed from ${getFormattedValue(oldValue)} to ${getFormattedValue(newValue)}`;
      case 'removed':
        return `Property '${makeFullPuthProp(paths, name)}' was deleted`;
      case 'unchanged':
        return [];
      default: throw new Error(`${status} is undefined status`);
    }
  });

  return iter(tree).join('\n');
};

export default makePlain;
