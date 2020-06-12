import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseJSON = (filepath) => JSON.parse(fs.readFileSync(filepath));
const parseYAML = (filepath) => yaml.safeLoad(fs.readFileSync(filepath));

const parseFile = (filepath) => {
  const absolutPath = path.resolve(filepath);
  const extension = path.extname(filepath);

  if (extension === '.yml') {
    return parseYAML(absolutPath);
  }

  return parseJSON(absolutPath);
};

export default parseFile;
