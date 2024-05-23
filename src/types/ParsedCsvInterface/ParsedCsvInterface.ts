import { ParseError, ParseMeta } from "papaparse";
import ParsedCsvDataType from "./ParsedCsvDataType";

interface ParsedCsvInterface {
  data: Array<ParsedCsvDataType>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Array<ParseError>;
  meta: ParseMeta;
}

export default ParsedCsvInterface;
