import { HHMMSS_Format } from "@/config/constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
/**
 * @param dateTime dateTime provided in the following formats
 * HH:mm:ss
 *
 * Convert to unix timestamp for easier sorting as a number
 */

const convertTimeToUnixTime = (dateTime: string) => {
  const convertedDate = dayjs(dateTime, [HHMMSS_Format]).unix();

  return convertedDate;
};

export default convertTimeToUnixTime;
