import makePlain from './plain';
import makeStylish from './stylish';

const formaters = {
  plain: makePlain,
  json: (object) => JSON.stringify(object, null, '  '),
  stylish: makeStylish,
};

const convertToFormat = (object, format) => formaters[format](object);

export default convertToFormat;
