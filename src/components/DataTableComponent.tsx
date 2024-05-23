import ParsedCsvDataType from "@/types/ParsedCsvInterface/ParsedCsvDataType";
import { FC } from "react";

interface DataTableComponentProps {
  tableData: Array<ParsedCsvDataType>;
}

const DataTableComponent: FC<DataTableComponentProps> = ({ tableData }) => {
  const tableText = "Table";

  console.log({ tableData });

  return <div>{tableText}</div>;
};

export default DataTableComponent;
