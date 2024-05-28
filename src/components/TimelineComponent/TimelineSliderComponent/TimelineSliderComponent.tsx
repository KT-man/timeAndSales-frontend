import { FC } from "react";

import styles from "./TimelineSliderComponent.module.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import timelineStore from "@/recoilStores/timeline/timelineStore";
import currentTimeSelector from "@/recoilStores/timeline/currentTimeSelector";

interface TimelineSliderComponentProps {}

const TimelineSliderComponent: FC<TimelineSliderComponentProps> = () => {
  const timelineData = useRecoilValue(timelineStore);
  const setCurrentTime = useSetRecoilState(currentTimeSelector);
  return (
    <div className={styles.rootWrapper}>
      <label>
        Set timing here{" "}
        <input
          type="range"
          onChange={(e) => {
            // Debounced
            setTimeout(() => {
              setCurrentTime(Number(e.target.value));
            }, 300);
          }}
          step={300}
          min={timelineData.startTime}
          max={timelineData.endTime}
          className={styles.rangeInput}
        ></input>
      </label>
    </div>
  );
};

export default TimelineSliderComponent;
