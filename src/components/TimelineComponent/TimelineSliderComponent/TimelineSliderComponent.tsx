import { FC } from "react";

import styles from "./TimelineSliderComponent.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import timelineStore from "@/recoilStores/timeline/timelineStore";
import currentTimeSelector from "@/recoilStores/timeline/currentTimeSelector";

interface TimelineSliderComponentProps {}

const TimelineSliderComponent: FC<TimelineSliderComponentProps> = () => {
  const timelineData = useRecoilValue(timelineStore);
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeSelector);
  return (
    <div className={styles.rootWrapper} data-test-id="TimelineSliderComponent">
      <label>
        Set timing here{" "}
        <input
          type="range"
          value={currentTime}
          onChange={(e) => {
            setCurrentTime(Number(e.target.value));
            // Debounced
            // setTimeout(() => {
            //   setCurrentTime(Number(e.target.value));
            // }, 300);
          }}
          step={11}
          min={timelineData.startTime}
          max={timelineData.endTime}
          className={styles.rangeInput}
        ></input>
      </label>
    </div>
  );
};

export default TimelineSliderComponent;
