import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
/**
 *
 * @param dateTime dateTime provided in the following formats
 * HH:mm:ss
 */

const convertTimeToUnixTime = (dateTime: string) => {
  const convertedDate = dayjs(dateTime, ["HH:mm:ss"]);
  console.log(convertedDate);

  return convertedDate;
};

export default convertTimeToUnixTime;
