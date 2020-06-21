import fs from 'fs';
import path from 'path';
import { toStringJsonStyle } from '../src/formaters';

const getFixturePath = (filename) => path.resolve(path.join('__fixtures__', filename));
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
let file;

const object = {
  common: {
    setting1: 'Value 1',
    '- setting2': 200,
    '+ setting3': {
      key: 'value',
    },
    '- setting3': true,
    setting6: {
      key: 'value',
      '+ ops': 'vops',
    },
    '+ follow': false,
    '+ setting4': 'blah blah',
    '+ setting5': {
      key5: 'value5',
    },
  },
  group1: {
    '+ baz': 'bars',
    '- baz': 'bas',
    foo: 'bar',
    '+ nest': 'str',
    '- nest': {
      key: 'value',
    },
  },
  '- group2': {
    abc: 12345,
  },
  '+ group3': {
    fee: 100500,
  },
};

beforeAll(() => {
  file = readFile('__recursive__/before-after-result-recursive.txt');
});

test('convert-to-string', () => {
  const res = toStringJsonStyle(object);

  expect(res).toBe(file);
});