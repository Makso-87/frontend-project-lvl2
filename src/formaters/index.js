import makePlain from './plain';
import makeStylish from './stylish';
import makeJSON from './json';

const formaters = {
  plain: makePlain,
  json: makeJSON,
  stylish: makeStylish,
};

const convertToFormat = (object, format) => formaters[format](object);

export default convertToFormat;
