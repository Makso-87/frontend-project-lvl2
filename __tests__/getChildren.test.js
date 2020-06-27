import { getChildren } from '../src/auxiliaryFunctions';

const obect = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
  follow: true
}

test('get-children', () => {
  expect(getChildren(obect)).toEqual([
    { timeout: 20 },
    { verbose: true },
    { host: 'hexlet.io' },
    { follow: true }
  ]);

  expect(getChildren({})).toEqual([]);
  expect(getChildren(20)).toEqual([]);
  expect(getChildren('text')).toEqual([]);
  expect(getChildren(true)).toEqual([]);
});