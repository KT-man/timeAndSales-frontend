/**
 * @description util function to convert an array of rows of csv data to an array of objects in JSON notation while tagging to the correct column name
 *
 * @example 
[
    ['Time', 'Price', 'Trade Size', 'Type'],
    ['17:15:55', '1.56', '5000', 'Buy Up'],
    ['17:11:59', '1.56', '5000', 'Buy Up']
] 

How to extract header column?

Will return: 
[
    {time: '17:15:55', price: '1.56', tradeSize: '5000', type: 'Buy Up'}
]
 */

import camelCase from "./camelCase";
import TimeAndSalesInterface from "../types/TimeAndSalesInterface/TimeAndSalesInterface";

const cleanUpCsvToJson = (
  initialCsv: string[][]
): Array<TimeAndSalesInterface> => {
  const csvHeaders = initialCsv.shift() || [];
  console.log("Removed headers", { Headers: csvHeaders });

  const cleanHeaders = csvHeaders?.map((header) => camelCase(header)) as Array<
    keyof TimeAndSalesInterface
  >;

  const taggedArray = initialCsv.map((csvRow) => {
    const finalObj: TimeAndSalesInterface = {
      time: "",
      price: "",
      tradeSize: "",
      type: "",
    };

    csvRow.forEach((propertyValue, index) => {
      finalObj[cleanHeaders[index]] = propertyValue;
    });

    return finalObj;
  });

  return taggedArray;
};

export default cleanUpCsvToJson;
