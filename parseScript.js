import papaparse from "papaparse";
import * as fs from "fs";

const csv = fs.createReadStream("src/data/timeAndSales.csv");
console.log(csv);
const data = papaparse.parse(csv, {
  worker: true, // Don't bog down the main thread if its a big file
  step: function (result) {
    // do stuff with result
  },
  complete: function (results, csv) {
    console.log("parsing complete readrecords.");
  },
});

console.log(csv);
console.log(data);
