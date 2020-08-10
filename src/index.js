import fs from 'fs';
import path from 'path';
import buildDiff from './buildDiff';
import parseFile from './parsers';
import convertToFormat from './formaters';

const genDiff = (filepath1, filepath2, format) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const format1 = path.extname(filepath1).replace('.', '');
  const format2 = path.extname(filepath1).replace('.', '');
  const parsedData1 = parseFile(data1, format1);
  const parsedData2 = parseFile(data2, format2);

  return convertToFormat(buildDiff(parsedData1, parsedData2), format);
};

export default genDiff;
