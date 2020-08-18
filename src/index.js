import fs from 'fs';
import path from 'path';
import buildDiff from './buildDiff';
import parseData from './parsers';
import convertToFormat from './formaters';

const getFormatName = (filePath) => path.extname(filePath).replace('.', '');


const genDiff = (filepath1, filepath2, format) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const format1 = getFormatName(filepath1);
  const format2 = getFormatName(filepath2);
  const parsedData1 = parseData(data1, format1);
  const parsedData2 = parseData(data2, format2);

  return convertToFormat(buildDiff(parsedData1, parsedData2), format);
};

export default genDiff;
