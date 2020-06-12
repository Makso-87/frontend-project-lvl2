import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parseJSON = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));
const parseYAML = (filepath) => yaml.safeLoad(fs.readFileSync(filepath, 'utf-8'));
const parseINI = (filepath) => ini.parse(fs.readFileSync(filepath, 'utf-8'));

const parseFile = (filepath) => {
  const absolutPath = path.resolve(filepath);
  const extension = path.extname(filepath);

  if (extension === '.yml') {
    return parseYAML(absolutPath);
  }

  if (extension === '.ini') {
    return parseINI(absolutPath);
  }

  return parseJSON(absolutPath);
};

export default parseFile;
