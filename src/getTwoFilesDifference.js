import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  const accString = (acc, keyNum = 0) => {
    if (keyNum > keys1.length - 1) {
      return acc;
    }

    const key = keys1[keyNum];

    if (_.has(file2, key)) {
      if (file1[key] === file2[key]) {
        const newString = `${acc}\n    ${key}: ${file1[key]}`;
        return accString(newString, keyNum + 1);
      }

      if (file1[key] !== file2[key]) {
        const tempString = `${acc}\n  + ${key}: ${file2[key]}`;
        const newString = `${tempString}\n  - ${key}: ${file1[key]}`;
        return accString(newString, keyNum + 1);
      }
    }

    const newString = `${acc}\n  - ${key}: ${file1[key]}`;
    return accString(newString, keyNum + 1);
  };

  const addNewKeys = (acc, keyNum = 0) => {
    if (keyNum > keys2.length - 1) {
      const newString = `${acc}\n}`;
      return newString;
    }

    const key = keys2[keyNum];

    const newString = (_.has(file1, key)) ? acc : `${acc}\n  + ${key}: ${file2[key]}`;

    return addNewKeys(newString, keyNum + 1);
  };

  return addNewKeys(accString('{'));
};

const getFilesDifference = () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(getDiff(filepath1, filepath2));
    })
    .parse(process.argv);
};

export { getFilesDifference, getDiff };
