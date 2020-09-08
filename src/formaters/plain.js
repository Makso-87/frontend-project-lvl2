const getFullNameProp = (array, name) => {
  const string = `${array.join('.')}.${name}`;
  return string[0] === '.' ? string.slice(1) : string;
};

const getCorrectValue = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    case 'boolean':
      return value;
    case 'number':
      return value;
    default:
      return value;
  }
};

const makePlain = (tree) => {
  const iterate = (node, paths = []) => node.flatMap((nodeItem) => {
    const {
      name, value, status, children, oldValue, newValue,
    } = nodeItem;
    let newPaths;

    switch (status) {
      case 'nested':
        paths.push(`${name}`);
        newPaths = [...paths];
        paths = paths.filter((item, index) => index < paths.length - 1);
        return iterate(children, newPaths);
      case 'added':
        return `Property '${getFullNameProp(paths, name)}' was added with value: ${getCorrectValue(value)}`;
      case 'changed':
        return `Property '${getFullNameProp(paths, name)}' was changed from ${getCorrectValue(oldValue)} to ${getCorrectValue(newValue)}`;
      case 'removed':
        return `Property '${getFullNameProp(paths, name)}' was deleted`;
      case 'unchanged':
        return [];
      default: throw new Error(`${status} is undefined status`);
    }
  });

  return iterate(tree).join('\n');
};

export default makePlain;
