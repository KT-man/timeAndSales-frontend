import React, { FormEvent, useState } from "react";
import papaparse from "papaparse";
import DataTableComponent from "../components/DataTableComponent";
import cleanUpCsvToJson from "../utils/cleanUpCsvToJson";
import TimeAndSalesInterface from "@/types/TimeAndSalesInterface/TimeAndSalesInterface";

import mockData from "../data/InitialArray.json";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [csvData, setCsvData] =
    useState<Array<TimeAndSalesInterface>>(mockData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputField: HTMLInputElement | null =
      document.querySelector("input[type='file']");

    if (inputField && inputField.files) {
      console.log(inputField.files);

      const reader = new FileReader();
      const uploadedFile = inputField.files[0];

      reader.readAsText(uploadedFile);

      // Callback called upon completion of FileReader read
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reader.onload = (_ev) => {
        // Save data to state if result is string
        if (typeof reader.result === "string") {
          // Parse CSV data
          const convertedData = papaparse.parse<string[]>(reader.result);

          if (convertedData.errors.length === 0) {
            const taggedJsonData = cleanUpCsvToJson(convertedData.data, true);

            setCsvData(taggedJsonData);
          } else {
            console.log("Error with converting CSV", {
              errors: convertedData.errors,
            });
          }
        }
      };
    }
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        action="upload"
        onSubmit={handleSubmit}
      >
        <label htmlFor="fileInput">Upload your CSV:</label>
        <input
          name="fileInput"
          id="fileInput"
          type="file"
          accept=".csv"
        ></input>
        <button type="submit">Submit</button>
      </form>

      <br />
      <DataTableComponent tableData={csvData} />
    </>
  );
};

export default HomePage;
