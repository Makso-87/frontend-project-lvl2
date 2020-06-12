import fs from 'fs';
import path from 'path';
import getDiff from '../src/index';

// const getFixturePath = (filename) => path.resolve(path.join('__fixtures__', filename));
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
// let file1;
// let file2;

// beforeAll(() => {
//   file1 = readFile('before-after-result.txt');
//   file2 = readFile('first-second-result.txt');
// });

test('gendiff-json', () => {
  const string = getDiff('__fixtures__/before.json', '__fixtures__/after.json');

  // expect(string).toBe(file1);
  expect(string).toEqual('{\
\n    host: hexlet.io\
\n  + timeout: 20\
\n  - timeout: 50\
\n  - proxy: 123.234.53.22\
\n  + follow: true\
\n  - follow: false\
\n  + verbose: true\
\n}');

  const newString = getDiff('__fixtures__/first.json', '__fixtures__/second.json');

  expect(newString).toEqual('{\
\n  - first-key: value1\
\n  + second-key: false\
\n  - second-key: true\
\n  + coconut: 80\
\n  - coconut: 60\
\n    milk: white\
\n  + car: Tesla\
\n  + bond: James Bond\
\n}');
});

test('gendiff-yaml', () => {
  const string = getDiff('__fixtures__/before.yml', '__fixtures__/after.yml');

  // expect(string).toBe(file1);
  expect(string).toEqual('{\
\n    host: hexlet.io\
\n  + timeout: 20\
\n  - timeout: 50\
\n  - proxy: 123.234.53.22\
\n  + follow: true\
\n  - follow: false\
\n  + verbose: true\
\n}');
});

test('gendiff-ini', () => {
  const string = getDiff('__fixtures__/before.ini', '__fixtures__/after.ini');

  // expect(string).toBe(file1);
  expect(string).toEqual('{\
\n    host: hexlet.io\
\n  + timeout: 20\
\n  - timeout: 50\
\n  - proxy: 123.234.53.22\
\n  + follow: true\
\n  - follow: false\
\n  + verbose: true\
\n}');
});