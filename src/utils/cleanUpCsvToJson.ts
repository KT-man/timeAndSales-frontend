/**
 * @description util function to convert an array of rows of csv data to an array of objects in JSON notation while tagging to the correct column name
 *
 * @example 
[
    ['Time', 'Price', 'Trade Size', 'Type'],
    ['17:15:55', '1.56', '5000', 'Buy Up'],
    ['17:11:59', '1.56', '5000', 'Buy Up']
] 


Will return a sorted array in ascending order based on unixTime: 
[
    {time: '17:15:55', unixTime: -number-, price: '1.56', tradeSize: '5000', type: 'Buy Up'}
]
 */

import TimeAndSalesInterface from "../types/TimeAndSalesInterface/TimeAndSalesInterface";
import camelCase from "./camelCase";
import convertTimeToUnixTime from "./convertTimeToUnixTime/convertTimeToUnixTime";

const cleanUpCsvToJson = (
  initialCsv: string[][]
): Array<TimeAndSalesInterface> => {
  console.log(initialCsv);
  const csvHeaders = initialCsv.shift() || [
    "Time",
    "UnixTime",
    "Price",
    "Trade Size",
    "Type",
  ];
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
      const objectProperty = cleanHeaders[index];

      switch (objectProperty) {
        case "time":
          {
            finalObj.time = propertyValue;

            const convertedTime = convertTimeToUnixTime(propertyValue);
            finalObj.unixTime = convertedTime;
          }
          break;
        case "price":
          finalObj.price = propertyValue;
          break;
        case "tradeSize":
          finalObj.tradeSize = propertyValue;
          break;
        case "type":
          finalObj.type = propertyValue;
          break;
        default:
          console.error("Header not recognized, please double check", {
            header: objectProperty,
          });
      }
    });

    return finalObj;
  });

  // Sort the tagged array in chronological order
  const sortedArray = taggedArray.sort(
    ({ unixTime: aUnixTime }, { unixTime: bUnixTime }) => {
      if (aUnixTime && bUnixTime) {
        return aUnixTime - bUnixTime;
      } else {
        return 0;
      }
    }
  );

  return sortedArray;
};

export default cleanUpCsvToJson;
