import parseFile from '../src/parsers';

test('parse-file', () => {
    const obj = parseFile('__fixtures__/before.json');
    const obj2 = parseFile('__fixtures__/before.yml');
    const obj3 = parseFile('__fixtures__/after.json');
    const obj4 = parseFile('__fixtures__/after.yml');

    expect(obj).toEqual({
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false
    });

    expect(obj2).toEqual({
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false
    });

    expect(obj3).toEqual({
        timeout: 20,
        verbose: true,
        host: 'hexlet.io',
        follow: true
    });

    expect(obj4).toEqual({
        timeout: 20,
        verbose: true,
        host: 'hexlet.io',
        follow: true
    });
});