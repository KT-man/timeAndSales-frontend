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
import DataTableHeaderComponent from "./HeaderFilterComponent/DataTableHeaderComponent";
import { table } from "console";
import columnFilterStore from "@/recoilStores/columnFilters/columnFilterStore";

interface DataTableComponentProps {
  tableData: Array<TimeAndSalesInterface>;
}

const columnHelper = createColumnHelper<TimeAndSalesInterface>();

const columns = [
  columnHelper.accessor("time", {
    id: "time",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
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
    filterFn: (row, columnId, filterValue) => {
      const currentValue = row.getValue<number>(columnId);
      return Number(currentValue) > Number(filterValue);
    },
  }),
  columnHelper.accessor("type", {
    id: "type",
    cell: (info) => info.getValue(),
  }),
];

const DataTableComponent: FC<DataTableComponentProps> = ({ tableData }) => {
  const currentTime = useRecoilValue(currentTimeSelector);
  const [pagination, setPagination] = useRecoilState(paginateStore);
  const [columnFilters, setColumnFilters] =
    useRecoilState<ColumnFilter[]>(columnFilterStore);

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
    console.log("Original change");
    // Set pagination max page
    const totalPages = table.getPageCount();
    setPageCount(totalPages);
  }, [setPageCount, table, tableData, currentTime]);

  useEffect(() => {
    console.log("Pagination change");
    // Update pagination on columnFilter changes
    const totalPages = table.getPageCount();
    setPageCount(totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters]);

  return (
    <div className={styles.rootTableWrapper} data-test-id="DataTableComponent">
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
                      <>
                        <div data-test-id="columnHeaderText">
                          <DataTableHeaderComponent header={header} />
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
