import { program } from 'commander';
import _ from 'lodash';
import parseFile from './parsers';


const accString = (arg1, arg2, acc, keyNum = 0) => {
  const file1 = arg1;
  const file2 = arg2;
  const keys = Object.keys(file1);
  const key = keys[keyNum];

  if (keyNum > keys.length - 1) {
    return acc;
  }

  if (_.has(file2, key)) {
    if (file1[key] === file2[key]) {
      const newString = `${acc}\n    ${key}: ${file1[key]}`;
      return accString(file1, file2, newString, keyNum + 1);
    }

    if (file1[key] !== file2[key]) {
      const tempString = `${acc}\n  + ${key}: ${file2[key]}`;
      const newString = `${tempString}\n  - ${key}: ${file1[key]}`;
      return accString(file1, file2, newString, keyNum + 1);
    }
  }

  const newString = `${acc}\n  - ${key}: ${file1[key]}`;
  return accString(file1, file2, newString, keyNum + 1);
};

const addNewKeys = (arg1, arg2, acc, keyNum = 0) => {
  const file1 = arg1;
  const file2 = arg2;
  const keys = Object.keys(file2);
  const key = keys[keyNum];

  if (keyNum > keys.length - 1) {
    const newString = `${acc}\n}`;
    return newString;
  }

  const newString = (_.has(file1, key)) ? acc : `${acc}\n  + ${key}: ${file2[key]}`;

  return addNewKeys(file1, file2, newString, keyNum + 1);
};

const getDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  return addNewKeys(file1, file2, accString(file1, file2, '{'));
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
