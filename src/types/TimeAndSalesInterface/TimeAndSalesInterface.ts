interface TimeAndSalesInterface {
  /** @description Time Format HH:MM:SS */
  time: string;
  /** @description unixTime for sorting. Hidden Column*/
  unixTime: number;
  price: string;
  tradeSize: string;
  // Probably to narrow down further
  type: string;
}

export interface TimeAndSalesTableInterface
  extends Omit<TimeAndSalesInterface, "unixTime"> {}

export default TimeAndSalesInterface;
