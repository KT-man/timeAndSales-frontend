import { FC, useState } from "react";
import styles from "./TimelineControllerComponent.module.css";
import { useRecoilState } from "recoil";
import currentTimeSelector from "@/recoilStores/timeline/currentTimeSelector";
import incrementUnixTime from "./utils/incrementUnixTime";

interface TimelineControllerComponentProps {}

const TimelineControllerComponent: FC<
  TimelineControllerComponentProps
> = () => {
  const [activeTimer, setActiveTimer] = useState(false);
  const [activeIntervalId, setActiveIntervalId] =
    useState<ReturnType<typeof setInterval>>();
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeSelector);

  const normalSpeedHandler = () => {
    if (!activeTimer) {
      const intervalId: ReturnType<typeof setInterval> = setInterval(
        incrementUnixTime,
        1000,
        {
          currentTime,
          speed: 1,
          setterFn: setCurrentTime,
        }
      );

      setActiveTimer(true);
      setActiveIntervalId(intervalId);
      return;
    }

    setActiveTimer(false);
    clearInterval(activeIntervalId);
  };

  return (
    <div className={styles.controllerWrapper}>
      <span>Click on button to start timer</span>
      <button type="button" onClick={normalSpeedHandler}>
        Normal
      </button>
      <button type="button">2x</button>
      <button type="button">4x</button>
      <label>
        Custom speed
        <input type="text"></input>
      </label>
    </div>
  );
};

export default TimelineControllerComponent;
