/**
 * @description incrementUnixTime is a util function to start counting from current unix time
 * and increment the time by the speed set by user
 */

import dayjs from "dayjs";
import { SetterOrUpdater } from "recoil";

function incrementUnixTime({
  getCurrentTime,
  speed,
  setterFn,
}: {
  getCurrentTime: () => number;
  speed: number;
  setterFn: SetterOrUpdater<number>;
}): void {
  const currentTime = getCurrentTime();
  const newTime = dayjs.unix(currentTime).add(speed * 1, "seconds");
  setterFn(newTime.unix());
}

export default incrementUnixTime;
