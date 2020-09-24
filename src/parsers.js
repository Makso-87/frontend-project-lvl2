import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const fixNumber = (value) => {
  const number = !_.isBoolean(value) ? Number(value) : value;
  return _.isNumber(number) && !_.isNaN(number) ? number : value;
};

const iniParse = (data) => {
  const parsedData = ini.parse(data);

  const iter = (obj) => _.mapValues(obj, (value) => {
    if (_.isObject(value)) {
      return iter(value);
    }

    return fixNumber(value);
  });

  const result = iter(parsedData);

  return result;
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: iniParse,
};

const parseData = (data, formatName) => parsers[formatName](data);

export default parseData;
