import { FC } from "react";
import styles from "./TimelineControllerComponent.module.css";

interface TimelineControllerComponentProps {}

const TimelineControllerComponent: FC<
  TimelineControllerComponentProps
> = () => {
  return (
    <div className={styles.controllerWrapper}>
      <button type="button">Normal</button>
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
