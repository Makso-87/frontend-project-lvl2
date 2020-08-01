import yaml from 'js-yaml';
import ini from 'ini';

const parseTools = {
  formats: {
    json: 'json',
    yaml: 'yml',
    ini: 'ini',
  },
  parsers: {
    parseJSON: (data) => JSON.parse(data),
    parseYAML: (data) => yaml.safeLoad(data),
    parseINI: (data) => ini.decode(data),
  },
};

const parseFile = (data, formatName) => {
  if (formatName === parseTools.formats.yaml) {
    return parseTools.parsers.parseYAML(data);
  }

  if (formatName === parseTools.formats.ini) {
    return parseTools.parsers.parseINI(data);
  }

  return parseTools.parsers.parseJSON(data);
};

export default parseFile;
