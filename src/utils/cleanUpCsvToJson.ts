/**
 * @description util function to convert an array of rows of csv data to an array of objects in JSON notation while tagging to the correct column name
 *
 * @example 
[
    ['Time', 'Price', 'Trade Size', 'Type'],
    ['17:15:55', '1.56', '5000', 'Buy Up'],
    ['17:11:59', '1.56', '5000', 'Buy Up']
] 


Will return: 
[
    {time: '17:15:55', price: '1.56', tradeSize: '5000', type: 'Buy Up'}
]
 */

import TimeAndSalesInterface from '../types/TimeAndSalesInterface/TimeAndSalesInterface';
import camelCase from './camelCase';
import convertTimeToUnixTime from './convertTimeToUnixTime/convertTimeToUnixTime';

const cleanUpCsvToJson = (
  initialCsv: string[][],
  // Used when table is given in reverse chronological order
  isReverse = false
): Array<TimeAndSalesInterface> => {
  console.log(initialCsv);
  const csvHeaders = initialCsv.shift() || [
    'Time',
    'Price',
    'Trade Size',
    'Type',
  ];
  console.log('Removed headers', { Headers: csvHeaders });

  const cleanHeaders = csvHeaders?.map((header) => camelCase(header)) as Array<
    keyof TimeAndSalesInterface
  >;

  const formattedTimeArr = [];

  const taggedArray = initialCsv.map((csvRow) => {
    const finalObj: TimeAndSalesInterface = {
      time: '',
      price: '',
      tradeSize: '',
      type: '',
    };

    csvRow.forEach((propertyValue, index) => {
      finalObj[cleanHeaders[index]] = propertyValue;
      if (cleanHeaders[index] === 'time') {
        const convertedTime = convertTimeToUnixTime(propertyValue);

        /** Add formattedTime property to object */
        formattedTimeArr.push(convertedTime);
      }
    });

    console.log(formattedTimeArr);
    return finalObj;
  });

  if (isReverse) {
    return taggedArray.reverse();
  }

  return taggedArray;
};

export default cleanUpCsvToJson;
