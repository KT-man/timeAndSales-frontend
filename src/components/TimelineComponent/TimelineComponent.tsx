import TimeAndSalesInterface from "@/types/TimeAndSalesInterface/TimeAndSalesInterface";
import { FC, useEffect } from "react";
import TimelineControllerComponent from "./TimelineControllerComponent/TimelineControllerComponent";
import TimelineSliderComponent from "./TimelineSliderComponent/TimelineSliderComponent";
import styles from "./TimelineComponent.module.css";
interface TimelineComponentProps {
  csvData: TimeAndSalesInterface[];
}

const TimelineComponent: FC<TimelineComponentProps> = ({ csvData }) => {
  // Transform and update recoil states with csvData once it changes
  useEffect(() => {}, [csvData]);

  return (
    <div className={styles.timelineComponentWrapper}>
      <TimelineControllerComponent />
      <TimelineSliderComponent />
    </div>
  );
};

export default TimelineComponent;
