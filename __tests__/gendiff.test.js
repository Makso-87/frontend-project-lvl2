import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.resolve(path.join('__fixtures__', filename));
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const pathFile1 = '__fixtures__/file1.';
const pathFile2 = '__fixtures__/file2.';

let file1;
let file2;
let file3;

beforeAll(() => {
  file1 = readFile('expected-result-stylish.txt');
  file2 = readFile('expected-result-plain.txt');
  file3 = readFile('expected-result-json.json');
});

test.each([
  ['json'],
  ['yml'],
  ['ini']
])('gendiff-%s', (format) => {
  const string = genDiff(`${pathFile1}${format}`, `${pathFile2}${format}`, 'stylish');
  expect(string).toEqual(file1);

  const string2 = genDiff(`${pathFile1}${format}`, `${pathFile2}${format}`, 'plain');
  expect(string2).toEqual(file2);

  const string3 = genDiff(`${pathFile1}${format}`, `${pathFile2}${format}`, 'json');
  expect(string3).toEqual(file3);
});
