import { FC } from "react";

interface TimelineSliderComponentProps {}

const TimelineSliderComponent: FC<TimelineSliderComponentProps> = () => {
  return (
    <div>
      <label>
        Set timing here <input type="range"></input>
      </label>
    </div>
  );
};

export default TimelineSliderComponent;
