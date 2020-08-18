import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.decode,
};

const parseData = (data, formatName) => parsers[formatName](data);

export default parseData;
