import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.resolve(path.join('__fixtures__', filename));
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const file1 = readFile('file1-file2-stylish-format.txt');
const file2 = readFile('file1-file2-plain-format.txt');
const file3 = readFile('file1-file2-json-format.json');

test.each([
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish', file1],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish', file1],
  ['__fixtures__/file1.ini', '__fixtures__/file2.ini', 'stylish', file1],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'plain', file2],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'json', file3],
])('gendiff', (testFile1, testFile2, format, expected) => {
  const string = genDiff(testFile1, testFile2, format);
  expect(string).toEqual(expected);
});