import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.resolve(path.join('__fixtures__', filename));
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedStylishResult;
let expectedPlainResult;
let expectedJsonResult;

beforeAll(() => {
  expectedStylishResult = readFile('expected-result-stylish.txt');
  expectedPlainResult = readFile('expected-result-plain.txt');
  expectedJsonResult = readFile('expected-result-json.json');
});

test.each([
  'json',
  'yml',
  'ini'
])('gendiff-%s', (format) => {
  const path1 = getFixturePath(`file1.${format}`);
  const path2 = getFixturePath(`file2.${format}`);

  const actualStylishResult = genDiff(path1, path2, 'stylish');
  expect(actualStylishResult).toEqual(expectedStylishResult);

  const actualPlainResult = genDiff(path1, path2, 'plain');
  expect(actualPlainResult).toEqual(expectedPlainResult);

  const actualJsonResult = genDiff(path1, path2, 'json');
  expect(actualJsonResult).toEqual(expectedJsonResult);
});
