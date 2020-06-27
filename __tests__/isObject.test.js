import { isObject } from '../src/auxiliaryFunctions';

const obj = {
  key1: "val1",
  key2: "val2",
  key3: "val3"
}

test('is-object', () => {
  expect(isObject(obj)).toBe(true);
  expect(isObject({})).toBe(true);
  expect(isObject(['obj'])).toBe(false);
  expect(isObject("obj")).toBe(false);
  expect(isObject(56)).toBe(false);
  expect(isObject(null)).toBe(false);
});