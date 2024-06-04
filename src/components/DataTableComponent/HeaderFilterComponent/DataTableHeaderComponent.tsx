import TimeAndSalesInterface from "@/types/TimeAndSalesInterface/TimeAndSalesInterface";
import { Header } from "@tanstack/react-table";
import { FC } from "react";

import styles from "./DataTableHeaderComponent.module.css";
import { useSetRecoilState } from "recoil";
import pageIndexSelector from "@/recoilStores/paginate/pageIndexSelector";
import columnFilterStore from "@/recoilStores/columnFilters/columnFilterStore";

interface DataTableHeaderComponentProps {
  header: Header<TimeAndSalesInterface, unknown>;
}

const DataTableHeaderComponent: FC<DataTableHeaderComponentProps> = ({
  header,
}: DataTableHeaderComponentProps) => {
  const setColumnFilters = useSetRecoilState(columnFilterStore);
  const columnHeader = header.id;
  const columnFilterValue = header.column.getFilterValue();
  // Update Pagination on filter
  const setPageIndex = useSetRecoilState(pageIndexSelector);

  return (
    <div className={styles.headerComponentWrapper}>
      <div className={styles.headerText}>{columnHeader}</div>

      {header.column.getCanFilter() && (
        <>
          <input
            className={styles.filterInput}
            aria-label={`${columnHeader}-filter`}
            placeholder={`Filter by ${columnHeader}`}
            onBlur={(e) => {
              setColumnFilters((prevValue) => {
                const arrayWithoutPrevFilter = prevValue.filter(
                  ({ id }) => id !== columnHeader
                );
                return [
                  ...arrayWithoutPrevFilter,
                  { id: columnHeader, value: e.target.value },
                ];
              });
              setPageIndex(0);
            }}
          ></input>
        </>
      )}
    </div>
  );
};

export default DataTableHeaderComponent;
