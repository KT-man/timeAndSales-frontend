import currentTimeSelector from "@/recoilStores/timeline/currentTimeSelector";
import TimeAndSalesInterface from "@/types/TimeAndSalesInterface/TimeAndSalesInterface";
import {
  ColumnFilter,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import pageCountStore from "../../recoilStores/pageCount/pageCountStore";
import paginateStore from "../../recoilStores/paginate/paginateStore";
import styles from "./DataTableComponent.module.css";

interface DataTableComponentProps {
  tableData: Array<TimeAndSalesInterface>;
}

const columnHelper = createColumnHelper<TimeAndSalesInterface>();

const columns = [
  columnHelper.accessor("time", {
    id: "time",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("unixTime", {
    id: "unixTime",
    cell: (info) => info.getValue(),
    filterFn: (row, columnId, filterValue) => {
      const currentValue = row.getValue<number>(columnId);
      const isPastValue = currentValue <= filterValue;
      return isPastValue;
    },
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("price", {
    id: "price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tradeSize", {
    id: "tradeSize",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    id: "type",
    cell: (info) => info.getValue(),
  }),
];

const DataTableComponent: FC<DataTableComponentProps> = ({ tableData }) => {
  const currentTime = useRecoilValue(currentTimeSelector);
  const [pagination, setPagination] = useRecoilState(paginateStore);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([
    { id: "unixTime", value: currentTime },
  ]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    time: true,
    unixTime: false,
    price: true,
    tradeSize: true,
    type: true,
  });

  const setPageCount = useSetRecoilState(pageCountStore);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      columnFilters,
      columnVisibility,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
  });

  useEffect(() => {
    // Set Pagination, set column filtering
    if (table) {
      const totalPages = table.getPageCount();

      setPageCount(totalPages);

      const unixTimeColumn = table.getColumn("unixTime");
      unixTimeColumn?.setFilterValue(currentTime);
      console.log({ currentTime });
    }
  }, [setPageCount, table, tableData, currentTime]);

  return (
    <div className={styles.rootTableWrapper} data-test-id="DataTableComponent">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  console.log(header);
                  return (
                    <th
                      className={styles.thCells}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      <>
                        <div data-test-id="columnHeaderText">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      </>
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
