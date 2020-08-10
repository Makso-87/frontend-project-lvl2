import yaml from 'js-yaml';
import ini from 'ini';

const parseTools = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.decode,
};

const parseFile = (data, formatName) => {
  if (formatName === 'yml') {
    return parseTools.yaml(data);
  }

  if (formatName === 'ini') {
    return parseTools.ini(data);
  }

  if (formatName === 'json') {
    return parseTools.json(data);
  }

  throw new Error(`Unknown format: ${formatName}!`);
};

export default parseFile;
