import fs from 'fs';
import path from 'path';
import getDiff from '../src/index';

const getFixturePath = (filename) => path.resolve(path.join('__fixtures__', filename));
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
let file1;
let file2;

beforeAll(() => {
  file1 = readFile('before-after-result.txt');
  file2 = readFile('first-second-result.txt');
});

test('gendiff-json', () => {
  const string = getDiff('__fixtures__/before.json', '__fixtures__/after.json');

  expect(string).toEqual(file1);

  const newString = getDiff('__fixtures__/first.json', '__fixtures__/second.json');

  expect(newString).toEqual(file2);
});

test('gendiff-yaml', () => {
  const string = getDiff('__fixtures__/before.yml', '__fixtures__/after.yml');

  expect(string).toEqual(file1);
});

test('gendiff-ini', () => {
  const string = getDiff('__fixtures__/before.ini', '__fixtures__/after.ini');

  expect(string).toEqual(file1);
});