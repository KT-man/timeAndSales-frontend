import TimeAndSalesInterface from "@/types/TimeAndSalesInterface/TimeAndSalesInterface";
import papaparse from "papaparse";
import React, { FormEvent, useState } from "react";
import cleanUpCsvToJson from "../utils/cleanUpCsvToJson";

import ControlPanelComponent from "@/components/ControlPanelComponent/ControlPanelComponent";
import DataTableComponent from "@/components/DataTableComponent/DataTableComponent";
import mockData from "@/data/InitialArray.json";

import TimelineComponent from "@/components/TimelineComponent/TimelineComponent";
import styles from "./HomePage.module.css";
import TimelineStoreInterface from "@/types/TimelineStoreInterface/TimelineStoreInterface";
import { useSetRecoilState } from "recoil";
import timelineStore from "@/recoilStores/timeline/timelineStore";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [csvData, setCsvData] =
    useState<Array<TimeAndSalesInterface>>(mockData);
  const setTimelineStore = useSetRecoilState(timelineStore);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputField: HTMLInputElement | null =
      document.querySelector("input[type='file']");

    if (inputField && inputField.files) {
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
            const taggedJsonData = cleanUpCsvToJson(convertedData.data);

            const unixTimeArray = taggedJsonData.map(
              ({ unixTime }) => unixTime
            );
            if (unixTimeArray.length === 0) {
              throw new Error("Unix time not populated, probably an error ");
            }

            const startTime = Math.min(...unixTimeArray);
            const endTime = Math.max(...unixTimeArray);

            const timelineState: TimelineStoreInterface = {
              startTime,
              endTime,
              currentTime: startTime,
            };
            console.log(startTime, endTime, unixTimeArray);

            // Set states
            setCsvData(taggedJsonData);
            setTimelineStore(timelineState);
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
    <div>
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
      <TimelineComponent csvData={csvData} />

      <br></br>
      <div className={styles.homePageWrapper}>
        <ControlPanelComponent />
        <DataTableComponent tableData={csvData} />
      </div>
    </div>
  );
};

export default HomePage;
