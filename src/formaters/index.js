import toStringJsonStyle from './stylish';
import toStringPlainStyle from './plain';

const convertToFormat = (object, format) => {
  if (format === 'plain') {
    return toStringPlainStyle(object);
  }

  return toStringJsonStyle(object);
};

export default convertToFormat;
