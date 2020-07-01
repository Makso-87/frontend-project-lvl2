import toStringJsonStyle from './stylish';
import toStringPlainStyle from './plain';
import toJsonStyle from './json';

const convertToFormat = (object, format) => {
  if (format === 'plain') {
    return toStringPlainStyle(object);
  }

  if (format === 'json') {
    return JSON.stringify(toJsonStyle(object), null, '  ');
  }

  return toStringJsonStyle(object);
};

export default convertToFormat;
