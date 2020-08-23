import _ from 'lodash';

const toStringPlainStyle = (tree, path = []) => {
  const result = tree.flatMap((key) => {
    if (key.status === 'nested') {
      path.push(`${key.name}.`);
      const newPath = [...path];
      path.pop();
      return toStringPlainStyle(key.children, newPath);
    }

    if (key.status === 'added') {
      const pathString = `${path.join('')}${key.name}`;
      const value = _.isObject(key.value) ? '[complex value]' : key.value;
      const typingValue = _.isBoolean(value) || _.isNumber(value) || value === '[complex value]' ? value : `'${key.value}'`;
      return `Property '${pathString}' was added with value: ${typingValue}`;
    }

    if (key.status === 'changed') {
      const pathString = `${path.join('')}${key.name}`;
      const oldValue = _.isObject(key.oldValue) ? '[complex value]' : key.oldValue;
      const typingOldValue = _.isBoolean(oldValue) || _.isNumber(oldValue) || oldValue === '[complex value]' ? oldValue : `'${key.oldValue}'`;
      const newValue = _.isObject(key.newValue) ? '[complex value]' : key.newValue;
      const typingNewValue = _.isBoolean(newValue) || _.isNumber(newValue) || newValue === '[complex value]' ? newValue : `'${key.newValue}'`;
      return `Property '${pathString}' was changed from ${typingOldValue} to ${typingNewValue}`;
    }

    if (key.status === 'removed') {
      const pathString = `${path.join('')}${key.name}`;
      return `Property '${pathString}' was deleted`;
    }

    return [];
  });

  return result.join('\n');
};

export default toStringPlainStyle;
