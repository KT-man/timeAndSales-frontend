import { ParseError, ParseMeta } from "papaparse";
import ParsedCsvDataType from "./ParsedCsvDataType";

interface ParsedCsvInterface {
  data: Array<ParsedCsvDataType>;
  error: Array<ParseError>;
  meta: ParseMeta;
}

export default ParsedCsvInterface;
