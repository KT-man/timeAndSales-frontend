import { Dayjs } from 'dayjs';

interface TimeAndSalesInterface {
  /** @description Time Format HH:MM:SS */
  time: string;
  /** @description formattedTime parse it into dayjs object, for sorting. Hidden */
  formattedTime?: Dayjs;
  price: string;
  tradeSize: string;
  // Probably to narrow down further
  type: string;
}

export default TimeAndSalesInterface;
