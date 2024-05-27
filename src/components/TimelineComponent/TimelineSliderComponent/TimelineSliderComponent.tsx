import { FC } from "react";

import styles from "./TimelineSliderComponent.module.css";
import { useRecoilState } from "recoil";
import timelineStore from "@/recoilStores/timeline/timelineStore";

interface TimelineSliderComponentProps {}

const TimelineSliderComponent: FC<TimelineSliderComponentProps> = () => {
  const [timelineData, setTimelineData] = useRecoilState(timelineStore);
  console.log(timelineData);
  return (
    <div className={styles.rootWrapper}>
      <label>
        Set timing here{" "}
        <input
          type="range"
          min={timelineData.startTime}
          max={timelineData.endTime}
          className={styles.rangeInput}
        ></input>
      </label>
    </div>
  );
};

export default TimelineSliderComponent;
