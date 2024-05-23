import ParsedCsvDataType from "@/types/ParsedCsvInterface/ParsedCsvDataType";
import TimeAndSalesInterface from "@/types/TimeAndSalesInterface/TimeAndSalesInterface";
import { createColumnHelper } from "@tanstack/react-table";
import { FC } from "react";

interface DataTableComponentProps {
  tableData: Array<ParsedCsvDataType>;
}

const DataTableComponent: FC<DataTableComponentProps> = ({ tableData }) => {
  const tableHeaders = createColumnHelper<TimeAndSalesInterface>();
  console.log(tableHeaders);

  console.log({ tableData });

  return <div>abc</div>;
};

export default DataTableComponent;
