/**
 * @description Util function to convert unix time to time format HH:mm:ss
 */

import dayjs from "dayjs";

const convertUnixToTime = (unixTime: number): string => {
  const stringTime = dayjs.unix(unixTime).format("HH:mm:ss");
  return stringTime;
};

export default convertUnixToTime;
