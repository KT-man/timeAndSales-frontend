import { FC, useState } from "react";
import styles from "./TimelineControllerComponent.module.css";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import currentTimeSelector from "@/recoilStores/timeline/currentTimeSelector";
import incrementUnixTime from "./utils/incrementUnixTime";

interface TimelineControllerComponentProps {}

const TimelineControllerComponent: FC<
  TimelineControllerComponentProps
> = () => {
  const setCurrentTime = useSetRecoilState(currentTimeSelector);

  const [activeTimer, setActiveTimer] = useState(false);
  const [activeIntervalId, setActiveIntervalId] =
    useState<ReturnType<typeof setInterval>>();
  const [customSpeed, setCustomSpeed] = useState(1);

  const getCurrentTime = useRecoilCallback(
    ({ snapshot: { getLoadable } }) =>
      () =>
        getLoadable(currentTimeSelector).getValue()
  );

  const normalSpeedHandler = () => {
    if (!activeTimer) {
      const intervalId: ReturnType<typeof setInterval> = setInterval(
        incrementUnixTime,
        1000,
        {
          getCurrentTime,
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

  const doubleSpeedHandler = () => {
    if (!activeTimer) {
      const intervalId: ReturnType<typeof setInterval> = setInterval(
        incrementUnixTime,
        1000,
        {
          getCurrentTime,
          speed: 2,
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

  const quadSpeedHandler = () => {
    if (!activeTimer) {
      const intervalId: ReturnType<typeof setInterval> = setInterval(
        incrementUnixTime,
        1000,
        {
          getCurrentTime,
          speed: 4,
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

  const customSpeedHandler = (customSpeed: number) => {
    if (!activeTimer) {
      const intervalId: ReturnType<typeof setInterval> = setInterval(
        incrementUnixTime,
        1000,
        {
          getCurrentTime,
          speed: customSpeed,
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
  const stopTimerHandler = () => {
    setActiveTimer(false);
    setActiveIntervalId(1);
    clearInterval(activeIntervalId);
  };

  return (
    <div
      className={styles.controllerWrapper}
      data-test-id="TimelineControllerComponent"
    >
      <div className={styles.presetButtonsWrapper}>
        <span>Click on button to start timer (1s interval)</span>
        <button
          type="button"
          onClick={normalSpeedHandler}
          disabled={activeTimer}
        >
          Normal
        </button>
        <button
          type="button"
          onClick={doubleSpeedHandler}
          disabled={activeTimer}
        >
          2x
        </button>
        <button type="button" onClick={quadSpeedHandler} disabled={activeTimer}>
          4x
        </button>
        <button
          type="button"
          onClick={stopTimerHandler}
          disabled={!activeTimer}
        >
          Stop Timer
        </button>
      </div>

      <div className={styles.customSpeedWrapper}>
        <label htmlFor="customSpeedInput">Custom speed</label>
        <input
          name="customSpeedInput"
          type="text"
          value={customSpeed}
          onChange={(e) => {
            if (Number.isInteger(Number(e.target.value))) {
              setCustomSpeed(Number(e.target.value));
            }
          }}
        ></input>
        <button
          type="button"
          disabled={activeTimer}
          onClick={() => {
            customSpeedHandler(customSpeed);
          }}
        >
          Set Custom Speed
        </button>
      </div>
    </div>
  );
};

export default TimelineControllerComponent;
