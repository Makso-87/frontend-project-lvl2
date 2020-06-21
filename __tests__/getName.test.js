import { getName } from '../src/formaters';

test('get-name', () => {
  const res = getName({key1: "val"});
  expect(res).toEqual('key1');

  const res2 = getName(45);
  expect(res2).toEqual('');

  const res3 = getName('45');
  expect(res3).toEqual('');
});