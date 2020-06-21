import parseFile from '../src/parsers';
import { buildDiff } from '../src/genDiff';

const file1 = parseFile('/mnt/c/Users/МАКСИМ/Hexlet-Learning/GIT/hexletProjects/frontend-project-lvl2/__fixtures__/__recursive__/before.json');
const file2 = parseFile('/mnt/c/Users/МАКСИМ/Hexlet-Learning/GIT/hexletProjects/frontend-project-lvl2/__fixtures__/__recursive__/after.json');

test('buildDiff', () => {
  const res = buildDiff(file1, file2);

  expect(res).toEqual({
      common: {
        setting1: 'Value 1',
        '- setting2': 200,
        '+ setting3': {
          key: 'value'
        },
        '- setting3': true,
        setting6: {
          key: 'value',
          '+ ops': 'vops'
        },
        '+ follow': false,
        '+ setting4': 'blah blah',
        '+ setting5': {
          key5: 'value5'
        }
      },
      group1: {
        '+ baz': 'bars',
        '- baz': 'bas',
        foo: 'bar',
        '+ nest': 'str',
        '- nest': {
          key: 'value'
        }
      },
      '- group2': {
        abc: 12345
      },
      '+ group3': {
        fee: 100500
      }
  });
});