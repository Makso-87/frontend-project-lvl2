import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.resolve(path.join('__fixtures__', filename));
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
let file1;
let file2;
let file3;
let file4;
let file5;

beforeAll(() => {
  file1 = readFile('before-after-result.txt');
  file2 = readFile('first-second-result.txt');
  file3 = readFile('__recursive__/before-after-result-recursive.txt');
  file4 = readFile('__recursive__/before-after-recursive-plain-format.txt');
  file5 = readFile('__recursive__/before-after-recursive-json-format.json');
});

test('gendiff-json', () => {
  const string = genDiff('__fixtures__/before.json', '__fixtures__/after.json');

  expect(string).toEqual(file1);

  const newString = genDiff('__fixtures__/first.json', '__fixtures__/second.json');

  expect(newString).toEqual(file2);
});

test('gendiff-yaml', () => {
  const string = genDiff('__fixtures__/before.yml', '__fixtures__/after.yml');

  expect(string).toEqual(file1);
});

test('gendiff-ini', () => {
  const string = genDiff('__fixtures__/before.ini', '__fixtures__/after.ini');

  expect(string).toEqual(file1);
});

test('gendiff-json-recursive', () => {
  const string = genDiff('__fixtures__/__recursive__/before.json', '__fixtures__/__recursive__/after.json');
  console.log(string);
  expect(string).toEqual(file3);
});

test('gendiff-json-recursive-plain-format', () => {
  const string = genDiff('__fixtures__/__recursive__/before.json', '__fixtures__/__recursive__/after.json', 'plain');

  expect(string).toEqual(file4);
});

test('gendiff-json-recursive-json-format', () => {
  const string = genDiff('__fixtures__/__recursive__/before.json', '__fixtures__/__recursive__/after.json', 'json');
  console.log(string);
  expect(string).toEqual(file5);
});