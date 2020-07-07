import yaml from 'js-yaml';
import ini from 'ini';

const parseJSON = (data) => JSON.parse(data);
const parseYAML = (data) => yaml.safeLoad(data);
const parseINI = (data) => ini.decode(data);

const parseFile = (data, extension) => {
  if (extension === '.yml') {
    return parseYAML(data);
  }

  if (extension === '.ini') {
    return parseINI(data);
  }

  return parseJSON(data);
};

export default parseFile;
