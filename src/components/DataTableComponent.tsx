import TimeAndSalesInterface from "@/types/TimeAndSalesInterface/TimeAndSalesInterface";
import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useState } from "react";
import styles from "./DataTableComponent.module.css";

interface DataTableComponentProps {
  tableData: Array<TimeAndSalesInterface>;
}

const tableHeaders = createColumnHelper<TimeAndSalesInterface>();

const columns = [
  tableHeaders.accessor("time", {
    cell: (info) => info.getValue(),
  }),
  tableHeaders.accessor("price", {
    cell: (info) => info.getValue(),
  }),
  tableHeaders.accessor("tradeSize", {
    cell: (info) => info.getValue(),
  }),
  tableHeaders.accessor("type", {
    cell: (info) => info.getValue(),
  }),
];

const DataTableComponent: FC<DataTableComponentProps> = ({ tableData }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(tableHeaders);

  console.log({ tableData });

  return (
    <div className={styles.rootTableWrapper}>
      <p> This is the table </p>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={styles.thCells}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableComponent;
