import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  const parsedData = ini.parse(data);

  const transformStrToNum = (obj) => _.mapValues(obj, (value) => {
    if (_.isObject(value)) {
      return transformStrToNum(value);
    }

    return !Number.isNaN(parseFloat(value)) ? parseFloat(value) : value;
  });

  const result = transformStrToNum(parsedData);

  return result;
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

const parseData = (data, formatName) => parsers[formatName](data);

export default parseData;
